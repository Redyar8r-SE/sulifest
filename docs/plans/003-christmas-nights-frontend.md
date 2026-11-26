# 003 — Christmas Nights website (front end only)

Status: Draft (waiting for the user's answers and "yes")
Date: 2026-11-26
Source text: `docs/brief/christmas-nights-brief.md` (the organiser's Word document)
Main plan section: 1 "What the website does", 5 "Three languages", 6 "Scroll animations"
Builds on: plan 002 (the hero demo in `prototypes/home-hero/`)

## Goal

Build the public website for **Christmas Nights by SuliFest** (16–31 December 2026, Magma Square, Sulaimani).

This plan is **front end only**, as the user decided on 2026-11-26:
pages that visitors read and look at. No booking, no admin panel, no database, no forms.

All text comes from the brief. Nothing is invented.

## The big fact: time

| | |
|---|---|
| Today | Thursday 26 November 2026 |
| Festival opens | Wednesday 16 December 2026 |
| Days left | 20 |
| Festival ends | Thursday 31 December 2026 (New Year fireworks) |

The main plan has a 6-week timeline with booking and an admin panel. That does not fit into 20 days.
A front-end-only site does fit, if we start now and keep the scope small. That is why this plan cuts hard.

## Scope

| In this plan | Not in this plan (later) |
|---|---|
| Home with the scroll hero | Booth booking and vendor forms |
| About page | Admin panel, Payload CMS, database |
| Experience page | Contact form (we use links instead) |
| Families & Kids page | Daily programme from a database |
| Youth page | Photo gallery uploads |
| New Year page | Visitor accounts, tickets, payment |
| Venue & Visit page | Analytics dashboard |
| Contact (links only) | Newsletter |
| 3 languages, right-to-left for Kurdish and Arabic | |
| SEO basics and security headers | |

## Pages and where each text comes from

| Page | URL (after `/ckb`, `/ar`, `/en`) | Text from the brief |
|---|---|---|
| Home | `/` | Tagline, key facts, short parts of sections 1, 3, 4, 5, 6, 7, 8 |
| About | `/about` | Section 1 (About), section 2 (Vision & concept), section 8 (From SuliFest to Christmas Nights) |
| Experience | `/experience` | Section 3: the four experiences |
| Families & Kids | `/families` | Section 4, with its six activities |
| Youth | `/youth` | Section 5, with its seven activities |
| New Year | `/new-year` | Section 6 |
| Venue & Visit | `/venue` | Section 7 (six venue features), section 9 (event information), map link |
| Contact | `/contact` | Phone, email and social links (the organiser must give these) |

### Home page, from top to bottom

| # | Section | Content | Movement |
|---|---|---|---|
| 1 | Hero (from plan 002) | Small line "by SuliFest", title "Christmas Nights", tagline. Scene 2 card: "16–31 December 2026", "Magma Square", "Sulaimani", one button | The GSAP scroll scene |
| 2 | String of sixteen nights | 16 bulbs for 16–31 December and one line of text (see Design direction) | Lit bulbs turn on once |
| 3 | What is Christmas Nights | First paragraph of section 1 + link to About | None |
| 4 | The festival experience | The four experiences as a list with large titles: Atmosphere & Decorations, Live Entertainment, Food, Shopping & Gifts | None |
| 5 | Families & children | Two lines + three of the six activities + link | None |
| 6 | Youth, creativity & learning | Two lines + three of the seven activities + link | None |
| 7 | New Year celebration (dark section) | "A special celebration and a spectacular fireworks show" + link | None |
| 8 | The venue | The six features as a list + "How to get there" link | None |
| 9 | From SuliFest to Christmas Nights (dark section) | Summer → winter, and the motto on three lines | None |
| 10 | Footer | Event information (section 9), language switcher, social links, "Organized by italk" | None |

### About page (the user asked for this page)

| Block | Content |
|---|---|
| Intro | Title "About Christmas Nights" + the three paragraphs of section 1 |
| Who it is for | Seven small tags from section 1: families, young people, children, businesses, artists, visitors, the community |
| Vision & concept | The three paragraphs of section 2 |
| Our story | Section 8 as a two-step timeline: "Summer 2026: SuliFest, eight days at Hawary Shar Park" → "Winter 2026: Christmas Nights at Magma Square" |
| Motto | "One Vision. Different Seasons. Endless Experiences." in big type |
| Facts box | The six lines of section 9 |

## Design direction (made with the frontend-design skill, 2026-11-26)

Picture of this direction: the About page, artboard 4 in the preview (`https://claude.ai/artifact/GyzxoHAdFLZBg2L2bZJryq#artboard-About`).

**Who it is for:** families, young people and children in Sulaimani, mostly on phones, reading Kurdish first.
**The page's job:** make people want to come, and tell them when and where.

### The idea: from the night onto the snow

The hero is the night sky. Its second scene ends on white snow. So the rest of the site is **on the snow**: a cool white page with night-blue text. The night comes back only for the "When and where" box, the SuliFest story, the New Year section and the footer.

This keeps the text pages calm and easy to read, and it is different from the usual "dark page with one bright colour".

### Colours

| Name | Hex | Used for |
|---|---|---|
| Midnight | `#0B1430` | Text on snow, dark sections, the main button |
| Deep sky | `#1B2E55` | Second dark tone, lines on dark |
| Snow | `#EEF2F7` | Page background (a cool white, not cream) |
| Frost | `#D5DEEA` | Soft text on dark, quiet surfaces |
| Lantern | `#F2B84B` | Light: lit bulbs, the motto, the hero button |
| Berry | `#B8324A` | Rare: the 31 December bulb, link hover, focus ring |

Check every text and background pair for a contrast of at least 4.5:1. Lantern is for light on dark; never use it for text on Snow.

### Type

| Role | Font | Notes |
|---|---|---|
| The event name only (hero title, logo, "See you there!") | Great Vibes | English only. Two or three uses on the whole site. |
| English headings | Bricolage Grotesque, bold | Self-hosted, open licence. The Worker checks the licence and that the files exist. If not, use Space Grotesk (already in the demo). |
| Kurdish and Arabic headings | Noto Kufi Arabic, bold | Has all Kurdish letters. No letter spacing. |
| All body text, all three languages | Vazirmatn | One family for Kurdish, Arabic and English, so fewer font files. |

Sizes: body 18 px (17 px on phones), line height 1.6 for English and 1.8 for Kurdish and Arabic. Heading steps: 24, 28, 40, 64 px. Lines of text are at most about 68 characters wide. Headings use sentence case.

### Layout

Text starts at the reading edge (left in English, right in Kurdish and Arabic). It is not centred. One main text column, plus a narrow side column for facts where a page has them.

```
Desktop                                   Phone
+--------------------------------------+  +----------------+
| Christmas Nights      nav   [button] |  | name   [button]|
| o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o      |  | o-o-o-o-o-o-o-o|
| 16 17 18 ...                   31    |  |                |
|                                      |  | Big heading    |
| Big heading            +-----------+ |  | Lead text      |
| Lead text, large       | When and  | |  | Text           |
| Text                   | where     | |  | +------------+ |
| Text                   +-----------+ |  | | When/where | |
+--------------------------------------+  | +------------+ |
                                          +----------------+
```

### The one special element: the string of sixteen nights

The festival is 16 nights, 16–31 December. Under the header there is a string of 16 small bulbs, one per night, with the date under each.

| When | What it shows |
|---|---|
| Before 16 December | All bulbs are off. One line of text: "The first light goes on in N days." |
| During the festival | Bulbs for past nights and tonight are lit (Lantern). Tonight glows. |
| 31 December | The last bulb is Berry: New Year's night. |

This replaces a normal countdown with big numbers. It is real information (which night it is, how many are left), and it belongs only to this festival. In right-to-left languages the string runs the other way.

### Rules that keep it from looking like a template

| Rule | Why |
|---|---|
| No small ALL-CAPS labels above headings | They mean nothing in Kurdish and Arabic, and they are a sign of a generated page. |
| No rows of the same rounded card with a soft shadow | The four experiences are set as a list with large titles, not as four cards. |
| No numbers like 01, 02, 03 on things that are not a sequence | Only the SuliFest story is a real sequence (summer, then winter). |
| No dots between facts ("A · B · C") | Put each fact on its own line. |
| No arrows on buttons and links | Plain words: "Plan your visit". |
| Photos only where we have real ones | No stock-photo filler. Until the organiser sends photos, the pages are type and colour. |

### Movement

The hero is the one big moment. After it, the site is still.

| Where | Movement |
|---|---|
| Hero | The GSAP scroll scene (plan 002) |
| String of nights | When it first comes into view, the lit bulbs turn on one after another, once (about 1 second, CSS) |
| Everything else | None. No fade-in on every section, no moving cards, no sparks. |
| Hover and focus | Colour changes only |

Snow falls only in the hero.

The organiser's logo and brand colours are not in the brief. If they exist, they replace the choices above.

## Changes to the hero from plan 002

| Now in the demo | Change to |
|---|---|
| Small line "SULAYMANIYAH FESTIVAL" in wide capital letters | "by SuliFest" in normal letters, no wide spacing |
| Card line "[PLACE] · SULAYMANIYAH" with a dot and capitals | Two lines: "Magma Square" and "Sulaimani" |
| Title "Sulifest" | "Christmas Nights" |
| No tagline | "A Season of Lights, Joy & Celebration" |
| Card: `[FESTIVAL DATES]`, `[PLACE]` | "16–31 December 2026", "Magma Square, Sulaimani" |
| Card text "See you there!" and the sentence under it | Keep "See you there!"; replace the sentence with the first sentence of section 3 |
| Button "Book a booth" (booking is not in scope) | "Plan your visit" → the Venue page |
| Spelling "Sulifest", "Sulaymaniyah" | "SuliFest", "Sulaimani" (the organiser's spelling) |

The Christmas scene (Santa, reindeer, tree, snow) now fits the event exactly. No change needed there.

## Research (with sources)

| Fact | What it means for us | Source |
|---|---|---|
| The Payload `with-cloudflare-d1` template on the `3.x` branch uses Next.js 16.4.6, React 19.2.9 and Payload 3.94.2. The `main` branch is already Payload 4 beta. | For this front-end phase we use the same Next.js and React versions, so adding Payload later is easy. When we add it, we use the `3.x` branch, not `main`. | https://github.com/payloadcms/payload/tree/3.x/templates/with-cloudflare-d1 |
| Payload 3.94.2 needs Node `^22.23.5 || ^24.22.3`. The Windows Node on this computer is 24.14.1. | Install a newer Node inside Ubuntu (WSL). Do not rely on the Windows Node. | Same template, `package.json` |
| The template's admin panel is live as soon as it is deployed, and its first-user screen is open on an empty database. | Do **not** deploy the Payload template for a front-end-only launch. Start with plain Next.js. | websec `stack-nextjs-payload.md`, Payload check 8 |
| Magma Square is a mixed-use complex at the main gate of the American University of Iraq, Sulaimani, next to the main city highway, with about 580 parking places. | Useful for the Venue page, but the organiser must confirm the address and the map pin before we publish it. | https://www.millenniumhotels.com/it/attractions/sulaimani/magma-square |
| CSS scroll-driven animations work in current Chrome, Safari and Firefox. | Use them for the small fade-in effects. No JavaScript needed. | https://web.dev/blog/web-platform-10-2026 |

## Decisions (PM recommendation)

| # | Decision | Why |
|---|---|---|
| 1 | Build the front end in **Next.js 16 + TypeScript + Tailwind v4 + next-intl**, as the main plan says. Not as plain HTML files. | Eight pages in three languages is 24 pages. Plain HTML would mean copying every change 24 times. |
| 2 | Start from **plain Next.js**, and add Payload later. **This changes the order in the main plan** (it starts from the Payload template), so it needs the user's yes. | Front end only. An unused admin panel on the internet is a risk and brings nothing now. |
| 3 | All text lives in three message files (`messages/en.json`, `ckb.json`, `ar.json`). | No database needed. A translator can work on one file. |
| 4 | English is written first, from the brief. Kurdish and Arabic are translated by a native speaker, never by Claude. | Project rule. |
| 5 | Contact is links only: phone, WhatsApp, email, social media. No form. | A form needs a backend, spam protection and a privacy text. |
| 6 | The map is a picture plus an "Open in Google Maps" link. No embedded map. | An embedded map loads another company's scripts and weakens the security policy. |
| 7 | GSAP only in the hero. Every other effect is CSS. | Main plan rule. Fast on cheap phones. |
| 8 | No pause button (user decision in plan 002). "Reduce motion" still gives a still page. | Already decided. |

## Steps for the Worker

Step A — project (day 1–2)

1. Inside Ubuntu (WSL): install a Node version that fits `^22.23.5 || ^24.22.3`, and pnpm. Set the pnpm waiting time for new package versions.
2. Create a Next.js 16 app (App Router, TypeScript, `src/` folder) in the repo root. Pin `next` 16.4.6 or newer and `react` 19.2.9 or newer.
3. Add Tailwind v4, next-intl (`ckb` default, `ar`, `en`, prefix always), `proxy.ts`, and a `[locale]` layout that sets `lang` and `dir`.
4. Add the security basics before the first page: `.gitignore` check, `poweredByHeader: false`, the header block in `next.config`, no source maps in production.

Step B — home page (day 2–5)

5. Move the hero from `prototypes/home-hero/` into `src/features/home-hero/` with `@gsap/react` and `useGSAP` (plan 002, Parts 1–2). Apply the text changes from this plan.
6. Build the shared parts in `src/features/layout/`: header, language switcher, footer, section title, card, light-string divider.
7. Build home sections 2–10. The string of sixteen nights is the only other client component (it reads today's date to know which bulbs are lit).

Step C — other pages (day 5–8)

8. About, Experience, Families & Kids, Youth, New Year, Venue & Visit, Contact. One folder per page under `src/features/`.
9. No scroll effects on these pages (see "Movement" in the design direction). The only effect outside the hero is the bulbs turning on, and it respects `prefers-reduced-motion`.

Step D — languages, SEO, quality (day 8–11)

10. Put the Kurdish and Arabic texts in. Add a script that fails when the three message files do not have the same keys.
11. SEO: page titles and descriptions, hreflang (`ku-Arab`, `ar`, `en`, `x-default`), sitemap, `Event` JSON-LD, share images with a Kurdish-capable font.
12. Make the pictures small: phone sizes and AVIF. The hero pictures are 855 kB now; the budget is about 350 kB on a phone.
13. Test on a real phone in all three languages. Fix the six open points of the demo (see plan 002 review).

Step E — go live (day 11–13)

14. Hosting and domain (see "What the user must do"). Deploy, connect the domain, HTTPS.
15. Run `/websec` on the code and `/websec live` on the site. Fix what it finds.

## Timeline

| Dates | Work | Result |
|---|---|---|
| Thu 26 – Fri 27 Nov | User answers the questions. Step A. | A running empty site in 3 languages |
| Sat 28 Nov – Tue 1 Dec | Step B | Home page finished in English |
| Wed 2 – Fri 4 Dec | Step C | All 8 pages in English |
| Sat 5 – Mon 7 Dec | Step D | Kurdish and Arabic in, SEO, phone tests |
| Tue 8 – Wed 9 Dec | Step E | **Site live on Wed 9 Dec, one week before opening** |
| Thu 10 – Mon 14 Dec | Buffer, small fixes, content changes | |
| Tue 15 Dec | Freeze: no code changes | |
| 16 – 31 Dec | Text and photo updates only | |

The slowest parts are not code: the translations, the domain, the hosting account and the missing facts. They must start on day 1.

## What the user must do (the Worker cannot)

| # | Task | Needed by |
|---|---|---|
| 1 | Open "Ubuntu 24.04" from the Start menu and create a username and password | Fri 27 Nov |
| 2 | Find a native speaker for Kurdish (Sorani) and one for Arabic, and send them the brief | Fri 27 Nov, texts back by Fri 4 Dec |
| 3 | Give the missing facts: opening hours, entry price or "free entry", phone, email, social links, map pin | Mon 30 Nov |
| 4 | Send the logo and brand colours, if they exist | Mon 30 Nov |
| 5 | Decide the domain (`sulifest.krd`?) and buy it | Wed 2 Dec |
| 6 | Create the Cloudflare account with 2FA | Wed 2 Dec |

## Security (websec)

A front-end-only site has a small attack surface, because nothing is saved and nothing is sent. These points still matter:

| Check | What the Worker must do | websec source |
|---|---|---|
| Versions | `next` ≥ 16.4.5, `react` ≥ 19.2.9, `next-intl` ≥ 4.9.2. Check the advisory pages on the day of setup. | Stack file, section 1 |
| No unused backend | No Payload, no API routes, no Server Actions in this phase. If one is needed, stop and ask the PM. | Next.js checks 1–6 |
| Security headers | CSP without `unsafe-eval`, HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors 'none'`, `poweredByHeader: false` | Phase 7 |
| No outside scripts | No CDN, no embedded map, no chat widget, no tracking pixel. Fonts and GSAP from our own files. | Phase 3, point 5 |
| Locale value | Check the `locale` from the URL against the list before using it (`hasLocale`, else `notFound()`). Never use it in a file path or a redirect. | next-intl check 2 |
| Language routing | `localePrefix: 'always'`. The matcher in `proxy.ts` uses real boundaries (`api/`, not `api`). | next-intl check 1, stack file 6.2 |
| Text is text | Message texts are shown as plain text. No `dangerouslySetInnerHTML`, except the fixed JSON-LD block, where `<` is escaped. | Next.js check 15, next-intl check 5 |
| Links to other sites | `rel="noopener noreferrer"` on every outside link. Phone and WhatsApp links are fixed values from the message files. | Checklist G, W |
| Countdown | Uses the visitor's clock only. It reads nothing from the URL and sends nothing. | Checklist W |
| Packages | pnpm waiting time for new versions, install scripts blocked except an allow list, lockfile committed, no extra UI or animation library | Phase 3, point 6 |
| Secrets | This phase needs none. No `NEXT_PUBLIC_` secret. `.env*` and `.dev.vars*` stay in `.gitignore`. | Phase 4 |
| Hosting | `workers_dev: false`, `preview_urls: false`, custom domain only. Nothing private in `public/`. | Cloudflare file, section 2 |
| Pictures | Only pictures with a licence line in `SOURCES.md`, or from the organiser in writing. No SVG from outside sources. | Licence rule |
| Privacy | No cookies except the language choice. No analytics in this phase. | Checklist Y |

## Languages / RTL (kurdish-arabic-web)

- Three message files with the same keys. English first.
- `ckb` and `ar` are right-to-left. Use logical CSS only (`ms-`, `me-`, `ps-`, `pe-`, `text-start`).
- Dates: "16–31 December 2026" is written by the translator in each language, not built from parts. Use `ckb` and `ar-IQ`, never `ckb-IR`.
- The countdown numbers follow the digit style the team chooses (question 5).
- "SuliFest", "italk" and "Magma Square" inside Kurdish or Arabic sentences go in `<bdi>`.
- Arrows flip in RTL. The logo, the moon, the mountains and the tree do not. Santa flies the other way in RTL.
- Kurdish letters: ک ی ە ھ, not the Arabic ك ي ه. A native speaker checks every text.

## Database changes

None. One note for later, when the backend comes: there were two festivals in 2026 (SuliFest in summer, Christmas Nights in winter). The planned `year` field cannot tell them apart. We will need an `edition` field too (for example `christmas-nights-2026`). This is a change to a project rule, so it will be asked again in the backend plan.

## Done when (tests)

- [ ] All 8 pages exist in `ckb`, `ar` and `en`, and every text matches the brief or an answer from the organiser.
- [ ] No placeholder like `[PLACE]` is left on the live site.
- [ ] Real phone on mobile data: the home page is usable in under 3 seconds; scrolling the hero is smooth.
- [ ] Lighthouse mobile on Home: LCP ≤ 2.5 s, CLS ≤ 0.1. Hero pictures ≤ about 350 kB on a phone.
- [ ] Right-to-left pages look right at 375 px and on desktop. No letter spacing on Kurdish or Arabic text.
- [ ] With "reduce motion" on, and with JavaScript off, every page is readable.
- [ ] Keyboard only: every link can be reached and shows a focus ring. Text contrast is at least 4.5:1.
- [ ] The message-key check passes. A native speaker has approved Kurdish and Arabic.
- [ ] The network tab shows requests to our own domain only.
- [ ] `/websec` shows no CRITICAL or HIGH finding. securityheaders.com shows grade A or better.
- [ ] The site is live on the real domain with HTTPS, one week before 16 December.

## Risks

| Risk | What to do |
|---|---|
| The translations come late | Start on day 1. If one language is late, go live with the ready languages and hide the late one in the switcher. Kurdish must not be the missing one. |
| The domain or hosting account is not ready | Build and test locally until it is. Decide a second domain name now. |
| Missing facts (hours, price, contacts) | The page shows only what we know. No guessed facts. |
| One person does everything | Keep the scope of this plan. New ideas go on a list for January. |
| Many visitors on 31 December | All pages are static and served from Cloudflare's cache. No database to overload. |
| Vendors ask how to book a booth | The Contact page gives a phone and WhatsApp link for vendors. The booking system comes in a later plan. |

## Not in this plan

Booth booking, admin panel, Payload, database, contact form, daily programme, gallery, analytics, sponsors page, payment, visitor accounts. Each gets its own plan when the user asks.

## Questions for the user

1. **Order:** OK to start from plain Next.js and add Payload later (decision 2)?
2. **Pages:** are these 8 pages right? Anything to add or remove?
3. **Hero button:** "Plan your visit" instead of "Book a booth". OK?
4. **Facts:** opening hours, entry price or free, phone, email, social links, map pin?
5. **Digits in Kurdish and Arabic:** Arabic-Indic (١٢٣) or Western (123)?
6. **Brand:** is there a logo and are there brand colours?
7. **Domain:** `sulifest.krd`, or another name? Is it bought?
