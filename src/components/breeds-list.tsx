import Link from "next/link";
import { connection } from "next/server";
import { getReadyBreeds } from "@/lib/breeds/notion";

export async function BreedsList() {
  await connection();
  const { breeds, status, message } = await getReadyBreeds();

  if (status === "missing_credentials") {
    return (
      <div className="rounded-md border border-[var(--brand)]/15 bg-white/40 px-5 py-6 text-[var(--muted)]">
        <p className="font-medium text-[var(--foreground)]">
          Breed library not connected
        </p>
        <p className="mt-2 text-sm leading-relaxed">
          Set <code className="text-[var(--brand)]">NOTION_API_KEY</code> (and
          optionally <code className="text-[var(--brand)]">NOTION_DATABASE_ID</code>{" "}
          / <code className="text-[var(--brand)]">NOTION_DATA_SOURCE_ID</code>) in
          the environment, share the Horse Breeds database with your Notion
          integration, then restart the app. See <code>.env.example</code>.
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-md border border-red-900/15 bg-white/40 px-5 py-6 text-[var(--muted)]">
        <p className="font-medium text-[var(--foreground)]">
          Could not load breeds
        </p>
        <p className="mt-2 text-sm leading-relaxed">
          {message ?? "Try again later."}
        </p>
      </div>
    );
  }

  if (status === "empty" || breeds.length === 0) {
    return (
      <div className="rounded-md border border-[var(--brand)]/15 bg-white/40 px-5 py-6 text-[var(--muted)]">
        <p className="font-medium text-[var(--foreground)]">
          No published breeds yet
        </p>
        <p className="mt-2 text-sm leading-relaxed">
          When a breed’s Status is set to Ready in Notion, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-[var(--brand)]/10 border-y border-[var(--brand)]/10">
      {breeds.map((breed) => (
        <li key={breed.id}>
          <Link
            href={`/breeds/${breed.slug}`}
            className="group block py-6 transition-colors hover:bg-white/30"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-xl font-semibold tracking-tight text-[var(--brand)] group-hover:underline">
                {breed.name}
              </h2>
              {(breed.type || breed.origin) && (
                <p className="text-sm text-[var(--muted)]">
                  {[breed.type, breed.origin].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>
            {breed.shortDescription && (
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-[var(--foreground)]/90">
                {breed.shortDescription}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
