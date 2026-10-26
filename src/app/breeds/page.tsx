import type { Metadata } from "next";
import { Suspense } from "react";
import { BreedsList } from "@/components/breeds-list";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Horse breeds · Horse Edu",
  description:
    "Explore horse breeds ready for learning — type, origin, and practical notes.",
};

function BreedsFallback() {
  return (
    <p className="py-8 text-[var(--muted)]" aria-live="polite">
      Loading breeds…
    </p>
  );
}

export default function BreedsPage() {
  return (
    <PageShell>
      <main className="mx-auto w-full max-w-3xl px-6 py-14 sm:px-10 sm:py-20">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--brand)]">
          Library
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Horse breeds
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--muted)]">
          Published breeds from our Notion library — Status Ready only.
        </p>
        <div className="mt-10">
          <Suspense fallback={<BreedsFallback />}>
            <BreedsList />
          </Suspense>
        </div>
      </main>
    </PageShell>
  );
}
