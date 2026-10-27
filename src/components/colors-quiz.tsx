"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { EducationalArt } from "@/components/educational-art";
import { HorseColorIllustration } from "@/components/horse-color-illustration";
import type { CoatColor } from "@/lib/colors/catalog";

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function choicesFor(correct: CoatColor, pool: CoatColor[]): string[] {
  const wrong = shuffle(pool.filter((c) => c.slug !== correct.slug))
    .slice(0, 3)
    .map((c) => c.name);
  return shuffle([correct.name, ...wrong]);
}

export function ColorsQuiz({
  colors,
  artBySlug = {},
}: {
  colors: CoatColor[];
  /** Optional Grok art paths keyed by color slug */
  artBySlug?: Record<string, string | null>;
}) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [seed, setSeed] = useState(0);
  const deck = useMemo(() => shuffle(colors), [colors, seed]);

  const current = deck[index];
  const options = useMemo(
    () => (current ? choicesFor(current, colors) : []),
    // recompute when question or reshuffle changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [current, colors, seed, index],
  );

  if (!current) return null;

  function onPick(name: string) {
    if (picked) return;
    setPicked(name);
    if (name === current.name) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 >= deck.length) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  }

  function playAgain() {
    setSeed((s) => s + 1);
    setIndex(0);
    setScore(0);
    setPicked(null);
    setDone(false);
  }

  if (done) {
    return (
      <div className="border border-[var(--brand)]/15 bg-[var(--surface)] px-6 py-10 text-center">
        <p className="font-display text-3xl font-semibold text-[var(--brand)]">
          {score} / {deck.length}
        </p>
        <p className="mt-3 text-[var(--muted)]">
          {score === deck.length
            ? "Perfect — those coats are looking familiar."
            : "Nice work. Review the color library and try again."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={playAgain}
            className="h-11 bg-[var(--brand)] px-6 text-sm font-semibold text-white hover:bg-[var(--brand-hover)]"
          >
            Play again
          </button>
          <Link
            href="/colors/"
            className="inline-flex h-11 items-center border border-[var(--brand)]/30 px-6 text-sm font-semibold text-[var(--brand)]"
          >
            Browse colors
          </Link>
        </div>
      </div>
    );
  }

  const correct = picked === current.name;

  return (
    <div>
      <p className="text-sm text-[var(--muted)]">
        Question {index + 1} of {deck.length}
      </p>
      <h2 className="font-display mt-2 text-2xl font-semibold text-[var(--foreground)]">
        What coat color is this?
      </h2>

      <div className="mt-8 border border-[var(--brand)]/12 bg-[var(--surface)] p-4 sm:p-6">
        <EducationalArt
          artSrc={artBySlug[current.slug] ?? null}
          alt={`${current.name} coat illustration`}
          imageClassName="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden"
          fallback={
            <HorseColorIllustration
              color={current}
              className="mx-auto h-52 w-full max-w-md text-[var(--foreground)]"
            />
          }
        />
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {options.map((name) => {
          let styles =
            "border border-[var(--brand)]/20 bg-white/40 px-4 py-3 text-left text-sm font-medium transition-colors hover:border-[var(--brand)]";
          if (picked) {
            if (name === current.name) {
              styles =
                "border border-[var(--brand)] bg-[var(--brand)]/15 px-4 py-3 text-left text-sm font-medium";
            } else if (name === picked) {
              styles =
                "border border-red-800/40 bg-red-50/80 px-4 py-3 text-left text-sm font-medium";
            } else {
              styles =
                "border border-[var(--brand)]/10 bg-white/20 px-4 py-3 text-left text-sm font-medium opacity-60";
            }
          }
          return (
            <button
              key={name}
              type="button"
              disabled={Boolean(picked)}
              onClick={() => onPick(name)}
              className={styles}
            >
              {name}
            </button>
          );
        })}
      </div>

      {picked && (
        <div className="mt-6 border border-[var(--brand)]/10 bg-[var(--surface)] px-4 py-4">
          <p className="font-medium text-[var(--foreground)]">
            {correct ? "Correct!" : `Not quite — it’s ${current.name}.`}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            {current.idTips[0]}
          </p>
          <button
            type="button"
            onClick={next}
            className="mt-4 text-sm font-semibold text-[var(--brand)] hover:underline"
          >
            {index + 1 >= deck.length ? "See score →" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}
