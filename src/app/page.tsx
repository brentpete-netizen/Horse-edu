import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function Home() {
  return (
    <PageShell>
      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-16 sm:px-10 sm:py-24">
        <p className="animate-fade-up font-display text-6xl font-semibold tracking-tight text-[var(--brand)] sm:text-7xl md:text-8xl">
          Horse Edu
        </p>
        <h1 className="animate-fade-up-delay mt-6 max-w-2xl font-display text-2xl font-medium leading-snug text-[var(--foreground)] sm:text-3xl">
          Breeds, colors, and features—built for curious riders.
        </h1>
        <p className="animate-fade-up-delay-2 mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          Explore Ready breed pages, learn coat colors and markings with
          identification tips, then test yourself on the colors and breeds
          quizzes.
        </p>
        <div className="animate-fade-up-delay-2 mt-10 flex flex-wrap gap-4">
          <Link
            href="/breeds/"
            className="inline-flex h-12 items-center justify-center bg-[var(--brand)] px-7 text-sm font-semibold text-white transition-transform hover:bg-[var(--brand-hover)] hover:scale-[1.02]"
          >
            Explore breeds
          </Link>
          <Link
            href="/quiz/breeds/"
            className="inline-flex h-12 items-center justify-center border border-[var(--brand)]/30 bg-[var(--surface)] px-7 text-sm font-semibold text-[var(--brand)] transition-colors hover:border-[var(--brand)]"
          >
            Breeds quiz
          </Link>
          <Link
            href="/quiz/colors/"
            className="inline-flex h-12 items-center justify-center border border-[var(--brand)]/30 bg-[var(--surface)] px-7 text-sm font-semibold text-[var(--brand)] transition-colors hover:border-[var(--brand)]"
          >
            Colors quiz
          </Link>
        </div>
      </main>
    </PageShell>
  );
}
