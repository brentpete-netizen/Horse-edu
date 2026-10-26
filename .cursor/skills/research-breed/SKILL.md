---
name: research-breed
description: Research a horse breed and fill structured fields for the Horse Edu Notion Horse Breeds database. Use when adding or updating a breed, gathering sources, or preparing a breed for Ready status.
---

# Research breed

Research one horse breed and produce content that maps cleanly onto the **Horse Breeds** Notion database used by Horse Edu.

## When to use

- User asks to research, add, or flesh out a breed
- Preparing a Draft / Needs review row for **Ready**
- Finding official association links or sources for a breed

## Notion field map

Fill every field you can support with evidence. Prefer select/multi-select **exact option labels** below.

| Field | Type | Allowed values / notes |
| --- | --- | --- |
| Name | title | Canonical breed name |
| Status | select | `Draft`, `Needs review`, `Ready` — new research starts as `Draft` or `Needs review`; only set `Ready` when the user asks or content is complete and sourced |
| Type | select | `Draft`, `Light/Riding`, `Pony`, `Warmblood`, `Gaited`, `Color/Registry`, `Other` |
| Origin | select | `United States`, `England`, `Arabian Peninsula`, `Belgium`, `France`, `Scotland`, `Ireland`, `Other` |
| Temperament | select | `Calm`, `Energetic`, `Intelligent`, `Independent`, `Gentle`, `Other` |
| Primary uses | multi_select | `Racing`, `Ranch/stock work`, `Dressage`, `Jumping`, `Driving`, `Endurance`, `Pleasure`, `Draft work` |
| Typical colors | multi_select | `Bay`, `Chestnut`, `Black`, `Gray`, `White`, `Paint`, `Appaloosa`, `Palomino`, `Dun` |
| Height (hands) | text | Typical range, e.g. `15–16` |
| Short description | text | 1–3 sentences for list cards |
| Key characteristics | text | Distinctive conformation, gaits, traits |
| History notes | text | Origin story and development; keep factual |
| Sources | text | Citations or URLs (one per line preferred) |
| Official association | url | Primary registry / breed association URL when one exists |
| Image | file | Do not invent; note suggested image source for the user to upload |
| Last updated | date | Set to research date when writing to Notion |

Database: https://app.notion.com/p/6da68778bc0d4252a72219ad9f7ca46b  
Project context: `/cursor/stores/self/docs/project-context.md` (when available in this Project)

## Workflow

1. **Confirm the breed name** and any disambiguation (e.g. American vs European lines).
2. **Gather sources** — prefer official breed associations, recognized registries, and encyclopedic references. Use web research tools when available. Avoid unsourced blogs as sole evidence.
3. **Draft fields** using the table above. If a select value does not fit, use `Other` and explain in Key characteristics or History notes.
4. **Short description** must stand alone for `/breeds` list UI; detail belongs in characteristics / history.
5. **Propose Status**: default `Needs review` after solid research; `Ready` only with user approval or explicit request.
6. **Hand off** — if Notion MCP / tools are available and the user wants it written, create or update the database row. Otherwise present a filled field summary for copy/paste.
7. **Images** — suggest a reputable image source; do not claim an Image file was attached unless it was.

## Quality bar

- No fabricated history, heights, or association URLs
- Mark uncertainty explicitly when sources conflict
- Keep Short description scannable; keep Sources complete enough to verify claims
