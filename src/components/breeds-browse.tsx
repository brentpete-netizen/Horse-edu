"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Breed } from "@/lib/breeds/types";

const ALL = "all";

function uniqueSorted(values: (string | null | undefined)[]): string[] {
  return [...new Set(values.filter((v): v is string => Boolean(v)))].sort(
    (a, b) => a.localeCompare(b),
  );
}

function SelectFilter({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (next: string) => void;
}) {
  return (
    <label className="flex min-w-[10rem] flex-1 flex-col gap-1.5 text-sm">
      <span className="text-[var(--muted)]">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-[var(--brand)]/20 bg-white/50 px-3 py-2 text-[var(--foreground)] outline-none focus:border-[var(--brand)]"
      >
        <option value={ALL}>All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function BreedThumb({ breed }: { breed: Breed }) {
  if (breed.imageUrl) {
    return (
      <div className="relative h-24 w-28 shrink-0 overflow-hidden bg-[var(--brand)]/10 sm:h-28 sm:w-36">
        <Image
          src={breed.imageUrl}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="144px"
          unoptimized
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="flex h-24 w-28 shrink-0 items-center justify-center bg-[var(--brand)]/10 text-xs font-medium uppercase tracking-wide text-[var(--brand)]/50 sm:h-28 sm:w-36"
    >
      Horse Edu
    </div>
  );
}

export function BreedsBrowse({
  breeds,
  source,
}: {
  breeds: Breed[];
  source: "notion" | "local";
}) {
  const [type, setType] = useState(ALL);
  const [origin, setOrigin] = useState(ALL);
  const [use, setUse] = useState(ALL);

  const typeOptions = useMemo(
    () => uniqueSorted(breeds.map((b) => b.type)),
    [breeds],
  );
  const originOptions = useMemo(
    () => uniqueSorted(breeds.map((b) => b.origin)),
    [breeds],
  );
  const useOptions = useMemo(
    () => uniqueSorted(breeds.flatMap((b) => b.primaryUses)),
    [breeds],
  );

  const filtered = useMemo(() => {
    return breeds.filter((breed) => {
      if (type !== ALL && breed.type !== type) return false;
      if (origin !== ALL && breed.origin !== origin) return false;
      if (use !== ALL && !breed.primaryUses.includes(use)) return false;
      return true;
    });
  }, [breeds, type, origin, use]);

  const filtersActive = type !== ALL || origin !== ALL || use !== ALL;

  return (
    <div>
      {source === "local" && (
        <p className="mb-6 text-sm text-[var(--muted)]">
          Showing Ready breed exports from{" "}
          <code className="text-[var(--brand)]">content/breeds</code>.
        </p>
      )}

      <div className="flex flex-col gap-4 border-y border-[var(--brand)]/10 py-5 sm:flex-row sm:items-end">
        <SelectFilter
          id="filter-type"
          label="Type"
          value={type}
          options={typeOptions}
          onChange={setType}
        />
        <SelectFilter
          id="filter-origin"
          label="Origin"
          value={origin}
          options={originOptions}
          onChange={setOrigin}
        />
        <SelectFilter
          id="filter-use"
          label="Primary use"
          value={use}
          options={useOptions}
          onChange={setUse}
        />
        {filtersActive && (
          <button
            type="button"
            onClick={() => {
              setType(ALL);
              setOrigin(ALL);
              setUse(ALL);
            }}
            className="shrink-0 self-start text-sm text-[var(--brand)] hover:underline sm:self-end sm:pb-2"
          >
            Clear
          </button>
        )}
      </div>

      <p className="mt-4 text-sm text-[var(--muted)]" aria-live="polite">
        {filtered.length === breeds.length
          ? `${breeds.length} breeds`
          : `${filtered.length} of ${breeds.length} breeds`}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-8 text-[var(--muted)]">
          No breeds match these filters.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-[var(--brand)]/10 border-b border-[var(--brand)]/10">
          {filtered.map((breed) => (
            <li key={breed.id}>
              <Link
                href={`/breeds/${breed.slug}/`}
                className="group flex gap-4 py-5 transition-colors hover:bg-white/30 sm:gap-5"
              >
                <BreedThumb breed={breed} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 className="font-display text-xl font-semibold tracking-tight text-[var(--brand)] group-hover:underline">
                      {breed.name}
                    </h2>
                    {(breed.type || breed.origin) && (
                      <p className="text-sm text-[var(--muted)]">
                        {[breed.type, breed.origin]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}
                  </div>
                  {breed.shortDescription && (
                    <p className="mt-2 max-w-2xl text-base leading-relaxed text-[var(--foreground)]/90">
                      {breed.shortDescription}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
