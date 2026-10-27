import type { Metadata } from "next";
import Link from "next/link";
import { EducationalArt } from "@/components/educational-art";
import { HorseColorIllustration } from "@/components/horse-color-illustration";
import { PageShell } from "@/components/page-shell";
import { resolveArtPath } from "@/lib/art-paths";
import { getAllColors } from "@/lib/colors/catalog";

export const metadata: Metadata = {
  title: "Coat colors · Horse Edu",
  description: "Learn horse coat colors with identification tips and illustrations.",
};

export default function ColorsIndexPage() {
  const colors = getAllColors();

  return (
    <PageShell>
      <main className="mx-auto w-full max-w-5xl px-6 py-14 sm:px-10 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">
          Library
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
          Coat colors
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
          Illustrated examples with ID tips—use these to recognize colors on real
          horses. Patterns like Paint and Appaloosa sit alongside solid coats.
        </p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {colors.map((color) => {
            const artSrc = resolveArtPath("colors", color.slug);
            return (
              <li key={color.slug}>
                <Link
                  href={`/colors/${color.slug}/`}
                  className="group flex h-full flex-col border border-[var(--brand)]/12 bg-[var(--surface)] p-4 transition-transform hover:scale-[1.01] hover:border-[var(--brand)]/35"
                >
                  <EducationalArt
                    artSrc={artSrc}
                    alt={`${color.name} coat illustration`}
                    className="min-h-[10rem]"
                    fallback={
                      <HorseColorIllustration
                        color={color}
                        className="h-44 w-full text-[var(--foreground)]"
                      />
                    }
                  />
                  <h2 className="font-display mt-3 text-xl font-semibold text-[var(--brand)] group-hover:underline">
                    {color.name}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-[var(--foreground)]">
                    Spot it: {color.idTips[0]}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                    {color.summary}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 text-sm text-[var(--muted)]">
          Ready to practice?{" "}
          <Link href="/quiz/colors/" className="text-[var(--brand)] hover:underline">
            Take the colors quiz
          </Link>
          .
        </p>
      </main>
    </PageShell>
  );
}
