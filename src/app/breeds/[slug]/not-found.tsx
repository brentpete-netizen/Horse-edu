import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function BreedNotFound() {
  return (
    <PageShell>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-20 sm:px-10">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--brand)]">
          Breed not found
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-[var(--muted)]">
          This breed isn’t published yet, or the link may be incorrect. Only
          breeds with Status = Ready appear on the site.
        </p>
        <Link
          href="/breeds"
          className="mt-8 inline-flex h-11 w-fit items-center justify-center rounded-md bg-[var(--brand)] px-6 text-sm font-medium text-white transition-colors hover:bg-[var(--brand-hover)]"
        >
          Browse breeds
        </Link>
      </main>
    </PageShell>
  );
}
