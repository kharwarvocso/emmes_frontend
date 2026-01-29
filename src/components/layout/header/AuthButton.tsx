import Link from "next/link";

export default function AuthButton() {
  return (
    <Link
      href="/login"
      className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
    >
      Sign in
    </Link>
  );
}
