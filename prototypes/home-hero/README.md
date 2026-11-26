# Home page demo: hero animation (plan 002, Part 0) + the page under it (plans 004, 005 and 006)

A static page that shows the Sulifest home hero with **real scrolling**:
scene 1 (night, moon, Santa's sleigh, mountains, snow) → scene 2 (the dates in the brand ring, tree whose lights turn on, gifts).
Plain HTML + CSS + JavaScript. No framework, no build step, no backend.
Under the hero: the Home page sections of "Christmas Nights by SuliFest" in the organiser's brand (plan 005),
with the Magma Square map. The text is in `docs/brief/website-copy-en.md` (the brief
`docs/brief/christmas-nights-brief.md` with 7 small edits and some new short texts; the organiser still has to approve them).
It is a prototype. **Do not deploy it.**

## How to open it

It needs a small local web server (opening the file with a double-click is not the same as the real site).

```sh
cd prototypes/home-hero
python -m http.server 8765 --bind 127.0.0.1
```

Then open http://127.0.0.1:8765/ and scroll down and up. Stop the server when you are done.

## Files

| File | What |
|---|---|
| `index.html` | All layers, both scenes, the sections, the map (inline SVG). A real `<h1>`. No `style="..."`, no inline script. |
| `hero.css` | Fonts, brand colours, the hero layout, phone layout, intro, always-moving parts (stars, snow, clouds, sleigh, reindeer legs, whip), reduced motion |
| `page.css` | The page under the hero: paper and green sections, stamps, lists, facts, 16 lights, the map, footer, the one-moment look |
| `boot.js` | Tiny script in `<head>`: sets classes on `<html>` before the first paint (so the layout does not jump) |
| `hero.js` | One GSAP timeline with ScrollTrigger (`scrub: 0.6`), `gsap.matchMedia()` for reduced motion |
| `reveal.js` | The one moment: IntersectionObserver slides each heading in once and turns on the 16 lights (no GSAP) |
| `story.js` | The About story (plan 006): IntersectionObserver marks each step once; the numbers count up with `requestAnimationFrame` (no GSAP) |
| `map.js` | The map list: a button highlights one part of the map (`data-focus` on `#map`, CSS does the rest) |
| `vendor/` | `gsap.min.js` + `ScrollTrigger.min.js` from npm `gsap@3.15.1` (hashes in `vendor/README.md`) |
| `assets/*.webp` | The hero layers, from `docs/design/hero-free-photos/layers/` (licences in `docs/design/hero-free-photos/SOURCES.md`). Clouds made smaller (760 px), all re-saved at quality 72 |
| `assets/santa-sleigh-2.webp` | The sleigh without the short line in front of Santa's hands (the reins are now an SVG) |
| `assets/brand/` | Cut from the organiser's vendor guide (see `docs/design/brand/README.md`): the ring in 5 sizes, 5 stamps in 2 sizes, the italk mark, the map walls. **italk must confirm the website may use them and send the original files** |
| `assets/fonts/` | Cinzel Decorative 900, Cinzel 500/700, EB Garamond 400/400 italic/600, Vazirmatn 500 (Arabic letters), from the `@fontsource` npm packages 5.3.0, SIL Open Font License (licence files next to them) |
| `assets/favicon.svg` | Simple moon icon (made for the demo) |
| `screenshots/` | Phone and desktop screenshots (for the pull request) |

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
- **Reins and whip (plan 005):** the reins are an inline SVG in the sleigh box, in the same 300 × 90 units,
  from Santa's hands (56, 35) to the reindeer, so they always touch both. The whip is a second SVG that turns
  around the hand: still for 80% of 8 seconds, then back 30°, forward 23° over the first reindeer, and back.
- Moon and mountains use the same timing and almost the same distance (−410 / −420),
  so the mountains never cover the sleigh. The dark front tree layer moves −830, so no moon or mountain
  is left at the top of scene 2.
- The tree in scene 2 is two copies of the same photo: a dark copy (CSS filter, never animated)
  and a bright copy on top whose opacity goes 0 → 1 at the end = lights on. A CSS mask fades the sides of the photo.
- The end of scene 2 is three snow hills in the paper colour (16%, 42% and 100%), with a thin Ivory line on the
  front hill and a warm glow above them (one inline SVG, plan 006). So the night fades into the paper with no hard line,
  and the front hill covers the bottom edges of the tree and the gifts. The header has no button (removed at the
  site owner's request); the "About the festival" button at the end of the scroll stays.

### Scroll timeline (progress of the scroll inside the hero)

| Part | Scroll | Movement (preview px × scale) |
|---|---|---|
| Header + title | 0 – 0.30 | up −420, fade out |
| Scroll hint | 0 – 0.20 | fade out |
| Stars / far clouds / moon + sleigh / near clouds / mountains / front trees | 0 – 0.60 | up −60 / −130 / −410 / −210 / −420 / −830 |
| Mist | 0.55 – 1.00 | fade in, up a little |
| Dates in the ring (`.s-card`) | 0.60 – 0.90 | from below the screen to its place |
| Tree | 0.70 – 0.90 | from below, faster than the dates |
| Gift boxes | 0.80 – 0.92 | from below |
| Snow hills + warm glow | 0.85 – 0.97 | rise from the bottom edge |
| Tree lights | 0.92 – 1.00 | on |
| (hold) | 1.00 – 1.08 | nothing moves, so the lit tree is seen before the page moves on |

To tune it, change the numbers in `hero.js` (distances and start times) and look again.
Add `markers: true` to the `scrollTrigger` object only while testing.

## The page under the hero (plans 004 and 005)

The design idea is "a letter from Slemani": where the night ends, the paper begins, cut like the edge of a stamp.
Colours and fonts come from the organiser's vendor guide (`docs/design/brand/README.md`).

| # | Section | Background | Layout |
|---|---|---|---|
| 1 | About (`#about`): the story SuliFest → italk → Christmas Nights | Paper `#EDDDB3` | Three steps (text + stamp) on a green wire, then the 16 lights and four facts |
| 2 | The festival experience | Paper | Heading + gifts stamp, the four experiences in 2 × 2 |
| 3 | Family & children's experiences | Paper | Carousel stamp + text and list |
| 4 | Youth, creativity & learning | Paper | Text + the list in a light panel |
| 5 | New Year celebration | Deep green `#16452E` | Centred, bells stamp |
| 6 | The venue – Magma Square | Paper | The map + the list of places |
| 7 | From SuliFest to Christmas Nights | Deep green | Text + statue stamp and two small boxes |
| 8 | Footer | Paper | Ring, name, italk, languages |

Between two paper sections there is a thin line with a red diamond. The green sections have the stamp edge
at the top and the bottom. The stamps are turned 3 degrees, like stamps on a letter.
On screens under 900 px everything is one column; under 700 px the text is a little smaller.

**One moment (design choice of 2026-11-26):** every section heading slides up from behind a line once (0.6 s)
when its section comes into view. Paragraphs are not animated. In About, a row of **16 lights = 16 nights**
(16–31 December; the last, bigger red light is the New Year night) turns on one by one when the row itself is
in view. Things are "off" before the moment only when `<html>` has the `motion` class and `reveal.js` has run
(`reveal-on`). Without JavaScript, or with "reduce motion", every heading is in place and every light is on.

### The About story (plan 006)

The About section tells three things, in this order: **SuliFest** (the brand), **italk** (the organizer),
**About Christmas Nights** (the festival). The text is in `docs/brief/website-copy-en.md`, waiting for italk's approval.

- A thin green wire runs down the start side, with a red diamond at each step. After step 3 it goes down into the
  row of 16 lights and ends in the middle of the row (padding + half the tallest light), so the join holds at every width.
- Each step is text + a stamp. Steps 1 and 2 have a stamp made in CSS: a cream card with a cut edge (`mask`, two layers,
  `round`), a thin inner line and a red postmark. Without mask support it is a plain card. Step 3 uses the tree stamp picture.
  The stamps are decoration (`aria-hidden`); the three step headings are `<h2>`.
- Under each text: short facts with a big green number (`tabular-nums`, so the row does not jump while counting).
- **Once per step**, when its top passes 72% of the screen: the wire grows (1.2 s), the diamond turns red with a small pop,
  the heading slides up, the stamp drops and lands (0.7 s, after 0.3 s), the postmark is pressed (after 0.95 s),
  the numbers count up (0.9 s; 2019 only runs through its last 25 numbers). The last piece of wire grows into the lights
  when they turn on. Scrolling back up does not replay it.
- Hidden before its moment only with `motion` **and** `story-on` on `<html>`. Without JavaScript, with "reduce motion",
  or without IntersectionObserver, the whole story is there with the final numbers (they are in the HTML).
- The story section has `overflow-x: clip`: a stamp is bigger and turned before it lands, and this stops the page
  from scrolling sideways on phones.
- No visitor number for SuliFest (only a forecast and a four-day count are public). No person's name. No outside links.

### The map (plan 005)

- One inline `<svg>` (view box `38 154 520 574`) with the 66 places (7 Zin, 21 Shirin, 38 Khaj), the rooms,
  the tree, the stage, the sitting areas, parking and the two entrances, at their real positions from the vendor guide.
  The walls are one picture (`assets/brand/map-walls.webp`), an `<img>` under the SVG so it can load lazily.
- **No prices, no room codes, no square metres.**
- The ten list items are real buttons with `aria-pressed`. A press keeps that part clear and fades the rest to 16%;
  a second press, or "Show the whole map", shows everything. After "Show the whole map" the keyboard focus goes
  back to the chosen list item (the button hides itself).
- On phones the map is 620 px wide inside a box that scrolls sideways (`role="region"`, `tabindex="0"`, with a label).
  The page itself never scrolls sideways.
- The map does not flip for right-to-left; the list and the columns do (logical CSS properties).
- Khaj places and the parking sign use a deeper gold (`#8A6630`) under their small light letters,
  so the contrast is 5.1:1 (the brand gold `#A07A35` is only 3.9:1).

## Without JavaScript, or with "reduce motion"

No sticky stage, no scrub, no loops (the whip stands still): scene 1 and scene 2 are two normal sections,
one under the other, and scene 2 shows the final state (lights on). All section text, all 16 lights and the whole map are visible.
If the GSAP files do not load, the page falls back to the same two sections.

## No pause button (user decision, 2026-11-26)

The user asked that the hero animations always play, so there is no pause button.
Visitors with "reduce motion" turned on still get a still page (no loops, no scroll animation).
Note for later: the accessibility rule WCAG 2.2.2 asks for a way to pause moving content that lasts
more than 5 seconds. The whip is one more thing that moves. The PM should decide this again before the real site goes live.

## Security

- Content-Security-Policy in a `<meta>` tag: `default-src 'self'` (plus stricter `script-src`, `style-src`,
  `img-src`, `font-src`, `connect-src 'none'`, `object-src 'none'`, `base-uri 'none'`, `form-action 'none'`).
- No CDN and no outside requests: every file comes from this folder. No embedded map from another site.
- No `eval`, no `innerHTML`, no inline event handlers. `map.js` and `story.js` read nothing from the URL, cookies or storage;
  `story.js` writes the numbers with `textContent` only.
  All links are `#` anchors inside the page. No forms.
- The organiser's vendor PDFs are not in the repository (they hold prices and commercial terms).
- No files from `docs/plans/refs/` or from the template site.

## Still different from the real site (Parts 1 and 2 of plan 002)

| Here | Later in the real site |
|---|---|
| Plain HTML page | Next.js components (`HomeHero.tsx`, `HeroScrollScene.tsx`, `useGSAP`) |
| English text only, written in the HTML | Texts from next-intl in `ckb`, `ar`, `en`; RTL (the sleigh flies the other way) |
| Cinzel and EB Garamond have no Kurdish or Arabic letters | `ckb` and `ar` need their own heading and text fonts, and no letter spacing (plan 005) |
| The language links and buttons go to `#` | Real routes |
| Pictures on the first phone screen (scene 1): about 340 kB of WebP; scene 2 adds about 190 kB (low priority) | AVIF and more phone sizes (plan 002 budget: about 350 kB) |
| Christmas pictures (sleigh, tree, gifts) and US mountains | The team decides the final Sulifest pictures (plan 002, questions 1–2) |
| Brand pictures cut from a PDF at screen size | The original files from italk |
| CSP in a `<meta>` tag | CSP as a real HTTP header from the server |
