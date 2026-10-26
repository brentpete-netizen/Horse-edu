import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function Home() {
  return (
    <PageShell>
      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-20 sm:px-10">
        <p className="text-5xl font-semibold tracking-tight text-[var(--brand)] sm:text-6xl">
          Horse Edu
        </p>
        <h1 className="mt-6 max-w-xl text-2xl font-medium leading-snug text-[var(--foreground)] sm:text-3xl">
          Learn horsemanship with clarity and care.
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          A home for practical lessons, stable skills, and confident riding —
          built for students and instructors.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/breeds"
            className="inline-flex h-11 items-center justify-center rounded-md bg-[var(--brand)] px-6 text-sm font-medium text-white transition-colors hover:bg-[var(--brand-hover)]"
          >
            Explore breeds
          </Link>
        </div>
      </main>
    </PageShell>
  );
}
