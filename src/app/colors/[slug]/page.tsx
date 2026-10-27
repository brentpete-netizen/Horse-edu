import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HorseColorIllustration } from "@/components/horse-color-illustration";
import { PageShell } from "@/components/page-shell";
import { getAllColors, getColorBySlug } from "@/lib/colors/catalog";
import { getLocalReadyBreeds } from "@/lib/breeds/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllColors().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const color = getColorBySlug(slug);
  if (!color) return { title: "Color · Horse Edu" };
  return {
    title: `${color.name} · Horse Edu`,
    description: color.summary,
  };
}

export default async function ColorDetailPage({ params }: Props) {
  const { slug } = await params;
  const color = getColorBySlug(slug);
  if (!color) notFound();

  const breeds = await getLocalReadyBreeds();
  const related = breeds.filter((b) =>
    b.typicalColors.some(
      (n) =>
        n.toLowerCase() === color.name.toLowerCase() ||
        (color.slug === "paint" && n.toLowerCase() === "paint") ||
        (color.slug === "appaloosa" && n.toLowerCase() === "appaloosa") ||
        (color.slug === "gray" && n.toLowerCase() === "gray"),
    ),
  );

  return (
    <PageShell>
      <main className="mx-auto w-full max-w-3xl px-6 py-14 sm:px-10 sm:py-20">
        <Link
          href="/colors/"
          className="text-sm text-[var(--muted)] hover:text-[var(--brand)]"
        >
          ← All colors
        </Link>

        <header className="mt-6">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-[var(--brand)] sm:text-5xl">
            {color.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--foreground)]">
            {color.summary}
          </p>
        </header>

        <div className="mt-10 border border-[var(--brand)]/12 bg-[var(--surface)] p-4 sm:p-6">
          <HorseColorIllustration
            color={color}
            className="mx-auto h-56 w-full max-w-md text-[var(--foreground)]"
          />
        </div>

        <section className="mt-10">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">
            How to spot it
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed">
            {color.idTips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">
            Lookalikes
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--foreground)]">
            {color.lookalikes.join(" · ")}
          </p>
        </section>

        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">
              Ready breeds that list this color
            </h2>
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-base">
              {related.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/breeds/${b.slug}/`}
                    className="text-[var(--brand)] hover:underline"
                  >
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-10">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">
            Sources
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {color.sources.map((s) => (
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
