"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { withBasePath } from "@/lib/base-path";
import type { Breed } from "@/lib/breeds/types";
import {
  BREED_QUIZ_POINTS,
  BREED_QUIZ_ROUND_SIZE,
  getQuizCluesBySlug,
  guessMatchesBreed,
  type BreedQuizClues,
} from "@/lib/breeds/quiz-clues";

type QuizBreed = Breed & { quiz: BreedQuizClues };

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function BreedsQuiz({ breeds }: { breeds: Breed[] }) {
  const pool = useMemo(() => {
    const withClues: QuizBreed[] = [];
    for (const breed of breeds) {
      const quiz = getQuizCluesBySlug(breed.slug);
      if (quiz) withClues.push({ ...breed, quiz });
    }
    return withClues;
  }, [breeds]);

  const [seed, setSeed] = useState(0);
  const [index, setIndex] = useState(0);
  const [clueIndex, setClueIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [resolved, setResolved] = useState<"correct" | "revealed" | null>(
    null,
  );
  const [awarded, setAwarded] = useState(0);
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const deck = useMemo(() => {
    const size = Math.min(BREED_QUIZ_ROUND_SIZE, pool.length);
    return shuffle(pool).slice(0, size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, seed]);

  const current = deck[index];
  const maxPoints = deck.length * BREED_QUIZ_POINTS[0];

  if (!current) {
    return (
      <p className="text-[var(--muted)]">
        No breeds with quiz clues are available yet.
      </p>
    );
  }

  function resetQuestion() {
    setClueIndex(0);
    setGuess("");
    setResolved(null);
    setAwarded(0);
    setFeedback(null);
  }

  function onGuess(e: FormEvent) {
    e.preventDefault();
    if (resolved) return;
    const ok = guessMatchesBreed(
      guess,
      current.name,
      current.quiz.aliases,
    );
    if (ok) {
      const pts = BREED_QUIZ_POINTS[clueIndex] ?? 1;
      setScore((s) => s + pts);
      setAwarded(pts);
      setResolved("correct");
      setFeedback(null);
      return;
    }
    // Wrong early guess: keep playing; final clue wrong ends the question.
    if (clueIndex >= current.quiz.clues.length - 1) {
      setResolved("revealed");
      setAwarded(0);
      setFeedback(null);
      return;
    }
    setFeedback("Not quite — try another clue, or guess again.");
  }

  function nextClue() {
    if (resolved) return;
    if (clueIndex >= current.quiz.clues.length - 1) return;
    setClueIndex((i) => i + 1);
    setFeedback(null);
  }

  function reveal() {
    if (resolved) return;
    setResolved("revealed");
    setAwarded(0);
    setFeedback(null);
  }

  function next() {
    if (index + 1 >= deck.length) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    resetQuestion();
  }

  function playAgain() {
    setSeed((s) => s + 1);
    setIndex(0);
    setScore(0);
    setDone(false);
    resetQuestion();
  }

  if (done) {
    return (
      <div className="border border-[var(--brand)]/15 bg-[var(--surface)] px-6 py-10 text-center">
        <p className="font-display text-3xl font-semibold text-[var(--brand)]">
          {score} / {maxPoints}
        </p>
        <p className="mt-3 text-[var(--muted)]">
          {score >= maxPoints * 0.75
            ? "Strong breed knowledge — those clues didn’t stand a chance."
            : "Nice round. Browse the breed library and play again."}
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
            href="/breeds/"
            className="inline-flex h-11 items-center border border-[var(--brand)]/30 px-6 text-sm font-semibold text-[var(--brand)]"
          >
            Browse breeds
          </Link>
        </div>
      </div>
    );
  }

  const cluesVisible = current.quiz.clues.slice(0, clueIndex + 1);
  const onLastClue = clueIndex >= current.quiz.clues.length - 1;
  const pointsIfCorrect = BREED_QUIZ_POINTS[clueIndex] ?? 1;

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm text-[var(--muted)]">
          Breed {index + 1} of {deck.length}
        </p>
        <p className="text-sm text-[var(--muted)]">
          Score{" "}
          <span className="font-semibold text-[var(--brand)]">{score}</span>
        </p>
      </div>

      <h2 className="font-display mt-2 text-2xl font-semibold text-[var(--foreground)]">
        Name this breed
      </h2>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Clue {clueIndex + 1} of {current.quiz.clues.length}
        {!resolved && (
          <>
            {" "}
            · correct now ={" "}
            <span className="font-medium text-[var(--foreground)]">
              {pointsIfCorrect} pt{pointsIfCorrect === 1 ? "" : "s"}
            </span>
          </>
        )}
      </p>

      <ol className="mt-8 space-y-3">
        {cluesVisible.map((clue, i) => (
          <li
            key={i}
            className="border border-[var(--brand)]/12 bg-[var(--surface)] px-4 py-3 text-base leading-relaxed text-[var(--foreground)]"
          >
            <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">
              Clue {i + 1}
            </span>
            {clue}
          </li>
        ))}
      </ol>

      {!resolved && (
        <>
          <form onSubmit={onGuess} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Type the breed name"
              autoComplete="off"
              className="min-h-11 flex-1 border border-[var(--brand)]/20 bg-white/50 px-4 text-[var(--foreground)] outline-none focus:border-[var(--brand)]"
              aria-label="Breed name guess"
            />
            <button
              type="submit"
              className="h-11 bg-[var(--brand)] px-6 text-sm font-semibold text-white hover:bg-[var(--brand-hover)]"
            >
              Guess
            </button>
          </form>
          {feedback && (
            <p className="mt-3 text-sm text-[var(--muted)]">{feedback}</p>
          )}
          <div className="mt-4 flex flex-wrap gap-4">
            {!onLastClue && (
              <button
                type="button"
                onClick={nextClue}
                className="text-sm font-semibold text-[var(--brand)] hover:underline"
              >
                Next clue →
              </button>
            )}
            <button
              type="button"
              onClick={reveal}
              className="text-sm text-[var(--muted)] hover:text-[var(--brand)] hover:underline"
            >
              Reveal answer
            </button>
          </div>
        </>
      )}

      {resolved && (
        <div className="mt-8 border border-[var(--brand)]/10 bg-[var(--surface)] px-4 py-5">
          <p className="font-medium text-[var(--foreground)]">
            {resolved === "correct"
              ? `Correct — ${current.name} (+${awarded})`
              : `It’s ${current.name}.`}
          </p>
          {current.imageUrl && (
            <div className="relative mt-4 aspect-[16/10] w-full max-w-md overflow-hidden bg-[var(--brand)]/10">
              <Image
                src={withBasePath(current.imageUrl)}
                alt={current.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 448px"
                unoptimized
              />
            </div>
          )}
          <div className="mt-4 flex flex-wrap gap-4">
            <Link
              href={`/breeds/${current.slug}/`}
              className="text-sm font-semibold text-[var(--brand)] hover:underline"
            >
              Learn more →
            </Link>
            <button
              type="button"
              onClick={next}
              className="text-sm font-semibold text-[var(--brand)] hover:underline"
            >
              {index + 1 >= deck.length ? "See score →" : "Next breed →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
