import type { Metadata } from "next";
import Link from "next/link";
import { BreedsQuiz } from "@/components/breeds-quiz";
import { PageShell } from "@/components/page-shell";
import { getLocalReadyBreeds } from "@/lib/breeds/content";
import { BREED_QUIZ_ROUND_SIZE } from "@/lib/breeds/quiz-clues";

export const metadata: Metadata = {
  title: "Breeds quiz · Horse Edu",
  description:
    "Name the horse breed from progressive clues—origin, type, traits, and more.",
};

export default async function BreedsQuizPage() {
  const breeds = await getLocalReadyBreeds();

  return (
    <PageShell>
      <main className="mx-auto w-full max-w-3xl px-6 py-14 sm:px-10 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">
          Practice
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
          Breeds quiz
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--muted)]">
          Read the clues and type the breed name. Fewer clues mean more points
          (4 down to 1). Each round draws {BREED_QUIZ_ROUND_SIZE} breeds.{" "}
          <Link href="/breeds/" className="text-[var(--brand)] hover:underline">
            Study the breed library
          </Link>{" "}
          first if you like — or try the{" "}
          <Link
            href="/quiz/colors/"
            className="text-[var(--brand)] hover:underline"
          >
            colors quiz
          </Link>
          .
        </p>
        <div className="mt-10">
          <BreedsQuiz breeds={breeds} />
        </div>
      </main>
    </PageShell>
  );
}
