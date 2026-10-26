import type { Metadata } from "next";
import { Suspense } from "react";
import { BreedDetail } from "@/components/breed-detail";
import { PageShell } from "@/components/page-shell";

type BreedPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BreedPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: `${title} · Horse Edu`,
    description: `Learn about the ${title} horse breed.`,
  };
}

function DetailFallback() {
  return (
    <p className="py-8 text-[var(--muted)]" aria-live="polite">
      Loading breed…
    </p>
  );
}

export default function BreedPage({ params }: BreedPageProps) {
  return (
    <PageShell>
      <main className="mx-auto w-full max-w-3xl px-6 py-14 sm:px-10 sm:py-20">
        <Suspense fallback={<DetailFallback />}>
          <BreedDetailFromParams params={params} />
        </Suspense>
      </main>
    </PageShell>
  );
}

async function BreedDetailFromParams({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BreedDetail slug={slug} />;
}
