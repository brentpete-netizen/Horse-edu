import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { withBasePath } from "@/lib/base-path";
import { getLocalReadyBreedBySlug } from "@/lib/breeds/content";
import { getReadyBreedBySlug } from "@/lib/breeds/notion";
import { colorSlugFromName } from "@/lib/colors/catalog";
import { allowNotionBreeds } from "@/lib/site-mode";

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  if (!children) return null;
  return (
    <section className="mt-10">
      <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">
        {title}
      </h2>
      <div className="mt-3 text-base leading-relaxed text-[var(--foreground)]">
        {children}
      </div>
    </section>
  );
}

function MetaRow({ label, value }: { label: string; value: ReactNode }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
      <dt className="shrink-0 text-sm text-[var(--muted)] sm:w-36">{label}</dt>
      <dd className="text-[var(--foreground)]">{value}</dd>
    </div>
  );
}

export async function BreedDetail({ slug }: { slug: string }) {
  let breed = await getLocalReadyBreedBySlug(slug);

  if (!breed && allowNotionBreeds()) {
    const { breed: notionBreed } = await getReadyBreedBySlug(slug);
    breed = notionBreed;
  }

  if (!breed) {
    notFound();
  }

  const uses = breed.primaryUses.length
    ? breed.primaryUses.join(", ")
    : null;

  const colorLinks =
    breed.typicalColors.length > 0 ? (
      <span className="flex flex-wrap gap-x-2 gap-y-1">
        {breed.typicalColors.map((name, i) => {
          const cslug = colorSlugFromName(name);
          return (
            <span key={name}>
              {cslug ? (
                <Link
                  href={`/colors/${cslug}/`}
                  className="text-[var(--brand)] underline-offset-2 hover:underline"
                >
                  {name}
                </Link>
              ) : (
                name
              )}
              {i < breed.typicalColors.length - 1 ? "," : ""}
            </span>
          );
        })}
      </span>
    ) : null;

  return (
    <article>
      <Link
        href="/breeds/"
        className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--brand)]"
      >
        ← All breeds
      </Link>

      <header className="mt-6">
        <p className="text-sm text-[var(--muted)]">
          {[breed.type, breed.origin].filter(Boolean).join(" · ")}
        </p>
        <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight text-[var(--brand)] sm:text-5xl">
          {breed.name}
        </h1>
        {breed.shortDescription && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--foreground)]">
            {breed.shortDescription}
          </p>
        )}
      </header>

      {breed.imageUrl && (
        <div className="relative mt-10 aspect-[16/10] w-full overflow-hidden bg-[var(--brand)]/10">
          <Image
            src={withBasePath(breed.imageUrl)}
            alt={breed.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            unoptimized
          />
        </div>
      )}

      <dl className="mt-10 space-y-3 border-y border-[var(--brand)]/10 py-6">
        <MetaRow label="Temperament" value={breed.temperament} />
        <MetaRow label="Primary uses" value={uses} />
        <MetaRow label="Typical colors" value={colorLinks} />
        <MetaRow label="Height (hands)" value={breed.heightHands} />
      </dl>

      <Section title="Characteristics">
        {breed.keyCharacteristics ? <p>{breed.keyCharacteristics}</p> : null}
      </Section>

      <Section title="History">
        {breed.historyNotes ? <p>{breed.historyNotes}</p> : null}
      </Section>

      <Section title="Sources">
        {breed.sources ? (
          <p className="whitespace-pre-wrap">{breed.sources}</p>
        ) : null}
      </Section>

      {breed.officialAssociation && (
        <Section title="Official association">
          <a
            href={breed.officialAssociation}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--brand)] underline-offset-2 hover:underline"
          >
            {breed.officialAssociation.replace(/^https?:\/\//, "")}
          </a>
        </Section>
      )}
    </article>
  );
}
