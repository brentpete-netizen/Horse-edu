# Horse Edu

Next.js educational site for horse **breeds**, **coat colors**, **distinctive features**, and a **colors quiz**.

## Hosting

| Target | How |
| --- | --- |
| **GitHub Pages** (primary) | On push to `main`, Actions builds with `GITHUB_PAGES=true` (static export + `basePath=/Horse-edu`) and deploys `out/`. Site: `https://brentpete-netizen.github.io/Horse-edu/` |
| **Vercel** (follow-on) | Import the repo; leave `GITHUB_PAGES` unset so there is no `basePath`. Set `NOTION_API_KEY` to load live Ready breeds; otherwise local `content/breeds` is used. |

Notion remains the drafting source of truth. **Pages builds use committed local content** under `content/breeds/`. Run `/prepare-site-breed` and commit after marking breeds Ready.

Enable Pages: repo **Settings → Pages → Source: GitHub Actions**.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional Notion for local/Vercel
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Static Pages build locally

```bash
# Unix
GITHUB_PAGES=true npm run build

# Windows PowerShell
$env:GITHUB_PAGES="true"; npm run build
```

Output is in `out/`.

## Routes

- `/` — home
- `/breeds` — Ready breeds (filters: type, origin, use)
- `/breeds/[slug]` — breed detail
- `/colors` — coat color library
- `/colors/[slug]` — color detail + ID tips
- `/features` — anatomy & markings
- `/features/[slug]` — feature detail
- `/quiz/colors` — coat color quiz

## Scripts

- `npm run dev` — development
- `npm run build` — production build (Vercel / Node)
- `npm run start` — serve Node production build (not used on Pages)
- `npm run lint` — ESLint
