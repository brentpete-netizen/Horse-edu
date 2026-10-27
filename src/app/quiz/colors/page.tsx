import type { Metadata } from "next";
import Link from "next/link";
import { ColorsQuiz } from "@/components/colors-quiz";
import { PageShell } from "@/components/page-shell";
import { resolveArtPathMap } from "@/lib/art-paths";
import { getAllColors } from "@/lib/colors/catalog";

export const metadata: Metadata = {
  title: "Colors quiz · Horse Edu",
  description: "Name the horse coat color from an illustration.",
};

export default function ColorsQuizPage() {
  const colors = getAllColors();
  const artBySlug = resolveArtPathMap(
    "colors",
    colors.map((c) => c.slug),
  );

  return (
    <PageShell>
      <main className="mx-auto w-full max-w-3xl px-6 py-14 sm:px-10 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">
          Practice
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
          Colors quiz
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--muted)]">
          Look at the illustration and choose the coat color. Tips appear after
          each answer.{" "}
          <Link href="/colors/" className="text-[var(--brand)] hover:underline">
            Study the color library
          </Link>{" "}
          first if you like.
        </p>
        <div className="mt-10">
          <ColorsQuiz colors={colors} artBySlug={artBySlug} />
        </div>
      </main>
    </PageShell>
  );
}
