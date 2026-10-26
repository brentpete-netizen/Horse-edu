# Horse Edu

Next.js + Tailwind site for horse education. Breed content is loaded from the Notion **Horse Breeds** database (only rows with **Status = Ready**).

## Getting started

```bash
npm install
cp .env.example .env.local
# edit .env.local — add NOTION_API_KEY after connecting the integration
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Notion setup

1. Create an [internal integration](https://www.notion.so/my-integrations) and copy its secret.
2. Open the [Horse Breeds](https://app.notion.com/p/6da68778bc0d4252a72219ad9f7ca46b) database → **•••** → **Connections** → add the integration.
3. Set secrets (see `.env.example`):

| Variable | Required | Notes |
| --- | --- | --- |
| `NOTION_API_KEY` | Yes (for live data) | Integration secret |
| `NOTION_DATABASE_ID` | No | Defaults documented in `.env.example` |
| `NOTION_DATA_SOURCE_ID` | No | Defaults to the Horse Breeds collection id |

Without `NOTION_API_KEY`, `npm run build` still succeeds. Breed pages soft-fail at runtime with a clear “not connected” message instead of crashing.

Mark breeds **Ready** in Notion to publish them on `/breeds` and `/breeds/[slug]`.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Routes

- `/` — landing
- `/breeds` — Ready breeds index
- `/breeds/[slug]` — breed detail (slug from Name)
