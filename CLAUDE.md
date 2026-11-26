# Sulifest — project rules for Claude

## About
Sulifest is a festival web application for Sulaymaniyah (Kurdistan Region of Iraq): a public website plus a booking system and admin panel.
The main plan is `docs/Sulifest-Website-Plan.pdf`. The research with sources is `docs/RESEARCH-REPORT.md`.
**Follow the plan. If you want to change a decision, explain why and ask first.**

## Talk to the user
- Always answer in **simple B1-level English**: short sentences, common words, tables.

## Stack (decided 2026-11-25)
- TypeScript, Next.js 16 (>= 16.4.5), Payload CMS 3 (>= 3.94.2, not v4 beta)
- Payload `with-cloudflare-d1` template, Cloudflare Workers Paid via OpenNext
- Database: Cloudflare D1. Images: Cloudflare R2. (Plan B: Neon via Hyperdrive. Fallback: Vercel Pro.)
- next-intl for UI text + Payload localization for content
- Tailwind CSS v4 + shadcn/ui (RTL on)
- Animations: CSS scroll-driven first, GSAP `useGSAP()` for 1–2 big sections. No Lenis.
- Forms: Zod + Cloudflare Turnstile. Email: Resend. Errors: Sentry.
- Domain: sulifest.krd. Package manager: pnpm. Node.js 22+. Develop inside WSL2 (Ubuntu-24.04).
- Do NOT add other languages or frameworks (no Rust, PHP, Python backend, etc.).

## Features
- Pages: Home, About, Schedule, Gallery, Contact
- Free booth booking: visitor sends request → `pending` (does NOT hold the booth) → admin approves → only approval locks the booth (unique `approvedBoothKey` field) → email in visitor's language
- Admin panel (Payload) + custom dashboard: number cards, latest bookings with approve/reject, booth map, next events, chart, visitors (Cloudflare Web Analytics), on/off switches, CSV export
- Roles: `admin`, `editor`, `booth-manager`. No public sign-up.

## Languages
- `ckb` (Kurdish Sorani, RTL, default), `ar` (RTL), `en` (LTR). hreflang for Kurdish: `ku-Arab`.
- **Always use the `kurdish-arabic-web` skill** for any language, RTL, font or form work.

## Must-follow rules
- Set `passwordHashIterations: 100000` before creating the first Payload user.
- Turn off GraphQL. Public users never write to Payload REST directly — use server actions.
- Uploads: only jpg/png/webp/pdf, max 5 MB, no SVG/XML/XSL, no upload-from-URL.
- Secrets only via `wrangler secret put` / `.env` (never committed).
- Add a `year` (festival edition) field to Events, Booths, Bookings.
- Every DB change needs a migration (`pnpm payload migrate:create`).
- Keep code by feature: `src/features/<feature>/`.
- Monthly update day for Next.js and Payload security releases.
