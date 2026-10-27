/**
 * Static GitHub Pages builds always use local content.
 * Vercel / local with NOTION_API_KEY can prefer Notion Ready rows.
 */
export function preferLocalBreeds(): boolean {
  if (process.env.GITHUB_PAGES === "true") return true;
  if (process.env.FORCE_LOCAL_BREEDS === "true") return true;
  return false;
}

export function allowNotionBreeds(): boolean {
  return !preferLocalBreeds() && Boolean(process.env.NOTION_API_KEY);
}
