import type { Metadata } from "next";
import Link from "next/link";
import { BreedsList } from "@/components/breeds-list";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Horse breeds · Horse Edu",
  description:
    "Explore horse breeds — filter by type, origin, and primary use.",
};

export default function BreedsPage() {
  return (
    <PageShell>
      <main className="mx-auto w-full max-w-5xl px-6 py-14 sm:px-10 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">
          Library
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
          Horse breeds
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--muted)]">
          Browse Ready breeds by type, origin, or primary use. On GitHub Pages
          this uses local exports; on Vercel you can connect Notion for live
          Ready rows.{" "}
          <Link href="/quiz/breeds/" className="text-[var(--brand)] hover:underline">
            Try the breeds quiz
          </Link>
          .
        </p>
        <div className="mt-10">
          <BreedsList />
        </div>
      </main>
    </PageShell>
  );
}
