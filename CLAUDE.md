# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — validate data, then start Eleventy dev server with live reload
- `npm run build` — validate data, then build static site to `dist/`
- `npm run validate:data` — run `scripts/validate-data.mjs`, which zod-validates every JSON file in `src/_data/` (this is also `npm test`)

There is no separate test suite beyond data validation, and no linter configured.

## Architecture

This is an Eleventy (11ty) static site with **all content sourced from JSON files, not markdown/frontmatter**. The site is essentially a JSON-driven templating layer:

- `src/_data/*.json` — the single source of truth for content (profile, projects, websites, milestones, themes, site metadata). Every file has a matching Zod schema in `scripts/validate-data.mjs`, enforced before every dev/build run — edit the schema alongside the JSON shape.
- `src/_includes/layouts/base.njk` — the one shared layout, wrapping all pages.
- `src/*.njk` (index, about, contact, websites) — top-level page templates that pull from `_data`.
- `src/projects/project.njk` — a single shared template that generates one page per entry in `projects.json` via Eleventy pagination (`/projects/{slug}/`).
- `src/demos/` — theme demo pages (`/demos/`, `/demos/{theme-slug}/`) that render the home page against each palette defined in `themes.json`, used to preview color schemes.
- `.eleventy.js` — config: passthrough copy of `src/assets` → `assets`, plus custom filters (`featuredProjects`, `projectsByPriority` sorts featured-first then by year descending, `formatYear`).

### Adding/editing content

Content changes almost always mean editing a JSON file in `src/_data/`, not a template. When adding a new field, update the corresponding Zod schema in `scripts/validate-data.mjs` first, or validation will fail the build.

### Routes generated

`/`, `/about/`, `/projects/`, `/projects/{slug}/` (one per project, shared template), `/websites/`, `/contact/`, `/demos/`, `/demos/{theme-slug}/`.

## Deployment

Build output (`dist/`) is a plain static site suitable for Cloudflare Pages, GitHub Pages, Netlify, etc.

## OpenSpec

This repo uses OpenSpec (via `.claude/skills/openspec-*` and `.claude/commands/opsx/*`) for spec-driven change proposals, stored under `openspec/changes/` (active) and `openspec/specs/` (archived/current specs). Use the `opsx:*` or `openspec-*` skills for proposing, applying, or archiving changes rather than editing `openspec/` by hand.
