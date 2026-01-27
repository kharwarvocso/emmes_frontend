import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const MOTION_TARBALL_URL =
  "https://api.motion.dev/registry.tgz?package=motion-studio-mcp&version=latest";

function getCacheDir() {
  const base =
    process.env.CODEX_MCP_CACHE_DIR ||
    process.env.XDG_CACHE_HOME ||
    (process.platform === "win32"
      ? process.env.LOCALAPPDATA
      : path.join(os.homedir(), ".cache")) ||
    os.tmpdir();
  return path.join(base, "codex-mcp", "motion-studio-mcp");
}

async function ensureExtracted() {
  const cacheDir = getCacheDir();
  const extractDir = path.join(cacheDir, "latest");
  const packageDir = path.join(extractDir, "package");
  const entry = path.join(packageDir, "dist", "es", "index.mjs");
  const nodeModulesDir = path.join(packageDir, "node_modules");

  if (fs.existsSync(entry) && fs.existsSync(nodeModulesDir)) return entry;

  fs.mkdirSync(extractDir, { recursive: true });

  const tgzPath = path.join(extractDir, "registry.tgz");
  if (!fs.existsSync(entry)) {
    const response = await fetch(MOTION_TARBALL_URL);
    if (!response.ok) {
      throw new Error(
        `Failed to download Motion MCP tarball: ${response.status} ${response.statusText}`,
      );
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(tgzPath, buffer);

    await new Promise((resolve, reject) => {
      const tarExe = process.platform === "win32" ? "tar.exe" : "tar";
      const tar = spawn(tarExe, ["-xzf", tgzPath, "-C", extractDir], {
        stdio: ["ignore", "ignore", "pipe"],
        windowsHide: true,
      });
      let err = "";
      tar.stderr.on("data", (c) => {
        err += c.toString("utf8");
      });
      tar.on("exit", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`tar failed (code=${code}): ${err.trim()}`));
      });
      tar.on("error", reject);
    });

    if (!fs.existsSync(entry)) {
      throw new Error(`Motion MCP entry not found after extract: ${entry}`);
    }
  }

  if (!fs.existsSync(nodeModulesDir)) {
    await new Promise((resolve, reject) => {
      const npmArgs = ["install", "--omit=dev", "--no-audit", "--no-fund"];
      const npm =
        process.platform === "win32"
          ? spawn(
              process.execPath,
              [
                path.join(
                  path.dirname(process.execPath),
                  "node_modules",
                  "npm",
                  "bin",
                  "npm-cli.js",
                ),
                ...npmArgs,
              ],
              {
                cwd: packageDir,
                stdio: ["ignore", "ignore", "pipe"],
                windowsHide: true,
                env: {
                  ...process.env,
                  npm_config_loglevel: "error",
                },
              },
            )
          : spawn("npm", npmArgs, {
        cwd: packageDir,
        stdio: ["ignore", "ignore", "pipe"],
        windowsHide: true,
        env: {
          ...process.env,
          npm_config_loglevel: "error",
        },
      });
      let err = "";
      npm.stderr.on("data", (c) => {
        err += c.toString("utf8");
      });
      npm.on("exit", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`npm install failed (code=${code}): ${err.trim()}`));
      });
      npm.on("error", reject);
    });
  }

  return entry;
}

const entry = await ensureExtracted();

// Run the actual MCP server entrypoint with inherited stdio (this process must not write to stdout).
const child = spawn(process.execPath, [entry], {
  stdio: "inherit",
  windowsHide: true,
  env: process.env,
});

child.on("exit", (code) => process.exit(code ?? 1));
child.on("error", () => process.exit(1));
