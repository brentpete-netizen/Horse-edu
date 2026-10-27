import type { Metadata } from "next";
import Link from "next/link";
import { FeatureDiagram } from "@/components/feature-diagram";
import { PageShell } from "@/components/page-shell";
import { featuresByKind } from "@/lib/features/catalog";

export const metadata: Metadata = {
  title: "Distinctive features · Horse Edu",
  description:
    "Anatomy landmarks and cosmetic markings used to describe horses.",
};

function FeatureGroup({
  title,
  kind,
}: {
  title: string;
  kind: "anatomy" | "marking";
}) {
  const items = featuresByKind(kind);
  return (
    <section className="mt-14">
      <h2 className="font-display text-2xl font-semibold text-[var(--foreground)]">
        {title}
      </h2>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2">
        {items.map((feature) => (
          <li key={feature.slug}>
            <Link
              href={`/features/${feature.slug}/`}
              className="group block border border-[var(--brand)]/12 bg-[var(--surface)] p-4 transition-transform hover:scale-[1.01] hover:border-[var(--brand)]/35"
            >
              <FeatureDiagram
                feature={feature}
                className="h-36 w-full text-[var(--foreground)]"
              />
              <h3 className="font-display mt-3 text-lg font-semibold text-[var(--brand)] group-hover:underline">
                {feature.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                {feature.summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function FeaturesIndexPage() {
  return (
    <PageShell>
      <main className="mx-auto w-full max-w-5xl px-6 py-14 sm:px-10 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">
          Library
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
          Distinctive features
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
          Anatomy points used in horse descriptions, plus cosmetic markings and
          pattern terms you will hear in the barn and show ring.
        </p>
        <FeatureGroup title="Anatomy" kind="anatomy" />
        <FeatureGroup title="Markings & patterns" kind="marking" />
      </main>
    </PageShell>
  );
}
