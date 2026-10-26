import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-[var(--brand)]/10">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-6 px-6 py-5 sm:px-10">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-[var(--brand)] transition-opacity hover:opacity-80"
        >
          Horse Edu
        </Link>
        <nav className="flex items-center gap-6 text-sm text-[var(--muted)]">
          <Link
            href="/breeds"
            className="transition-colors hover:text-[var(--brand)]"
          >
            Breeds
          </Link>
        </nav>
      </div>
    </header>
  );
}
