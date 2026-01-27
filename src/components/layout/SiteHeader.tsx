import Link from "next/link";
import Logo from "@/components/Logo";
import Wrapper from "@/components/Wrappers";

const navItems = [
  { href: "#services", label: "Services" },
  { href: "#features", label: "Features" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <Wrapper as="div" className="flex items-center justify-between py-3">
        <Logo />

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-zinc-700 hover:text-zinc-950"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="rounded-md bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800"
          >
            Contact
          </Link>
        </nav>

        <details className="relative md:hidden">
          <summary className="list-none rounded-md border px-3 py-2 text-sm font-medium">
            Menu
          </summary>
          <div className="absolute right-0 mt-2 w-56 rounded-lg border bg-white p-2 shadow-lg">
            <nav className="flex flex-col gap-1 text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 hover:bg-zinc-50"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#contact"
                className="mt-1 rounded-md bg-zinc-900 px-3 py-2 text-center text-white"
              >
                Contact
              </Link>
            </nav>
          </div>
        </details>
      </Wrapper>
    </header>
  );
}

