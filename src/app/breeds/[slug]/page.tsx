import type { Metadata } from "next";
import { BreedDetail } from "@/components/breed-detail";
import { PageShell } from "@/components/page-shell";
import { getLocalReadyBreeds } from "@/lib/breeds/content";

type BreedPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const breeds = await getLocalReadyBreeds();
  return breeds.map((b) => ({ slug: b.slug }));
}

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

export default async function BreedPage({ params }: BreedPageProps) {
  const { slug } = await params;
  return (
    <PageShell>
      <main className="mx-auto w-full max-w-3xl px-6 py-14 sm:px-10 sm:py-20">
        <BreedDetail slug={slug} />
      </main>
    </PageShell>
  );
}
