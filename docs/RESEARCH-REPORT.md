# Build Sulifest on Cloudflare Workers, not Vercel

**The best plan is: keep Next.js 16 + Payload CMS 3 + TypeScript from the draft, but move hosting from Vercel's free plan to Cloudflare Workers Paid ($5 a month), and use Cloudflare D1 for the database and R2 for images.** Payload has an official Cloudflare template with D1 and R2, and the OpenNext adapter supports all Next.js 16 versions ([Payload template](https://github.com/payloadcms/payload/tree/main/templates/with-cloudflare-d1); [OpenNext Cloudflare](https://opennext.js.org/cloudflare)). This choice fixes three real problems in the draft. First, Vercel's free Hobby plan is only for "personal or non-commercial use", and a festival with sponsors and vendors is close to commercial ([Vercel Terms](https://vercel.com/legal/terms)). Second, Vercel asks you to keep Cloudflare in "DNS-only" mode, so you lose Cloudflare's free firewall, bot and rate-limit tools ([Vercel KB](https://vercel.com/kb/guide/cloudflare-with-vercel)). Third, Cloudflare has data centers in Sulaymaniyah and Erbil, but Vercel has no server region in the Middle East ([Cloudflare network](https://www.cloudflare.com/network/); [Vercel regions](https://vercel.com/docs/regions)). The Cloudflare path has costs too: you must pay $5 a month with a card that works from Iraq, develop inside WSL2 on Windows, use fewer password-hash rounds, and live with D1's simpler transactions. None of these blocks the project, and each has a clear fix. The total running cost is about **$7–10 a month**, including a domain. This report gives the full stack, the alternatives, costs, security, backups, SEO, risks, the changes to make in `PLAN.md`, and a step-by-step start list.

## The final stack in one table

The team knows HTML, CSS and JavaScript and wants Node.js. Next.js plus Payload gives one project for the public site, the admin panel and the booking API. Payload installs inside the Next.js app and gives login, roles, image upload, a booking collection with a status field, and per-language content with right-to-left (RTL) support in the admin ([Payload localization](https://payloadcms.com/docs/configuration/localization)). That covers about half of the feature list without custom code.

| Layer | Final choice | Main reason |
|---|---|---|
| Language | TypeScript (light use) | Payload makes types from your collections, so the editor catches typos |
| Framework | Next.js 16 (App Router), version **16.4.5 or newer** | Safe security line as of Nov 2026 ([Next.js Nov 2026 security release](https://nextjs.org/blog/november-2026-security-release.md)) |
| Admin / CMS | Payload CMS **3.94.2 or newer** (not 4.0 beta) | Latest stable, with "vital security updates" ([Payload releases](https://github.com/payloadcms/payload/releases)) |
| Hosting | **Cloudflare Workers Paid** via OpenNext | No non-commercial rule, local data centers, full Cloudflare security |
| Database | **Cloudflare D1** (SQLite) | Official template, included in the $5 plan, 30-day "Time Travel" restore |
| Images | **Cloudflare R2** + Cloudflare Image Transformations | 10 GB free, free egress ([R2 pricing](https://developers.cloudflare.com/r2/pricing/)) |
| Languages | Payload localization (content) + **next-intl 4.16** (UI text) | Works with Next.js 16 and `proxy.ts` ([next-intl docs](https://next-intl.dev/docs/routing/setup)) |
| Styling | Tailwind CSS v4.3 (+ shadcn/ui with RTL on) | Logical classes like `ms-4` work in both directions ([shadcn RTL](https://ui.shadcn.com/docs/rtl)) |
| Animations | CSS scroll-driven animations first, GSAP ScrollTrigger for 1–2 big sections | CSS is now Baseline in all main browsers ([web.dev](https://web.dev/blog/web-platform-10-2026)) |
| Forms | Zod on the server + Cloudflare Turnstile | Turnstile is free with unlimited checks ([Turnstile plans](https://developers.cloudflare.com/turnstile/plans/)) |
| Email | Resend free (3,000/month, 100/day) | Simple API; DNS set up on a sending subdomain ([Resend pricing](https://resend.com/pricing)) |
| Domain | `sulifest.krd` at an ICANN registrar, DNS on Cloudflare | Local identity; anyone can buy .krd ([dot.krd FAQ](https://dot.krd/faqs/)) |
| Monitoring | Sentry free + Cloudflare Web Analytics | 5k errors/month free ([Sentry pricing](https://sentry.io/pricing/)) |
| Code | Private GitHub repo, pnpm 11, Node.js 22 or newer | Payload raised its minimum to Node 22 ([Payload release post](https://payloadcms.com/posts/releases/new-in-payload-release-v3920)) |

Payload itself is a safe long-term choice. Figma bought the Payload team in June 2025, and Payload stayed open source and self-hostable ([Payload blog](https://payloadcms.com/posts/blog/payload-is-joining-figma)). It still ships releases every week. Version 4.0 is in beta (4.0.0-beta.12), so start on 3.x and move to 4 only after it becomes stable.

## Why Cloudflare Workers wins the hosting decision

The draft plan says "Vercel (free plan) + Cloudflare (free)". This looks cheap and easy, but it has three problems that matter for a public festival site. The table below puts the trade-offs from the notes side by side.

| Factor | Vercel | Cloudflare Workers | Winner |
|---|---|---|---|
| Free plan rules | Hobby is "personal or non-commercial use" only. Commercial means "financial gain of anyone involved" ([Vercel fair use](https://vercel.com/docs/limits/fair-use-policy)) | No such clause found (Cloudflare terms not fully checked) | Cloudflare |
| Real cost | Hobby $0 (risky); Pro **$20 per developer seat per month** ([Vercel pricing](https://vercel.com/pricing)) | **$5 per account per month**; Free plan has only 10 ms CPU per request, too low for Payload ([Workers limits](https://developers.cloudflare.com/workers/platform/limits/)) | Cloudflare |
| Cloudflare security tools | Vercel recommends DNS-only (grey cloud); if you proxy, Vercel Bot Protection breaks and Vercel support will not help ([Vercel KB](https://vercel.com/kb/guide/cloudflare-with-vercel)) | WAF, Bot Fight Mode, rate-limit rule and DDoS protection all work natively | Cloudflare |
| Speed from Kurdistan | No Middle East compute region; default is Washington D.C., nearest is Frankfurt ([Vercel regions](https://vercel.com/docs/regions)) | Data centers in Sulaymaniyah, Erbil and 4 more Iraqi cities ([Cloudflare network](https://www.cloudflare.com/network/)) | Cloudflare |
| Database | Any Postgres (Neon etc.) with real transactions | D1 (SQLite, no interactive transactions) or Postgres through Hyperdrive | Vercel |
| Password hashing | Payload default: 600,000 PBKDF2 rounds | Payload docs say set **100,000** on Workers ([Payload auth](https://payloadcms.com/docs/authentication/overview)) | Vercel |
| Windows development | Works normally | OpenNext says Windows is "not guaranteed"; use WSL2 ([OpenNext](https://opennext.js.org/cloudflare)) | Vercel |
| Next.js features | Best support (Vercel makes Next.js) | App Router, SSG, SSR, ISR, image optimization all supported; GraphQL "not guaranteed" | Vercel (small) |
| Card needed | Hobby: no. Pro: yes | Paid: yes | Vercel Hobby |

**The decision is Cloudflare Workers Paid.** The "commercial" question is the deciding point. Booth booking is free, but vendors sell things at their booths, and sponsors usually put logos on the site. Vercel says that if you are unsure, you should ask its support team ([Vercel fair use](https://vercel.com/docs/limits/fair-use-policy)). Public community questions about volunteer ticket sites got no official public answer ([Vercel community](https://community.vercel.com/t/fair-use-for-ticket-sales-for-volunteer-ran-site/1840)). So Hobby is not safe to rely on. The legal option on Vercel is Pro, and three developers would cost about $60 a month. Cloudflare costs $5 for the whole account. The team already uses Cloudflare, and on Workers every Cloudflare free security tool protects the site with no extra setup. Local visitors also reach a data center in their own city.

The Vercel side does win four rows, so here is why each one is acceptable:

**D1 instead of Postgres.** D1 cannot run multi-step transactions; only one statement or one `batch()` is atomic ([Cloudflare D1 blog](https://blog.cloudflare.com/whats-new-with-d1/)). But a unique rule in the database still stops double booking (see the next section). Booth bookings are few, and only a small admin team approves them. If D1 causes real trouble, Plan B is Neon Postgres through Cloudflare Hyperdrive on the same Workers host ([Cloudflare blog: Payload on Workers](https://blog.cloudflare.com/payload-cms-workers/)).

**100,000 password-hash rounds instead of 600,000.** This only matters if an attacker steals the database and tries to guess passwords offline. Fewer rounds make guessing faster. The fix is simple: only a few admin accounts, long random passwords (16+ characters from a password manager), login lockout, and a second login factor. Two warnings: set `passwordHashIterations: 100000` **before you create the first user**, because users with 600,000-round hashes must reset their password to log in on Workers ([Payload auth](https://payloadcms.com/docs/authentication/overview)). Also, Payload published an advisory on 29 Sep 2026 called "Password hashes use insufficient PBKDF2 iterations" ([Payload advisories](https://github.com/payloadcms/payload/security/advisories)). Read it before launch, because it may be about this same setting. The notes do not say why Workers needs fewer rounds; the CPU time limit is the likely reason, but this is not confirmed.

**WSL2 on Windows.** The team works on Windows. Install WSL2 (Ubuntu) once and run all `pnpm`, `wrangler` and build commands inside it. This takes one afternoon.

**Card from Iraq.** Workers Paid needs a card. From 19 Sep 2026 some Iraqi cards stopped working for online and overseas payments, and Qi Card confirmed "limited" disruptions ([Shafaq News](https://shafaq.com/en/Economy/Qi-Card-confirms-limited-payment-disruptions)). Test the card in week one. Keep a backup payer, for example a team member or sponsor abroad. Note that Vercel Pro also needs a card, so this risk exists on both sides.

The fallback, if Workers fails for the team, is **Vercel Pro** with functions in Frankfurt (`fra1`) and a Neon Postgres database in Frankfurt. Do not run the public site on Vercel Hobby without a written "yes" from Vercel support.

## D1 for the database, with a unique rule against double booking

The two research notes disagree here. One says "Postgres (Neon) is the safest" because it has real transactions. The other says use the official D1 template. This report picks **D1**, for four reasons. It is what Payload's official Cloudflare template uses, so setup and docs match. It is already inside the $5 plan (10 GB per database, 50 million rows written per month included) ([D1 limits](https://developers.cloudflare.com/d1/platform/limits/)). It has **30 days of Time Travel restore** on the Paid plan, while Neon Free keeps only **6 hours** of history ([Neon pricing](https://neon.com/pricing)). And it removes one more outside account to secure.

Payload's D1 adapter is still active: release 3.94.1 on 20 Nov 2026 fixed a D1 adapter bug ([Payload releases](https://github.com/payloadcms/payload/releases)). There is also a known Turbopack build error with the D1 package ([Payload issue #14338](https://github.com/payloadcms/payload/issues/14338)), so check it before you start.

**The booking design must change from the draft.** The draft says "Booking status = Pending (the booth is held)". That is a weakness: one bot or one bad person could send many forms and "hold" every booth. A better design: many people can send a `pending` request for the same booth, and **only the admin's "approve" action locks the booth**. To make double booking impossible, add a field like `approvedBoothKey` to the Bookings collection. It is empty while the booking is pending or rejected, and it is set to the booth ID only when the admin approves. Give that field a unique index. In SQLite, empty (NULL) values do not clash in a unique index, so many pending bookings are allowed, but a second approval for the same booth fails. Test this rule with two browser tabs before launch. Keep approve logic to one database write, because D1 will not roll back a hook that does several writes and then fails. Payload turns transactions off by default on SQLite anyway ([Payload SQLite docs](https://payloadcms.com/docs/v3/database/sqlite.md)).

## Real alternatives for each choice

Every choice has a real second option. The table shows when you would pick it.

| Choice | Picked | Real alternative | When the alternative is better |
|---|---|---|---|
| Framework | Next.js 16 | **Astro 6** (now owned by Cloudflare since Jan 2026) ([Cloudflare press](https://www.cloudflare.com/press/press-releases/2026/cloudflare-acquires-astro-to-accelerate-the-future-of-high-performance-web-development/)) | If the admin side were tiny. Astro is faster and closer to plain HTML, but has no built-in admin or booking approval |
| Framework | Next.js 16 | SvelteKit / Nuxt / plain Express | Express is easiest to read, but you build login, admin, i18n and security by hand. Most work and most risk |
| CMS | Payload 3 | **Strapi 5** | Free roles, good i18n, but needs its own server and has no built-in 2FA either ([Strapi blog](https://strapi.io/blog/strapi-admin-panel-mfa-2fa)) |
| CMS | Payload 3 | Directus | Strong admin, but v12 moved to the "MSCL" source-available license ([Directus blog](https://directus.io/blog/directus-v12-license-change)) |
| CMS | Payload 3 | Sanity | Hosted, but the free plan has only Admin and Viewer roles ([Sanity pricing](https://www.sanity.io/pricing)) |
| CMS | Payload 3 | Supabase + custom admin | Supabase Free pauses after 1 week without activity and has no backups ([Supabase pricing](https://supabase.com/pricing)); you build the admin yourself |
| Database | D1 | **Neon Postgres via Hyperdrive** | If you need real multi-step transactions. Free: 1 GB, 6-hour history |
| Database | D1 | Turso | Free 5 GB, 1-day restore ([Turso pricing](https://turso.tech/pricing)); less tested with Payload |
| Hosting | Workers Paid | **Vercel Pro** ($20/seat) | If OpenNext gives too many problems |
| Hosting | Workers Paid | Hetzner VPS (~€5.49+/month) | Full Node.js, but prices rose twice in 2026 and you must patch and back up the server yourself ([Northflank](https://northflank.com/blog/hetzner-cloud-server-price-increases)) |
| Hosting | Workers Paid | Render free | Not suitable: sleeps after 15 min and free Postgres expires after 30 days ([Render docs](https://render.com/docs/free)) |
| Animations | CSS + GSAP | **Motion** (React) | For menus, tabs, cards. Use `LazyMotion` to keep it at ~5 kB + 24 kB ([Motion docs](https://motion.dev/docs/react-reduce-bundle-size)) |
| Smooth scroll | None | Lenis | Optional, desktop only; it fights with maps and video iframes ([Lenis GitHub](https://github.com/darkroomengineering/lenis)) |
| i18n library | next-intl 4.16 | next-i18next 16.5, Paraglide 3.2, Lingui 6.12 | None solves a Kurdish-specific problem; next-intl is the most App-Router-native |
| Email | Resend free | **Cloudflare Email Service** (3,000/month included in Workers Paid) ([Cloudflare pricing](https://developers.cloudflare.com/email-service/platform/pricing/)) | If you send more than 100 emails a day. Still in beta per secondary sources |
| Email | Resend free | Brevo free (300/day) | Higher daily limit, but adds "Sent with Brevo" to every email ([Brevo help](https://help.brevo.com/hc/en-us/articles/208580669)) |
| Domain | `.krd` | `.com` at Cloudflare Registrar ($10.46/year) | Buy it too, to protect the name and redirect. Cloudflare does not sell .krd or .iq ([Cloudflare TLD policies](https://www.cloudflare.com/tld-policies/)) |
| Domain | `.krd` | `.iq` | Only for Iraqi entities with documents; about $150–380/year ([Marcaria](https://support.marcaria.com/hc/en-us/articles/115003297026-What-are-the-registration-requirements-for-registering-a-IQ-domain)) |

## Three languages need more care than the draft shows

The draft's language plan is right in shape: URLs `/ckb`, `/ar`, `/en`, Payload `localization` for content, next-intl message files for buttons and menus, `<html lang dir>` per language, and logical CSS. But the research found several Kurdish-specific traps.

**Payload setup.** Payload accepts any locale code, so `ckb` is fine, and each locale can set `rtl: true` ([Payload localization](https://payloadcms.com/docs/configuration/localization)). Use `ckb` (RTL), `ar` (RTL) and `en`, with `defaultLocale: 'ckb'`. Fallback is on by default. This means an untranslated Kurdish page will silently show English text inside a right-to-left layout. Set `fallbackLocale: 'en'`, ask editors to fill all three languages before they publish, and put `lang="en" dir="ltr"` on any fallback text. Payload's admin has an Arabic translation but **no Kurdish one** ([Payload translations](https://github.com/payloadcms/payload/tree/main/packages/translations/src/languages)). Kurdish editors will use the admin in Arabic or English. That is fine for a small team.

**next-intl on Next.js 16.** The routing file is now `proxy.ts` (it was `middleware.ts` before Next.js 16), and next-intl does not set `dir` or `lang` for you; you set them in the `[locale]` layout ([next-intl docs](https://next-intl.dev/docs/routing/setup)). Phones rarely send `ckb` as their language, so do not trust auto-detect. Use a cookie and a clear switcher with native names: کوردی · العربية · English. When there is no cookie, default to Kurdish.

**Dates and numbers.** A test with Node.js (full ICU) found that `ckb` has real data, but with holes. Relative time ("3 days ago") and lists ("a, b and c") come out in English. The full date pattern mixes an ASCII comma into RTL text. And **`ckb-IR` switches to the Persian solar calendar** — never use it. For Arabic, `ar` gives Western digits and `أبريل`, while `ar-IQ` gives Arabic-Indic digits and `نيسان`. Use `ckb` and `ar-IQ`, choose one digit style per language on purpose, and write your own Kurdish strings for "days left" and similar text. Arabic plural messages need up to six forms; Kurdish needs only two. These results came from the research team's local Node test, not from a web page, and **browsers were not tested**. Run the same check in Chrome and Safari before you trust `Intl` on the client.

**Fonts.** A check of the real font files found that **Vazirmatn, Noto Sans Arabic, Noto Kufi Arabic, Noto Naskh Arabic, IBM Plex Sans Arabic and Mada contain every Sorani letter**. Many popular Arabic fonts do not: **Cairo, Tajawal, Almarai, Alexandria, Changa, El Messiri, Lalezar, Markazi Text, Readex Pro and Rubik are missing ڕ ڵ ێ ۆ ە** (font files from [google/fonts](https://github.com/google/fonts/tree/main/ofl)). If a designer picks Cairo, Kurdish words will break in the middle. Use Vazirmatn or Noto for both ckb and ar, plus one Latin font for English. Kurdish fonts like Rabar or NRT have unclear web licenses, so do not use them without written permission.

**User input.** People type Kurdish with Arabic keyboards. So text arrives with ك instead of ک, ي instead of ی, and ه + ZWNJ instead of ە, plus three digit systems ([r12a Sorani notes](https://r12a.github.io/scripts/arab/ckb)). For search and duplicate checks, convert ك→ک, ي/ى→ی, ه‌→ە, and all digits to 0–9, but only for Kurdish text. For phone and email fields, accept all three digit systems, convert to ASCII before Zod validation, and set `dir="ltr"` on the input.

**Layout.** Use `ms-/me-/ps-/pe-/start-/end-/text-start` in Tailwind instead of left and right. Flip arrow icons in RTL, but never flip logos, clocks or play buttons. Wrap English names, prices and phone numbers inside Kurdish sentences in `<bdi>`. Tailwind's `rtl:` variant only works when a `dir` attribute is on the page ([Tailwind docs](https://tailwindcss.com/docs/hover-focus-and-other-states#rtl-support)). In booking emails, put `dir="rtl"` on every table and cell, because many email apps remove it from `<html>`.

## Scroll animations: CSS first, GSAP for the big moments

The draft uses GSAP + Lenis for everything, with a `useEffect` hook. The 2026 picture is better than that. **CSS scroll-driven animations (`animation-timeline: view()`) are now Baseline**: Chrome and Edge 115, Safari 26 and Firefox 159 (October 2026) all support them ([web.dev](https://web.dev/blog/web-platform-10-2026)). They need zero JavaScript and run smoothly on cheap phones. Use them for fade-in, slide-up, progress bars and light parallax. Wrap them in `@supports (animation-timeline: view())` so older browsers just show the content.

Use **GSAP ScrollTrigger** only for one or two "wow" sections, like a pinned hero or a horizontal line-up. GSAP and all its plugins (including SplitText) are free for commercial websites under the Webflow Standard License ([GSAP license](https://gsap.com/standard-license)). Use the official `@gsap/react` package and its `useGSAP()` hook instead of `useEffect`, because it cleans up animations automatically ([GSAP React guide](https://gsap.com/resources/React/)). Load GSAP only on the pages that need it. For Kurdish and Arabic, split text by **words, never by letters**, because splitting letters breaks Arabic-script joining (this is an inference from how the script works, not a tested result). Movements on the x-axis do not flip with `dir`, so multiply `x` by −1 in RTL.

**Drop Lenis by default.** It stops scrolling over iframes like Google Maps and YouTube, and on Safari it is capped at 60 fps or 30 fps in low-power mode ([Lenis GitHub](https://github.com/darkroomengineering/lenis)). Native mobile scrolling is already smooth.

Performance rules matter because many visitors use mid-range Android phones on mobile data. Google's "good" scores are LCP ≤ 2.5 s, INP ≤ 200 ms and CLS ≤ 0.1 ([web.dev Web Vitals](https://web.dev/articles/vitals)). Animate only `transform` and `opacity`. **Do not start the hero heading or image at `opacity: 0`** — it makes LCP worse. Respect `prefers-reduced-motion` in CSS and with `gsap.matchMedia()`. In Next.js 16, `priority` on images is deprecated; use `preload` or `loading="eager"` + `fetchPriority="high"` for the hero, and add AVIF yourself with `formats: ['image/avif', 'image/webp']` ([Next.js Image docs](https://nextjs.org/docs/app/api-reference/components/image)). A sensible team budget: about 150–170 kB of JavaScript (gzip) on the home page and a hero image under 150 kB.

Tailwind v4 needs Chrome 111, Safari 16.4 or Firefox 128 or newer ([Tailwind compatibility](https://tailwindcss.com/docs/compatibility)). If your analytics later show many visitors on older in-app browsers, Tailwind 3.4 is the fallback.

## Security plan built on Payload, Cloudflare and good habits

The current list is the **OWASP Top 10:2025**, with Broken Access Control at #1, Security Misconfiguration at #2 and the new **Software Supply Chain Failures at #3** ([OWASP](https://top10.owasp.org/2025/0x00_2025-Introduction)). Next.js had **51 security advisories in 2026** by 17 Nov, including critical remote-code bugs, and now ships security releases about once a month ([Next.js blog](https://nextjs.org/blog/how-were-using-ai-to-make-nextjs-more-secure.md)). Payload also had a CVSS 9.8 SQL injection bug in early 2026, fixed in 3.73.0 ([GitLab advisory](https://advisories.gitlab.com/npm/@payloadcms/drizzle/CVE-2026-25544/)). So **updating every month is part of the security plan**, not an extra.

| Area | What to do |
|---|---|
| Versions | Next.js ≥ 16.4.5, Payload ≥ 3.94.2, latest React 19. "Watch → Security alerts" on both GitHub repos |
| Access control | Write `access` functions on every collection and sensitive field. Public users never use Payload's REST API directly to create bookings; they go through your own server action |
| Booking form | Turnstile token checked on the server (check `success`, `hostname`, `action`; reject on failure or timeout) ([Turnstile docs](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)) → Zod → write with Payload Local API with status forced to `pending` |
| Spam limits | Cloudflare's 1 free rate-limit rule on `/booking` and `/api/users/login` ([Cloudflare rate limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/)), plus a limit of a few pending bookings per email/phone, plus a hidden honeypot field |
| Admin login | `maxLoginAttempts: 5`, `lockTime` 15 min, `useSessions: true`, short `tokenExpiration`, secure cookies, `useAPIKey: false`, set `csrf` and `cors` lists ([Payload auth](https://payloadcms.com/docs/authentication/overview)) |
| 2FA | **Payload has no built-in 2FA.** Test a community plugin like `payload-totp` first ([README](https://app.unpkg.com/payload-totp@3.0.0-beta.3/files/README.md)); if it is not ready, protect `/admin` with Cloudflare Access (free limits not checked) |
| Roles | `admin`, `editor`, `booth-manager`; only admins change roles; no public sign-up |
| Uploads | Private R2 bucket; allow only jpg/png/webp/PDF, max 5 MB; **no SVG, XML or XSL**; no "upload from URL" (Payload fixed XSS and SSRF bugs in these areas in Nov 2026) ([Payload advisories](https://github.com/payloadcms/payload/security/advisories)) |
| Headers | Static CSP in `next.config` `headers()` (a nonce CSP forces every page to be dynamic) ([Next.js CSP guide](https://nextjs.org/docs/app/guides/content-security-policy)); allow `challenges.cloudflare.com` for Turnstile; HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors 'none'` |
| Cloudflare | SSL Full (strict), Free Managed Ruleset, 5 custom rules, Bot Fight Mode ([Cloudflare WAF](https://developers.cloudflare.com/waf/managed-rules/)) |
| Supply chain | pnpm 11 with a minimum release age of 3–7 days (allow fast override for security patches), install scripts blocked, lockfile committed, `--frozen-lockfile` in CI, Dependabot on. A 7-day wait would have fully blocked the 2026 TanStack worm ([Snyk](https://snyk.io/blog/tanstack-npm-packages-compromised/)) |
| Secrets | `wrangler secret put` for all keys; never `NEXT_PUBLIC_` for secrets; `.env*` in `.gitignore`; 2FA on GitHub, Cloudflare, registrar and email accounts |
| GraphQL | Turn it off; it is "not guaranteed" on Workers anyway ([Payload template](https://github.com/payloadcms/payload/tree/main/templates/with-cloudflare-d1)) |
| Privacy | Iraq has **no enacted data protection law** (draft since 2021) ([regulations.ai](https://regulations.ai/regulations/iraq-summary)). Still: short privacy page in 3 languages, consent checkbox, minimum data, delete about 12 months after the festival. KRG Law No. 6 of 2008 punishes publishing private information ([CJR](https://www.cjr.org/special_report/iraq-kurdistan-law-6.php)), so **never show the applicant list publicly** |
| Monitoring | Sentry free (remove phone and email from error events), Cloudflare Web Analytics, one uptime check |

Also write a one-page incident plan: who is on call, how to switch off the booking form (an environment flag), how to rotate secrets and end all admin sessions, and how to restore from backup.

## Backups, email and domain

**Backups.** Use three layers. First, D1 Time Travel gives 30 days of point-in-time restore on the Paid plan ([D1 limits](https://developers.cloudflare.com/d1/platform/limits/)). Second, run a daily GitHub Actions job with `wrangler d1 export` and save the file to a separate private R2 bucket; keep 30 days. Third, copy the media bucket to a second bucket, and export bookings to CSV each week for the organisers. R2 storage is free up to 10 GB ([R2 pricing](https://developers.cloudflare.com/r2/pricing/)). **Test one full restore before bookings open.** The draft only says "daily automatic backup", which is not specific enough.

**Email.** Resend free covers booking-received, booking-approved and password-reset emails. Watch the **100 emails per day** limit: if many vendors apply on the same day, move to Cloudflare Email Service (3,000/month already included in Workers Paid) or Brevo. Send from a subdomain like `send.sulifest.krd`. Set SPF (only one SPF record), DKIM and DMARC starting at `p=none`, then move to `p=quarantine` after 2–4 clean weeks. Gmail requires SPF or DKIM for all senders ([Google sender guidelines](https://support.google.com/a/answer/81126)). Use Cloudflare Email Routing (free) to forward `info@` and `booking@` to the organisers' inboxes. Send each email in the language the visitor used.

**Domain.** The draft suggests `sulifest.com`. Register **`sulifest.krd`** as the main domain. Anyone can buy .krd at normal registrars for about $25–45 a year, but some names are reserved ([dot.krd FAQ](https://dot.krd/faqs/); [tldprice.org](https://tldprice.org/tld/krd)). Point its nameservers to Cloudflare (free DNS works with any registrar). Optionally buy `sulifest.com` at Cloudflare Registrar for $10.46 a year and redirect it ([cfdomainpricing](https://cfdomainpricing.com/)). Turn on registrar lock, auto-renew and 2FA, and pay for several years at once so a failed Iraqi card cannot make the domain expire before the festival.

## SEO and accessibility

Use separate URLs per language and add hreflang links that point both ways, plus `x-default`. There is one Kurdish problem: Google says it supports only **ISO 639-1** language codes in hreflang, and `ckb` is a 3-letter ISO 639-3 code ([Google: localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)). Keep `<html lang="ckb">` (correct for browsers, fonts and screen readers), but use **`ku-Arab`** in hreflang for the Kurdish pages, because it fits Google's stated rules. This is an inference, so check it in Google Search Console after launch. Set `x-default` to the Kurdish home page.

Add `Event` JSON-LD to each event page with name, start date and a full street address. **Google's Event rich results are not offered in Iraq, Arabic or Kurdish** ([Google: Event data](https://developers.google.com/search/docs/appearance/structured-data/event)), so do not expect special event cards in local search. The data still helps other search engines and AI tools. Make Open Graph images (1200×630) for each language, and load a Kurdish-capable font into `next/og`, or Kurdish text will show as boxes.

No Iraqi law requiring accessible websites was found; Iraq scores zero for web accessibility policy ([G3ict](https://g3ict.org/country-profile/iraq)). Still aim for **WCAG 2.2 AA** ([W3C](https://www.w3.org/TR/WCAG22/)): text contrast 4.5:1, full keyboard use with visible focus, alt text, labels on every form field, touch targets at least 24×24 px, a way to pause moving content, and the right `lang` on every page. Bright festival colours often fail contrast, so check them in Figma early. Figma is free for verified students, but many users report verification problems ([Figma Help](https://help.figma.com/hc/en-us/articles/360041061214)); Penpot is a free fallback.

## Monthly costs

| Item | Cost per month | Note |
|---|---|---|
| Cloudflare Workers Paid | **$5.00** | Includes 10M requests, D1 Paid limits ([Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/)) |
| D1 database | $0 | Inside the $5 plan for a site this size |
| R2 images (under 10 GB) | $0 | Free egress |
| Image transformations | $0 | 5,000 free per month, then $0.50 per 1,000 ([Cloudflare Images](https://developers.cloudflare.com/images/pricing/)) |
| Turnstile, DNS, WAF, DDoS, Email Routing | $0 | Free plan |
| Resend email | $0 | Up to 3,000/month |
| Sentry, Cloudflare Web Analytics | $0 | Free plans |
| `.krd` domain | ~$2–4 | $25–45 per year |
| `.com` domain (optional) | ~$0.90 | $10.46 per year |
| **Total** | **about $7–10** | |

For comparison, the Vercel Pro fallback is $20 per developer seat plus a database, so about $40–60+ a month for a team of two or three. Vercel Hobby is $0 but carries the terms risk.

## What should change in the draft PLAN.md

The draft at `Desktop\Sulifest\PLAN.md` is a good start. Its pages, collections, roles, Zod, Turnstile and logical-CSS ideas stay. These parts should change:

| Draft says | Change to | Why |
|---|---|---|
| Hosting: Vercel free + Cloudflare | Cloudflare Workers Paid ($5) with OpenNext | Non-commercial rule, DNS-only conflict, latency |
| Database: Neon Postgres | Cloudflare D1 (Neon via Hyperdrive as Plan B) | Official template, 30-day restore, one platform |
| `npx create-payload-app` with "website" template, PostgreSQL | Payload `with-cloudflare-d1` template (or its "Deploy to Cloudflare" button), with pnpm, inside WSL2 | Matches the hosting choice. Note: this template starts blank (only `users` and `media`) |
| Node.js 20 or newer | Node.js 22 or newer | Payload's new minimum |
| "Pending holds the booth" | Pending does not hold; only approval locks the booth, guarded by a unique field | Stops spam from blocking all booths |
| Booths status: free/pending/booked | Booths: free/booked. Bookings: pending/approved/rejected | Cleaner data |
| "Turn on 2FA for admins" | 2FA needs a community plugin or Cloudflare Access; test first | Payload has no built-in 2FA |
| GSAP + Lenis with `useEffect` | CSS scroll-driven animations first; GSAP via `useGSAP()` for 1–2 sections; no Lenis | Lighter, better on cheap phones, auto clean-up |
| `X-Frame-Options: DENY` | CSP `frame-ancestors 'none'` (keep X-Frame-Options for old browsers) | Modern standard |
| "Admin page at a non-public path" | Hiding the path is not security; use roles, lockout, 2FA or Cloudflare Access | Payload uses `/admin` anyway |
| "Daily automatic backup" | D1 Time Travel + daily `wrangler d1 export` to R2 + restore test | Specific and tested |
| `npm audit` weekly | pnpm 11 with release-age delay, blocked install scripts, Dependabot, monthly Next.js/Payload updates | 2026 supply-chain attacks |
| Domain `sulifest.com` | `sulifest.krd` main, `.com` optional redirect | Local identity; Cloudflare does not sell .krd |
| Fonts: Vazirmatn or Noto Sans Arabic | Same, plus a warning list (no Cairo, Tajawal, Almarai…) | They miss Kurdish letters |
| `Intl.DateTimeFormat` with the locale | Use `ckb` and `ar-IQ`, never `ckb-IR`; custom strings for relative time | ICU gaps for Kurdish |
| hreflang not mentioned | `ku-Arab` in hreflang, `lang="ckb"` in HTML | Google's ISO 639-1 rule |
| Upload types jpg/png/webp | Same, plus explicitly block SVG/XML/XSL and URL uploads | Nov 2026 Payload advisories |
| 6-week plan | Add a "week 0" for accounts, card test, WSL2, domain, Figma | These can block everything else |

## Risks and open questions

| Risk | How likely | What to do |
|---|---|---|
| Iraqi card fails for Cloudflare or the registrar | Medium (Sept 2026 disruptions) | Test in week 0; backup payer abroad |
| OpenNext/D1 problems (build errors, bundle size) | Medium | Deploy "hello world" in week 1; run `wrangler deploy --dry-run`; Plan B is Hyperdrive + Neon, then Vercel Pro |
| Bundle size limit | Low | Sources conflict: Cloudflare says 64 MiB, the OpenNext page still says 10 MiB compressed. Test early |
| Payload image resizing (`sharp`) may not run on Workers | Medium (not confirmed) | Use Cloudflare Image Transformations instead of Payload `imageSizes` |
| Weaker password hashing on Workers | Low if passwords are long | Password manager, few admins, 2FA; read the 29 Sep 2026 advisory |
| Security bugs in Next.js or Payload | High (51 Next.js advisories in 2026) | Monthly update day; watch security alerts |
| Kurdish `Intl` output differs in browsers | Medium | Test in Chrome and Safari; format dates on the server |
| `sulifest.krd` is taken or reserved | Unknown | Check availability now |
| Internet shutdowns in Iraq (exam season) | Known pattern, not researched | Do not schedule launch or booking deadlines in exam weeks |

Open questions for the team: Is the festival a registered organisation, and will it charge vendors anything later (this affects the "commercial" question and the privacy policy)? What is the festival date, and when must booking open? How many booths, and do they have zones or sizes? Who owns the Cloudflare account and the card? Will most editors write first in Kurdish or English? Should Kurdish pages use Arabic-Indic or Western digits? Is the exact `create-payload-app` command for the D1 template still the same (check the template README on the day you start)?

## Step-by-step start checklist

1. **Week 0 – accounts.** Create or check: GitHub (2FA), Cloudflare (2FA), Resend, Sentry. Add the card to Cloudflare and upgrade to Workers Paid. If the card fails, find a backup payer.
2. **Week 0 – domain.** Check `sulifest.krd`. Buy it at a registrar that sells .krd, with auto-renew, lock and 2FA. Point nameservers to Cloudflare. Optionally buy `sulifest.com` at Cloudflare.
3. **Week 0 – computers.** Install WSL2 (Ubuntu), Node.js 22+, pnpm 11, Git and VS Code (with the WSL extension). Set pnpm's minimum release age.
4. **Week 0 – design.** Apply for Figma Education. Pick Vazirmatn or Noto for ckb/ar. Test a Kurdish sample with ڕ ڵ ێ ۆ ڤ ە ھ. Check colour contrast.
5. **Week 1 – project.** Inside WSL2, create the project from Payload's `with-cloudflare-d1` template. Check versions (Next.js ≥ 16.4.5, Payload ≥ 3.94.2). Set `passwordHashIterations: 100000` before creating any user. Turn off GraphQL.
6. **Week 1 – first deploy.** Create the D1 database and R2 bucket, run `pnpm payload migrate:create` and `pnpm run deploy` ([template README](https://github.com/payloadcms/payload/tree/main/templates/with-cloudflare-d1)). Connect the domain. Set SSL Full (strict). Store secrets with `wrangler secret put`.
7. **Week 1 – languages.** Add Payload `localization` (ckb, ar, en; RTL for ckb and ar). Add next-intl with `proxy.ts`, a `[locale]` layout that sets `lang` and `dir`, and a language switcher with a cookie.
8. **Week 2 – content.** Build collections: Events, Booths, Bookings, Media, Users (with roles and access rules). Build Home, About, Schedule, Gallery, Contact.
9. **Week 3 – booking.** Booking form with Turnstile, Zod, digit conversion and `dir="ltr"` on phone/email. Server action writes `pending`. Admin approve sets `approvedBoothKey` (unique). Emails in the visitor's language. Rate-limit rule and per-email limits.
10. **Week 4 – animations and SEO.** CSS scroll animations, one GSAP section, reduced-motion support. hreflang (`ku-Arab`, `ar`, `en`, `x-default`), sitemap, Event JSON-LD, Open Graph images.
11. **Week 5 – security and backups.** Headers and CSP, 2FA plugin or Cloudflare Access, upload limits, Dependabot, Sentry. Daily D1 export to R2. **Do one full restore test.** Write the privacy page and the incident plan.
12. **Week 6 – launch.** Test on a mid-range Android phone with slow 4G, with keyboard only, and in all three languages. Check securityheaders.com. Open bookings. Put a monthly "update day" in the calendar.

## Conclusion

The big change from the draft is not the framework but the platform under it. Next.js and Payload were already the right tools. What the research adds is that the cheap-looking host (Vercel Hobby) is the risky one for a festival, and the host the team already uses (Cloudflare) is now a real, documented home for a full Payload app — at a quarter of Vercel Pro's price for even one seat, and with servers in Sulaymaniyah itself. The costs of this choice are small and known: a WSL2 setup, a lower hash count protected by good passwords, and a booking design that relies on a unique database rule instead of transactions.

The second lesson is that "three languages" is really a Kurdish-first engineering task. Fonts, keyboards, digits, `Intl` data, hreflang and Payload's admin each have a Kurdish gap that English-first tools do not warn you about. The team that tests a Kurdish sentence in every layer in week one will avoid most of the late surprises. And because Next.js and Payload both shipped many security fixes in 2026, the plan only stays "verified" if the team treats a monthly update day as part of the project, not as an extra.
