# Shahd Hesham — Portfolio

An editorial, animated portfolio site for **Shahd Hesham, Content Creator & Creative Storyteller**, built from her 2026 PDF portfolio.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion for React · Lucide icons

## Run locally

Requires Node.js 20.9+.

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Editing content

Everything on the page comes from **`src/data/portfolio.ts`**:

- `profile` — name, bio, education, email, phone
- `experience` — timeline entries
- `services` — the eight skills
- `projects` — every portfolio project (brand, category, sector, logo, artwork, original link)
- `featuredIds` / `featuredCopy` — which projects get the large cinematic previews
- `process` — the creative-workflow steps

Project artwork lives in `public/work/<brand>/` (`logo.webp`, `01.webp`, `02.webp`, …). It was extracted from the PDF at its original embedded resolution. To add a project, drop its images in a new folder and add an entry to `projects`.

## Structure

```
src/
  app/            layout (fonts, metadata), page, global styles & design tokens
  components/     Hero, About, Services, Experience, Process, Contact, Nav, cursor, preloader
  components/work Featured previews, filterable gallery, project cards, preview modal
  components/ui   Reveal / SplitReveal / Highlight, Magnetic, Marquee, decorative SVGs
  data/           portfolio.ts — all editable content
```

## Accessibility & motion

- Respects `prefers-reduced-motion` (Motion's `reducedMotion="user"` plus a CSS fallback).
- Custom cursor and mouse parallax only run on fine pointers with hover; touch devices get the native experience.
- Skip link, keyboard-operable menu, filters, service rows and preview modal (Esc to close, ← → to step through projects).
