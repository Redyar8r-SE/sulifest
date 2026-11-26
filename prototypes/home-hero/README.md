# Home page demo: hero animation (plan 002, Part 0) + the page under it (plan 004)

A static page that shows the Sulifest home hero with **real scrolling**:
scene 1 (night, moon, Santa's sleigh, mountains, snow) → scene 2 (card, tree whose lights turn on, gifts).
Plain HTML + CSS + JavaScript. No framework, no build step, no backend.
Under the hero: the Home page sections of "Christmas Nights by SuliFest" (plan 004), with the text
copied word for word from `docs/brief/christmas-nights-brief.md`.
It is a prototype. **Do not deploy it.**

## How to open it

It needs a small local web server (opening the file with a double-click is not the same as the real site).

```sh
cd prototypes/home-hero
python -m http.server 8765 --bind 127.0.0.1
```

Then open http://127.0.0.1:8765/ and scroll down and up.

## Files

| File | What |
|---|---|
| `index.html` | All layers and both scenes. A real `<h1>`. No `style="..."`, no inline script. |
| `hero.css` | Layout, phone layout, intro, always-moving parts (stars, snow, clouds, sleigh, reindeer legs), reduced motion |
| `boot.js` | Tiny script in `<head>`: sets classes on `<html>` before the first paint (so the layout does not jump) |
| `page.css` | The sections under the hero: one text column, snow and midnight colours, lists, facts, footer, the text reveal look (plan 004) |
| `reveal.js` | The one moment: IntersectionObserver slides each heading in once and turns on the 16 lights (no GSAP) |
| `hero.js` | One GSAP timeline with ScrollTrigger (`scrub: 0.6`), `gsap.matchMedia()` for reduced motion |
| `vendor/` | `gsap.min.js` + `ScrollTrigger.min.js` from npm `gsap@3.15.1` (hashes in `vendor/README.md`) |
| `assets/*.webp` | Copies of the layers in `docs/design/hero-free-photos/layers/` (licences in `docs/design/hero-free-photos/SOURCES.md`) |
| `assets/fonts/` | Great Vibes, Space Grotesk 700, Vazirmatn 500 (Arabic letters) from the `@fontsource` npm packages 5.3.0, SIL Open Font License (licence files next to them) |
| `assets/favicon.svg` | Simple moon icon (made for the demo) |
| `screenshots/` | Scene 1 and scene 2 at phone and desktop width (for the pull request) |

## How it works

- The wrapper `.hero` is `300svh` tall. Inside, `.stage` is `position: sticky` (no GSAP pin).
- One GSAP timeline is tied to the scroll (`start: "top top"`, `end: "bottom bottom"`, `scrub: 0.6`).
  It only changes `transform` and `opacity`.
- The positions and distances are the numbers of the moving preview
  (`docs/design/hero-preview/preview-source.html`, a 1280 × 720 stage).
  CSS scales them with container units: `--u` ("cover", the night picture fills the screen)
  and `--v` ("contain", scene 2 fits the screen). `hero.js` uses the same "cover" unit.
- Always-moving parts are CSS only: stars twinkle, clouds drift, snow falls (3 layers),
  the sleigh flies forward only (40 s, linear, fades in and out), the reindeer legs move
  (`steps(12)`, 0.72 s, three different start times), the sleigh sways.
- Moon and mountains use the same timing and almost the same distance (−410 / −420),
  so the mountains never cover the sleigh. Only the dark front tree layer covers it.
- The tree in scene 2 is two copies of the same photo: a dark copy (CSS filter, never animated)
  and a bright copy on top whose opacity goes 0 → 1 at the end = lights on.

### Scroll timeline (progress of the scroll inside the hero)

| Part | Scroll | Movement (preview px × scale) |
|---|---|---|
| Header + title | 0 – 0.30 | up −420, fade out |
| Scroll hint | 0 – 0.20 | fade out |
| Stars / far clouds / moon + sleigh / near clouds / mountains / front trees | 0 – 0.60 | up −60 / −130 / −410 / −210 / −420 / −680 |
| Mist | 0.55 – 1.00 | fade in, up a little |
| Card | 0.60 – 0.90 | from below the screen to its place |
| Tree | 0.70 – 0.90 | from below, faster than the card |
| Gift boxes | 0.80 – 0.92 | from below |
| Snow ground | 0.85 – 0.97 | rises from the bottom edge |
| Tree lights | 0.92 – 1.00 | on |
| (hold) | 1.00 – 1.08 | nothing moves, so the lit tree is seen before the page moves on |

To tune it, change the numbers in `hero.js` (distances and start times) and look again.
Add `markers: true` to the `scrollTrigger` object only while testing.

## The page under the hero (plan 004)

| # | Section | Background |
|---|---|---|
| 1 | About Christmas Nights (`#about`, with the facts list) | Snow `#EEF2F7` |
| 2 | The festival experience | Snow |
| 3 | Family & children's experiences | Snow |
| 4 | Youth, creativity & learning | Snow |
| 5 | New Year celebration | Midnight `#0B1430` |
| 6 | The venue – Magma Square | Snow |
| 7 | From SuliFest to Christmas Nights | Midnight |
| 8 | Footer | Midnight |

The snow ground at the end of the hero has the same colour as the About section, so they join without a line.
The skip link and both "About the festival" buttons go to `#about`.

**One moment (design choice of 2026-11-26):** every section heading slides up from behind a line once (0.6 s)
when its section comes into view. Paragraphs are not animated. In About, a row of **16 lights = 16 nights**
(16–31 December; the last, bigger red light is the New Year night) turns on one by one when the row itself is
in view. Only `transform`, `background` and `box-shadow` change; text is never split. Things are "off" before
the moment only when `<html>` has the `motion` class and `reveal.js` has run (`reveal-on`). Without JavaScript,
or with "reduce motion", every heading is in place and every light is on.

Other design choices of 2026-11-26: no ALL-CAPS lines ("by SuliFest", the card place and the scroll hint are
in normal letters, so the capital F of SuliFest stays), and "English" is marked as the current language.

## Without JavaScript, or with "reduce motion"

No sticky stage, no scrub, no loops: scene 1 and scene 2 are two normal sections, one under the other,
and scene 2 shows the final state (lights on). All section text is visible and all 16 lights are on.
If the GSAP files do not load, the page falls back to the same two sections.

## No pause button (user decision, 2026-11-26)

The user asked that the hero animations always play, so there is no pause button.
Visitors with "reduce motion" turned on still get a still page (no loops, no scroll animation).
Note for later: the accessibility rule WCAG 2.2.2 asks for a way to pause moving content that lasts
more than 5 seconds. The PM should decide this again before the real site goes live.

## Security

- Content-Security-Policy in a `<meta>` tag: `default-src 'self'` (plus stricter `script-src`, `style-src`,
  `img-src`, `font-src`, `connect-src 'none'`, `object-src 'none'`, `base-uri 'none'`, `form-action 'none'`).
- No CDN and no outside requests: every file comes from this folder.
- No `eval`, no `innerHTML`, no inline event handlers. All links are `#` anchors inside the page (the "About the festival" buttons go to `#about`). No forms.
- No files from `docs/plans/refs/` or from the template site.

## Still different from the real site (Parts 1 and 2 of plan 002)

| Here | Later in the real site |
|---|---|
| Plain HTML page | Next.js components (`HomeHero.tsx`, `HeroScrollScene.tsx`, `useGSAP`) |
| English text only (from the organiser's brief), written in the HTML | Texts from next-intl in `ckb`, `ar`, `en`; RTL (the sleigh flies the other way) |
| The language links and buttons go to `#` | Real routes |
| Pictures are the full preview files: **about 855 kB** of WebP for all layers (+ 77 kB fonts) | Smaller phone sizes + AVIF; budget about 350 kB on a phone (plan 002) |
| Christmas pictures (sleigh, tree, gifts) and US mountains | The team decides the final Sulifest pictures (plan 002, questions 1–2) |
| CSP in a `<meta>` tag | CSP as a real HTTP header from the server |
