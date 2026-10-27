import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EducationalArt } from "@/components/educational-art";
import { FeatureDiagram } from "@/components/feature-diagram";
import { PageShell } from "@/components/page-shell";
import { resolveArtPath } from "@/lib/art-paths";
import { getAllFeatures, getFeatureBySlug } from "@/lib/features/catalog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllFeatures().map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);
  if (!feature) return { title: "Feature · Horse Edu" };
  return {
    title: `${feature.name} · Horse Edu`,
    description: feature.summary,
  };
}

export default async function FeatureDetailPage({ params }: Props) {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);
  if (!feature) notFound();

  return (
    <PageShell>
      <main className="mx-auto w-full max-w-3xl px-6 py-14 sm:px-10 sm:py-20">
        <Link
          href="/features/"
          className="text-sm text-[var(--muted)] hover:text-[var(--brand)]"
        >
          ← All features
        </Link>

        <p className="mt-6 text-sm uppercase tracking-wide text-[var(--muted)]">
          {feature.kind === "anatomy" ? "Anatomy" : "Marking / pattern"}
        </p>
        <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight text-[var(--brand)] sm:text-5xl">
          {feature.name}
        </h1>
        <p className="mt-4 text-lg leading-relaxed">{feature.summary}</p>

        <div className="mt-10 border border-[var(--brand)]/12 bg-[var(--surface)] p-4 sm:p-8">
          <EducationalArt
            artSrc={resolveArtPath("features", feature.slug)}
            alt={`${feature.name} diagram`}
            imageClassName="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden"
            fallback={
              <FeatureDiagram
                feature={feature}
                className="mx-auto h-64 w-full max-w-lg text-[var(--foreground)]"
              />
            }
          />
        </div>

        <section className="mt-10">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">
            How to spot it
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed">
            {feature.idTips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">
            Sources
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {feature.sources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--brand)] hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </PageShell>
  );
}
