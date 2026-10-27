"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/breeds/", label: "Breeds" },
  { href: "/colors/", label: "Colors" },
  { href: "/features/", label: "Features" },
  { href: "/quiz/colors/", label: "Quiz" },
];

export function SiteHeader() {
  const pathname = usePathname() ?? "";

  return (
    <header className="relative z-20 border-b border-[var(--brand)]/10 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-10">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight text-[var(--brand)] transition-opacity hover:opacity-80"
        >
          Horse Edu
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--muted)]">
          {LINKS.map((link) => {
            const active =
              pathname === link.href ||
              pathname.startsWith(link.href.replace(/\/$/, ""));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "font-medium text-[var(--brand)]"
                    : "transition-colors hover:text-[var(--brand)]"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
