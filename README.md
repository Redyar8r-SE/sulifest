# Sulifest

Website and booking system for Sulifest, a festival in Sulaymaniyah (Kurdistan Region of Iraq).

The project is in the planning stage. There is no application code yet.

## What is here

| Path | What |
|---|---|
| `CLAUDE.md` | Project rules: stack, languages, security rules |
| `docs/Sulifest-Website-Plan.pdf` | The main plan |
| `docs/RESEARCH-REPORT.md` | The research behind the plan, with sources |
| `docs/plans/` | One plan file per feature. Start with `docs/plans/README.md` |
| `docs/design/hero-free-photos/` | Free pictures (public domain / CC0) for the home page animation, with their licences in `SOURCES.md` |

## Stack (decided)

Next.js 16, Payload CMS 3, TypeScript, Cloudflare Workers + D1 + R2, next-intl, Tailwind CSS v4.
Languages: Kurdish Sorani (default), Arabic, English.

## Rules

- Never commit secrets (`.env`, `.dev.vars`). See `.gitignore`.
- `main` is the live branch. Every feature gets its own branch and a pull request.
