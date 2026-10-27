import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import type { ReactNode } from "react";
import { getLocalReadyBreedBySlug } from "@/lib/breeds/content";
import { getReadyBreedBySlug } from "@/lib/breeds/notion";

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
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">
        {title}
      </h2>
      <div className="mt-3 text-base leading-relaxed text-[var(--foreground)]">
        {children}
      </div>
    </section>
  );
}

function MetaRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
      <dt className="shrink-0 text-sm text-[var(--muted)] sm:w-36">{label}</dt>
      <dd className="text-[var(--foreground)]">{value}</dd>
    </div>
  );
}

export async function BreedDetail({ slug }: { slug: string }) {
  await connection();
  const { breed: notionBreed, status, message } =
    await getReadyBreedBySlug(slug);
  const breed = notionBreed ?? (await getLocalReadyBreedBySlug(slug));

  if (!breed && status === "missing_credentials") {
    return (
      <div className="rounded-md border border-[var(--brand)]/15 bg-white/40 px-5 py-6 text-[var(--muted)]">
        <p className="font-medium text-[var(--foreground)]">
          Breed not found
        </p>
        <p className="mt-2 text-sm leading-relaxed">
          {message ??
            "No local export for this slug, and Notion is not connected."}
        </p>
        <Link
          href="/breeds"
          className="mt-4 inline-block text-sm text-[var(--brand)] hover:underline"
        >
          Back to breeds
        </Link>
      </div>
    );
  }

  if (!breed && status === "error") {
    return (
      <div className="rounded-md border border-red-900/15 bg-white/40 px-5 py-6 text-[var(--muted)]">
        <p className="font-medium text-[var(--foreground)]">
          Could not load this breed
        </p>
        <p className="mt-2 text-sm leading-relaxed">
          {message ?? "Try again later."}
        </p>
        <Link
          href="/breeds"
          className="mt-4 inline-block text-sm text-[var(--brand)] hover:underline"
        >
          Back to breeds
        </Link>
      </div>
    );
  }

  if (!breed) {
    notFound();
  }

  const uses = breed.primaryUses.length
    ? breed.primaryUses.join(", ")
    : null;
  const colors = breed.typicalColors.length
    ? breed.typicalColors.join(", ")
    : null;

  return (
    <article>
      <Link
        href="/breeds"
        className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--brand)]"
      >
        ← All breeds
      </Link>

      <header className="mt-6">
        <p className="text-sm text-[var(--muted)]">
          {[breed.type, breed.origin].filter(Boolean).join(" · ")}
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[var(--brand)] sm:text-5xl">
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
            src={breed.imageUrl}
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
        <MetaRow label="Typical colors" value={colors} />
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
