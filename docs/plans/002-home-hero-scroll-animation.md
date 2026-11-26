# 002 — Home hero with scroll animation (like the reference video)

Status: Draft (waiting for the user's answers and "yes")
Date: 2026-11-26
Main plan section: 6 "Scroll animations", timeline week 4
Needs first: plan 001 (project setup), the 3 languages, and a basic Home page

## Goal

Build the top of the Home page with the same animations as the reference video:
a night scene made of layers that move at different speeds when the visitor scrolls,
then a second scene with a card that rises from the bottom.

We copy the **movement**. We do **not** copy the pictures, the texts or the Christmas theme.
The pictures in the video belong to another designer. Sulifest needs its own pictures.

Reference video: `Desktop\WhatsApp Video 2026-11-26 at 14.34.57.mp4` (18 seconds, a screen recording of a template preview).
Reference page: https://www.sliderrevolution.com/templates/christmas-gift-card-landing-page/ ("Christmas Gift Card Landing Page", a Slider Revolution template).
Reference frames: `docs/plans/refs/002/` (4 images, **for looking only, never put them on the site**).
Moving preview with Sulifest drawings: https://claude.ai/artifact/GyzxoHAdFLZBg2L2bZJryq (private link of the user).

### Why we cannot use the template itself (checked 2026-11-26)

| Fact from the template site | What it means |
|---|---|
| The page says "Buy now" and "Licenses start from $39 a year". It never says the template is free. | It is a paid product. |
| It runs inside the Slider Revolution **WordPress** plugin. | It does not fit our stack (Next.js + Payload, no PHP). |
| The licence says the CSS, JavaScript, images, design assets and premium templates are "proprietary", and taking parts out for separate use is not allowed. | We must not download or copy its files or pictures, with or without paying. |

So the rule for the Worker: **look at it, learn the movement, build our own.** Never download, copy or trace files from that site.

### Free photos we can use (added 2026-11-26)

Free photos with the same look are in `docs/design/hero-free-photos/` (moon, snow mountains, clouds, dark trees, Santa sleigh with reindeer). All are public domain or CC0 from Wikimedia Commons. The licence list is in `SOURCES.md` in that folder. The moving preview uses them, with falling snow made in CSS.

Added to the scene after the user's feedback: the Santa sleigh with reindeer flying across the moon, and falling snow (three CSS layers at different speeds, no JavaScript).

Rules for the sleigh (user feedback, 2026-11-26):
- It flies **forward only**, in one direction. It never goes back. (No `alternate` / yoyo.)
- It is **very slow**: about 40 seconds to cross, at a steady speed (`linear`).
- It fades in at the start of its path and fades out at the end, in the dark sky, so the restart is not visible.
- When the visitor scrolls, the mountains must **not** cover it. Only the dark front layer covers it at the end.
- The reindeer **move their legs**. Use the 12-frame strip `reindeer-sprite.webp` (real running deer with big antlers) and the sleigh `santa-sleigh.webp`, with CSS `steps(12)`, 0.72 s per loop, three reindeer with different start times. The sleigh sways a little. See `docs/design/hero-free-photos/SOURCES.md`.

Tree in scene 2 (user feedback, 2026-11-26): use a **real photo** of a tree with lights (`night-tree.webp`). It starts almost dark, then the lights come on at the end of the scroll (animate `filter: brightness`, or better for phones: cross-fade from a dark copy to the bright copy with `opacity`).

## Skills for the Worker

| Skill | Use it for |
|---|---|
| `gsap-scrolltrigger`, `gsap-timeline`, `gsap-core` | The scroll timeline (official GSAP skills, MIT, from github.com/greensock/gsap-skills) |
| `gsap-react` | `useGSAP`, scope, cleanup, no GSAP on the server |
| `gsap-performance` | Smooth movement on cheap phones |
| `kurdish-arabic-web` | RTL, Kurdish and Arabic text and fonts |
| `websec` | `/websec quick` at the end |

The five GSAP skills were installed on 2026-11-26 in the user's Claude skills folder (`~/.claude/skills/`). If the Worker does not see them, restart the Worker session.

## What happens in the video

### A. When the page opens (intro)
| Order | What moves |
|---|---|
| 1 | The screen is dark. |
| 2 | The small line and the big title rise from below and fade in. |
| 3 | The sky, moon, clouds, mountains and trees fade in. |

### B. When nobody scrolls (always moving)
| Part | Movement |
|---|---|
| Stars | Small dots twinkle and drift slowly. |
| Flying shape (sleigh) | Moves slowly across the moon, from one side to the other. |
| Clouds | Drift a little. |
| Scroll hint | Small text at the bottom: "Scroll for a surprise". |

### C. When the visitor scrolls down (the big effect)
The scroll position controls everything. Scrolling up plays it backwards.

| Scroll | What we see |
|---|---|
| 0% | Full night scene: header, title, moon, clouds, mountains, dark tree line at the bottom. |
| 0–30% | Header and title go up fast and leave. Moon and clouds go up slowly. Mountains go up at medium speed. The dark tree line rises from the bottom. |
| 30–60% | The dark trees cover most of the screen. Only the moon is left at the top. The screen is almost black. |
| 60–75% | A light card enters from the bottom. A decorated tree starts to appear beside it. |
| 75–90% | The card rises to the centre. Gift boxes enter. A soft blurred mist is behind them. |
| 90–100% | The tree rises faster than the card. A white ground strip rises. The lights on the tree **turn on** (colours and a star). |

### D. Fixed parts
A header with the logo on one side and a round button on the other side.
(The play, sound and pink bar in the video belong to the video player. They are not part of the page.)

## Our version for Sulifest (proposal — the user decides)

| In the video | In Sulifest (proposal) |
|---|---|
| Night sky, stars, moon | Keep: night sky, stars, moon |
| Santa sleigh | A flying shape that fits the festival (see question 1) |
| Snow mountains | Goizha mountain line (Sulaymaniyah) |
| Dark pine trees | Dark city or tree silhouette. It becomes the dark background of scene 2. |
| "We wish you a / Merry Christmas" | Small line + big title "Sulifest" in the visitor's language |
| "Scroll for a surprise" | The same idea, in 3 languages |
| Card "Thank you, −20% OFF" | Festival card: dates, place, button **Book a booth** |
| Christmas tree whose lights turn on | Festival tent or booth with string lights that turn on |
| Gift boxes, snow ground | Small festival objects, ground strip |
| Header button "Get your gift" | Language switcher + "Book a booth" |

## Research (with sources)

| Fact | What it means for us | Source |
|---|---|---|
| GSAP's official React way is the `useGSAP()` hook with a `scope`. It cleans up animations when the component leaves. | Use `useGSAP`, never `useEffect`. One shared file registers the plugins. | https://gsap.com/resources/React/ |
| Mobile browsers fire "resize" when the address bar hides. ScrollTrigger then recalculates and the page jumps. `ScrollTrigger.config({ ignoreMobileResize: true })` is the common fix. | Set this option. Test on a real phone. | https://gsap.com/community/forums/topic/44272-fixing-jumping-cards-in-parallax-scroll-on-mobile/ |
| GSAP forum users report problems with GSAP "pin" inside Next.js. | Do not use GSAP `pin`. Use CSS `position: sticky` for the fixed stage. GSAP only moves the layers. | https://gsap.com/community/forums/topic/45137-issue-with-scrollsmoother-and-scrolltrigger-pin-behavior-in-nextjs/ |
| CSS scroll-driven animations are in Chrome, Safari 26 and Firefox 159. | Good for small effects on other pages (main plan). | https://web.dev/blog/web-platform-10-2026 |
| A WebKit bug report says scroll timelines can drop to 11–12 fps on iPhones with iOS 26. The status of the bug is not known. | For this big hero, GSAP is the safer choice than pure CSS. Old iPhones also do not have the CSS feature. | https://bugs.webkit.org/show_bug.cgi?id=322931 |
| An element at `opacity: 0` does not count for LCP until it is visible. Hero fade-ins can add 650–900 ms to LCP. CSS keyframes start at first paint; JavaScript animations start later. | The title and sky must be visible in the first paint. The intro uses CSS, not JavaScript. | https://shopify.dev/docs/storefronts/themes/best-practices/performance/dont-hide-lcp-image-behind-animations and https://debugbear.com/blog/opacity-animation-poor-lcp |
| GSAP forums say smooth-scroll libraries are a common cause of trouble on mobile. | Confirms the main plan: no Lenis. | https://gsap.com/community/forums/topic/37338-scrollsmoother-elements-with-data-speed-jumps-when-adress-bar-hides/ |

Not found in the search: anything special about GSAP on Next.js 16, and speed numbers for parallax on Android. The Worker must test these on a real phone (see "Done when").

## Decisions (PM recommendation)

| # | Decision | Why |
|---|---|---|
| 1 | This hero is one of the "1–2 big GSAP sections" in the main plan. | The main plan names "pinned hero" as a GSAP section. One GSAP slot is left after this. |
| 2 | A tall wrapper (about 300% of the screen height) with a **sticky** stage inside. One GSAP timeline with `scrub` moves all layers. | Sticky is native and stable. No GSAP pin problems. |
| 3 | `scrub: 0.6` (a small delay) gives the soft feeling of the video. No Lenis. | Follows the main plan. |
| 4 | Stars, flying shape, cloud drift and light glow are **CSS keyframes**, not JavaScript. | Free for the phone's CPU. |
| 5 | **One difference from the video:** the title and the sky are visible at once. Only the other layers fade in (about 0.8 s). | Main plan rule: "Never hide the hero at start". A black start screen makes the Google speed score (LCP) worse. |
| 6 | The picture layers are files in the code (made by the team), not uploads in the admin panel. Texts come from the translation files. | Smaller attack surface. Upload rules stay simple (see Security). |
| 7 | Build it in two parts: first with simple grey shapes (to test movement on a phone), then with the real pictures. | We find speed problems before the designer spends time. |

## Steps for the Worker

Part 1 — movement with placeholder shapes

1. Install `gsap` and `@gsap/react` with pnpm (latest stable 3.x). Check the license page and the version before installing. Follow the pnpm release-age rule.
2. Create `src/lib/gsap.ts`: a client file that registers `ScrollTrigger` and `useGSAP` once and sets `ScrollTrigger.config({ ignoreMobileResize: true })`.
3. Create the feature folder `src/features/home-hero/`.
4. `HomeHero.tsx` (server component): the HTML for all layers and both scenes. Texts come from next-intl (`home.hero.*`). The title is a real `<h1>`. Picture layers that are only decoration get `alt=""` and `aria-hidden="true"`.
5. `hero.css`: the wrapper (height about 300svh), the sticky stage (`position: sticky; top: 0; height: 100svh; overflow: hidden`), layer positions, the CSS intro, the always-moving keyframes, and the reduced-motion rules. Use `svh` units so the address bar does not change the size.
6. `HeroScrollScene.tsx` (`"use client"`): `useGSAP` with `scope` on the wrapper. One timeline, `scrollTrigger: { trigger: wrapper, start: "top top", end: "bottom bottom", scrub: 0.6 }`. Animate only `transform` (`yPercent`, `y`, `scale`) and `opacity`.
7. Use these start values for the timeline, then tune them by eye next to the reference frames:

   | Layer | Scroll part | Movement |
   |---|---|---|
   | Sky | 0–100% | almost still (−5%) |
   | Stars | 0–60% | up slowly (−10%) |
   | Moon + flying shape | 0–60% | up at almost the same speed as the mountains (−58%), so the mountains never cover the flying shape. Only the dark front layer covers it. |
   | Clouds | 0–60% | up slowly (−25%), a little sideways |
   | Header + title + small line | 0–30% | up fast (−120%) and fade out |
   | Mountains | 0–60% | up medium (−60%) |
   | Dark front silhouette (with dark fill below) | 0–60% | up fast until it covers the stage |
   | Scroll hint | 0–20% | fade out |
   | Scene 2 mist | 55–100% | fade in, up slowly |
   | Card | 60–90% | from below to the centre |
   | Tent / tree | 65–100% | from below, faster than the card |
   | Small objects | 75–100% | from below, fastest |
   | Ground strip | 85–100% | rises from the bottom edge |
   | Lights | 92–100% | opacity 0 → 1 (lights turn on) |

   Rules from the official GSAP skills:
   - Put `scrollTrigger` on the **timeline**, never on a tween inside it.
   - Use `scrub` only. Do not mix it with `toggleActions`.
   - Never run `gsap.*` or `ScrollTrigger.*` on the server. Keep it all inside `useGSAP`.
   - Call `ScrollTrigger.refresh()` once after the fonts and hero pictures have loaded.
   - `will-change: transform` only on the layers that really move.
   - `markers: true` is for development only. Remove it before the pull request.

8. Load the GSAP code only on the Home page (dynamic import of the client component). The page must be readable before GSAP arrives.
9. Without JavaScript, and with `prefers-reduced-motion: reduce`: no sticky stage, no scrub, no loops. Show scene 1 and scene 2 as two normal sections, one under the other. Use `gsap.matchMedia()` for this in JavaScript and a media query in CSS.
10. Add a small "pause animations" button for the always-moving parts (stars, flying shape). Save the choice for the visit.
11. RTL: in `ckb` and `ar` the flying shape moves the other way (multiply `x` by −1). The header order follows `dir`. Use logical CSS only.
12. Test Part 1 on a mid-range Android phone and an iPhone. Report frames per second and any jumps before starting Part 2.

Part 2 — real pictures

13. Put the final layers in `src/features/home-hero/assets/`. Each layer is a separate picture with a transparent background (AVIF + WebP). Silhouettes (mountain line, city line) should be inline SVG in a React component: small and sharp.
14. Serve smaller pictures to phones (`sizes` / `srcset`). The sky (or the title) is the LCP element: load it with `loading="eager"` and `fetchPriority="high"` (not `priority`, which is old in Next.js 16).
15. Write the licence and the source of every picture and font in `docs/ASSETS-LICENSES.md`.
16. Add the text keys to `messages/ckb.json`, `ar.json`, `en.json` with the same keys. Mark Kurdish and Arabic text "needs native-speaker review".

## Files to create or change

| File | What |
|---|---|
| `src/lib/gsap.ts` | Register plugins once, mobile config |
| `src/features/home-hero/HomeHero.tsx` | Server component, HTML of the layers |
| `src/features/home-hero/HeroScrollScene.tsx` | Client component, the GSAP timeline |
| `src/features/home-hero/hero.css` | Layout, intro, loops, reduced motion |
| `src/features/home-hero/assets/*` | Picture layers (Part 2) |
| `src/features/home-hero/README.md` | Short notes: layers, how to tune |
| `messages/{ckb,ar,en}.json` | `home.hero.*` texts |
| `docs/ASSETS-LICENSES.md` | Licence list for pictures and fonts |
| Home page file | Use `<HomeHero />` at the top |

## Security (websec)

This feature has no form and no database write, so the risk is small. These points still matter:

| Check | What the Worker must do | websec source |
|---|---|---|
| Supply chain | Install `gsap` and `@gsap/react` from npm only. Exact versions in the lockfile. Respect the pnpm waiting time for new versions. No other animation packages. | Phase 3, point 6 |
| No outside scripts | Never load GSAP, fonts or pictures from a CDN (`<script src="https://...">`). Everything is served from our own site. | Phase 3, point 5 |
| CSP stays strict | Do not put `style="..."` in the server HTML and do not use inline `<script>`. Use CSS classes and CSS variables. GSAP may set styles from JavaScript (that is allowed). No `eval`. | Phase 7, headers |
| Text is text | Hero texts are shown as plain text. Never use `dangerouslySetInnerHTML`, also not later if the texts move to the CMS. | Next.js check 15, next-intl check 5 |
| Fixed link | The "Book a booth" button goes to a fixed internal route. The link is never built from the URL, a cookie or CMS input. | Next.js check 14 |
| Pictures | Local files only. Do not add `images.remotePatterns`. Do not turn on `dangerouslyAllowSVG`. SVG is only allowed as code in a component, never as an upload. | Next.js check 12, Cloudflare R2 point 3 |
| Nothing private in `public/` | Only final pictures go there. No design source files, no notes. | Cloudflare section 3, point 3 |
| No secrets | This feature needs no keys and no `NEXT_PUBLIC_` values. | Next.js check 7 |
| Reference frames | The files in `docs/plans/refs/` are another designer's work. They must never be imported by the app or copied to `public/`. | Licence rule |

## Languages / RTL (kurdish-arabic-web)

- The title is an `<h1>` with real text, not a picture. It must look right in `ckb`, `ar` and `en`.
- English may use a handwriting-style font for the title (open licence). Kurdish and Arabic use a font from the approved list (Vazirmatn, Noto Sans Arabic, Noto Kufi Arabic). Test with `ڕۆژی ڤێڵە ئێمە`.
- The wide letter spacing of the small line in the video is for English only. Kurdish and Arabic get `letter-spacing: 0`.
- Never split Kurdish or Arabic text into letters for animation. Move the whole title or whole words.
- The flying shape flips its direction in RTL. The moon, the mountain and the logo do not flip.
- Dates on the card: `ckb` and `ar-IQ`, never `ckb-IR`. The digit style waits for the team's answer.
- Kurdish and Arabic texts are written by a native speaker, not by Claude.

## Database changes

None.

## Done when (tests)

- [ ] Next to the reference frames, the movement order is the same: title leaves first, dark layer covers, card rises, lights turn on last. Scrolling up plays it backwards.
- [ ] Mid-range Android phone on slow 4G: scrolling is smooth, no jump when the address bar hides.
- [ ] iPhone Safari: the same.
- [ ] Lighthouse mobile on the Home page: LCP ≤ 2.5 s, CLS ≤ 0.1. The LCP element is the title or the sky and it is not hidden at the start.
- [ ] Home page JavaScript stays inside the budget (about 150–170 kB gzip). All hero pictures together ≤ about 350 kB on a phone; the sky ≤ 150 kB.
- [ ] With "reduce motion" on: no movement, both scenes are readable.
- [ ] With JavaScript off: both scenes are readable.
- [ ] Keyboard only: the header links, the pause button and "Book a booth" can be reached and have a visible focus ring.
- [ ] The page looks right in `ckb`, `ar` and `en` at 375 px and at desktop width.
- [ ] Text contrast on the dark sky is at least 4.5:1.
- [ ] No request goes to another domain for scripts, fonts or pictures (check the network tab).
- [ ] `/websec quick` shows no new finding for this feature.

## Not in this plan

- Sound or music (the sound button in the video is from the video player).
- Small scroll effects on other pages (CSS scroll-driven animations, later plan).
- Changing the hero pictures from the admin panel.
- The booking page itself.

## Questions for the user

1. **The scene:** keep a night scene with moon and mountain? What should fly across the moon instead of the sleigh (birds, lanterns, a kite, the festival logo, nothing)?
2. **The pictures:** who makes the layers? (a designer on the team in Figma / paid stock pictures / AI pictures)
3. **The card in scene 2:** dates + place + "Book a booth" — is that right? The festival date is still unknown.
4. **The start:** is decision 5 OK (title visible at once, not from a black screen)?
