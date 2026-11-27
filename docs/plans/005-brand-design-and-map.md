# 005 — Brand design, the map, no box, Santa's reins (in the demo)

Status: Done on 2026-11-27 (commit `e335877`, pull request #1, not merged). Approved by the user on 2026-11-27 ("don't ask for permission, when everything is ready send it to the Worker"). The About section is changed again by plan 006
Date: 2026-11-27
Builds on: plan 002 Part 0 and plan 004 (the demo in `prototypes/home-hero/`, pull request #1)
Brand notes: `docs/design/brand/README.md`
Working preview made by the PM: `docs/design/home-v2-preview/` (open `index.html` through a local server)
Text: `docs/brief/website-copy-en.md` (unchanged by this plan)

## Goal

The user said the page under the animation is not good enough. Only the animation is good.
The user gave the organiser's two vendor guides (PDF) and asked for five things:

| # | The user asked | What we do |
|---|---|---|
| 1 | "We will delete the box" | The cream card at the end of the scroll is removed. The dates sit straight on the night sky, inside the brand's ring |
| 2 | "Our animation and our design colour, make it matched together" | The whole page uses the brand's paper colour, green, red and gold, and the brand's fonts. The animation keeps its night sky and how it moves |
| 3 | "The background colour, we have to use it, that's our colour for SuliFest" | Page background = Paper `#EDDDB3` |
| 4 | "The map should be on the web page" | The Magma Square map is in the Venue section. Visitors can press a list item to find a place on the map |
| 5 | "Money is not our site" | No prices, no commercial terms |
| 6 | "Look at the separate between the line and Santa… let Santa sometimes hit the animals" | The reins start in Santa's hands and end at the reindeer, with no gap. Santa cracks his whip every 8 seconds |

The PM built a working preview first, so the user can see it. **The Worker's job is to move this design into the demo and make it solid** (tests, phone, keyboard, small files). The preview is the design reference. It is not finished code.

## The design in short

One idea: **a letter from Slemani.** The night scene is the picture. Where the night ends, the paper begins, cut like the edge of a stamp. Under it the page is the brand's paper, with the brand's stamps stuck on it a little crooked.

| Part | Rule |
|---|---|
| Colours | The table in `docs/design/brand/README.md`. Paper background, Ink text, Green headings, Red for buttons and small ornaments, Bright gold for lights |
| Fonts | Cinzel Decorative (title and logo text), Cinzel (headings, buttons, labels), EB Garamond (text). Self-hosted `woff2`, OFL licence files next to them |
| Text size | Body 20 px (19 px on phones), line height 1.55. Lead 26 px. Headings 40 px (28 px on phones) |
| Layout | Two columns on desktop (text + stamp, or stamp + text), one column on phones. Max width 1160 px |
| Dark sections | Deep green `#16452E` with Cream text: New Year and From SuliFest. Both have the stamp edge at the top and bottom |
| Between paper sections | A thin Tan line with a red diamond in the middle |
| Stamps | About: tree. Experience: gifts. Family: carousel. New Year: bells. From SuliFest: statue. Turned 3 degrees, soft shadow |
| Movement | Unchanged from plan 004: headings slide up once, the 16 lights turn on once. New: the map answers a press. Nothing else moves |

## What changes, part by part

### A. Hero, scene 1

| Now | Change to |
|---|---|
| Title in Great Vibes (script), white | Cinzel Decorative Black, Cream `#F6EBCC`. On phones it breaks into two lines: "Christmas" / "Nights" |
| "by SuliFest" above the title | Under the title, Cinzel Bold, spaced, Bright gold |
| Tagline in the system font | EB Garamond italic |
| Logo text only | The ring picture (52 px) + "Christmas Nights" + "by SuliFest" |
| Yellow round button | Red `#BE3428`, Ivory text, 6 px corners, Cinzel Bold |
| Tagline touches the moon on desktop | Fixed by the smaller title: check it again |

The sky, moon, clouds, mountains, snow and the scroll timing stay as they are.

### B. Santa's reins and whip

| Part | Rule |
|---|---|
| Picture | New file `santa-sleigh-2.webp`: the same silhouette, with the short line in front of Santa's hands removed |
| Reins | An inline `<svg class="reins">` in the sleigh box (view box 300 × 90, the same units as the CSS). Two lines from the hands (56, 35) to the first reindeer, then one line on to the second and third. See the preview for the exact paths |
| The old `.harness` line | Removed |
| Whip | An inline `<svg class="whip loop">` with one curved line. It turns around the hand (`transform-origin: 0 100%`) |
| Whip movement | `k-whip`, 8 seconds, repeats: still for 80% of the time, then back 30 degrees, then forward 23 degrees so the tip comes down over the first reindeer, then back to rest |
| Reduce motion | The whip has the class `loop`, so it stands still, like the other loops |

### C. Hero, scene 2: the box is gone

| Now | Change to |
|---|---|
| Cream card with house icon, "See you there!", a sentence, dates, place, button | No card. In the middle of the sky: the ring picture with "16 – 31" and "December 2026" inside it. Under it "Magma Square ◆ Sulaimani" and the red button "About the festival" |
| Heading "See you there!" | A hidden heading "Dates and place" for screen readers (`.visually-hidden`) |
| Snow ground, blue-white, with a soft curve | Paper `#EDDDB3`, with the stamp edge on top (a CSS `radial-gradient`, no picture) |
| Left-over moon and mountain tips at the top of scene 2 | Fixed: the front tree layer now moves `u(-830)` instead of `u(-680)` in `hero.js` |
| Dark shape around the tree photo | Softer: a CSS mask fades the left and right sides of the tree picture |

The class `.s-card` stays on the new block, because the GSAP timeline moves it.

"See you there!" and the card sentence are removed from the page. Update `docs/brief/website-copy-en.md` to match.

### D. The page under the hero

Same sections, same order, same text as now. New layout and style:

| Section | Layout |
|---|---|
| About | Text left, tree stamp right. Under them, full width: the 16 lights (gold lights on a green line, the last one red), then the four facts in one row, each with a red side line |
| The festival experience | Heading, intro and gifts stamp left. The four experiences right, in a 2 × 2 grid, each with a red side line |
| Family and children | Carousel stamp left, text and list right |
| Youth | Text left. The list right, in a Paper-light panel with a Tan border |
| New Year | Deep green, centred: bells stamp, heading, text |
| The venue | Heading and intro, then the map (section E) |
| From SuliFest to Christmas Nights | Deep green. Left: the small label "Where it began", heading, motto in Bright gold, text. Right: statue stamp and two small boxes: "SuliFest / June 2026, 8 days / Hawary Shar Park", the word "Next", "Christmas Nights / 16 – 31 December 2026 / Magma Square" |
| Footer | Paper, centred: ring, name, "by SuliFest", "Organized by" + italk mark, "Magma Square ◆ 16 – 31 December 2026", the three languages |

New short texts in this design that are not in the copy file (add them there, and mark them for the organiser):
"Where it began", "June 2026, 8 days", "Next", "Market places", "Zin Place", "Shirin Place", "Khaj Place", "7 places, 4 × 4 m", "21 places, 3 × 3 m", "38 places, 3 × 3 m", "Entrance", "two entrances", "Show the whole map", "Each square is one place, marked with its letter and number. Simplified plan.", "Dates and place", and the map's title and description for screen readers.

### E. The map

| Part | Rule |
|---|---|
| Where | In the Venue section: map left (7 of 12 columns), list right. On phones: map first, list under it |
| What it is | One inline `<svg>` (view box `38 154 520 574`). The 66 places, rooms, tree, stage and arrows are vector shapes taken from the vendor guide, with their real positions. The walls are one picture, `map-walls.webp` |
| Not shown | Prices. Room codes (RG016…). Square metres |
| The list | The six items of the brief's list "The venue will feature:" are the six buttons: tree, stage, main hall, children's area, sitting areas, parking. Under them "Market places": Zin, Shirin, Khaj, and Entrance |
| Press a button | That part stays clear on the map and the rest fades to 16%. The button shows as chosen (`aria-pressed="true"`). A second press, or "Show the whole map", shows everything again |
| How | `map.js` sets `data-focus="stage"` on the map block. CSS does the rest. No library |
| Phones | The map is 620 px wide inside a box that scrolls sideways (`tabindex="0"`, `role="region"`, with a label), so the place numbers can be read. The page itself must not scroll sideways |
| Screen readers | The `<svg>` has `role="img"` with a `<title>` and a `<desc>` that says what is on the plan. The list is real buttons |
| Right-to-left | The map itself does **not** flip. The list and the columns do |

Later (not now): link each place to a vendor name ("Vendor listing on the Christmas Nights map" in the vendor guide). That needs the CMS.

## Steps for the Worker

1. Read `docs/design/brand/README.md` and open the preview: `cd docs/design/home-v2-preview && python -I -m http.server 8766 --bind 127.0.0.1`. Compare it with `screenshots/`.
2. On branch `feature/home-hero-demo`: commit the PM's new docs (`docs/plans/005-…`, `docs/plans/README.md`, `docs/design/brand/`, `docs/design/home-v2-preview/`) as their own "Docs:" commit.
3. Move the design into `prototypes/home-hero/`: the brand fonts and pictures, `brand.css` (merge it with `hero.css` and `page.css` into clean files; do not keep "override" rules on top of old rules), `map.js`, the new `index.html` parts, the one-line change in `hero.js`, the new Santa picture and the two SVGs.
4. Remove what is no longer used: Great Vibes and Space Grotesk font files and their `@font-face` rules, `santa-sleigh.webp`, the `.harness` rule, the old card styles, the snow colour variables.
5. Make the pictures smaller: a 104 px ring for the header and a 240 px one for the footer (the 760 px file is only for scene 2), stamps at the size they are shown (and 2× for sharp screens) with `srcset`. Keep `loading="lazy"` on everything under the hero.
6. Check the points in "Things the PM did not finish" below.
7. Update `docs/brief/website-copy-en.md` (removed and new short texts), `prototypes/home-hero/README.md` and the screenshots.
8. Test (list below). Push to pull request #1. **Do not merge.**

## Things the PM did not finish (the Worker must check them)

| Point | Why |
|---|---|
| Firefox and Safari | The preview was only checked in Chrome (desktop 1440 × 900 and phone 390 × 844) |
| `mask-image` on the tree | Needs the `-webkit-` form too (it is there); check Safari |
| Keyboard path through the map list | Not tested by hand |
| The lights' unlit colour on Paper | Check that the "off" state is still visible but calm |
| Santa is very dark on the dark sky when he is not in front of the moon | It was like this before. A thin lighter edge around the sleigh and reindeer may help: try it, keep it only if it looks right |
| Total picture weight | The preview folder is 3 MB. Target for the first screen on a phone: about 350 kB of pictures |
| Whip timing | 8 seconds between cracks is the PM's guess. The user asked for "sometimes" |

## Security (websec)

| Rule | Why |
|---|---|
| The Content-Security-Policy line in `index.html` stays exactly as it is | The preview already runs under it with no errors |
| No inline `style="…"`, no inline `<script>`, no `onclick`. SVG attributes like `fill="…"` are fine | CSP |
| `map.js` reads nothing from the URL, cookies or storage, and uses no `innerHTML` | No way in for an attacker |
| Fonts and pictures are local files. No CDN, no embedded map from another site (no Google Maps frame) | Supply chain and privacy |
| No new packages and no new vendor files. The fonts are plain `woff2` files from `@fontsource` 5.3.0 with their OFL licence text | Nothing new to trust |
| The two vendor PDFs are **not** added to the repository. No prices and no commercial terms anywhere in the site or the docs | Owner's decision; business information |
| The brand pictures came out of the PDF. Before launch italk must confirm the website may use them and send the original files | Rights |
| The demo is still not deployed | It is a prototype |

## Languages / right-to-left (for later, not built now)

- Cinzel, Cinzel Decorative and EB Garamond have no Kurdish or Arabic letters. The `ckb` and `ar` pages need their own heading and text fonts. Test string: `ڕۆژی ڤێڵە ئێمە`. This is an open decision for plan 003.
- The brand uses wide letter spacing on capital labels. For `:lang(ckb)` and `:lang(ar)` the letter spacing must be 0.
- All new CSS uses logical properties (`margin-inline`, `padding-inline-start`, `border-inline-start`, `text-align: start`). Keep it that way. The two places with `left`/`right` are the lights' line and the stamp edge, which are the same from both sides.
- The map does not flip. The ring and the stamps hold English letters as part of the picture; that is fine for a logo.
- Kurdish and Arabic text comes only from a native speaker.

## Done when (report these to the PM)

- [ ] Scene 2 has no box. The ring holds "16 – 31 / December 2026". No moon or mountain is left at the top of scene 2.
- [ ] The reins touch Santa's hands and the first reindeer at every moment of the flight. The whip cracks about every 8 seconds and stands still with "reduce motion".
- [ ] The page background is `#EDDDB3`. No blue-white snow colour is left under the hero.
- [ ] Title, headings and text use the three brand fonts. No Great Vibes or Space Grotesk request in the Network tab.
- [ ] All five stamps and the ring are shown. Nothing is stretched.
- [ ] The map shows 66 places (7 Z, 21 S, 38 K), two entrances, tree, stage, main hall, kids area, four sitting areas and parking. No price and no room code is on the page.
- [ ] Each of the ten list buttons highlights the right part. "Show the whole map" works. It also works with the keyboard only.
- [ ] 375 px and desktop both look right. The page does not scroll sideways; only the map box does, on phones.
- [ ] With "reduce motion" on, and with JavaScript off, all text and the whole map are visible.
- [ ] Console: no errors and no CSP errors. Network: local requests only. The CSP line is unchanged.
- [ ] Every text and background pair has a contrast of at least 4.5:1 (use `#A32B20` for small red text on Paper; never Gold for text on Paper).
- [ ] New screenshots: top, scene 2, About, the map with one part chosen, one green section, on phone and desktop.

## Not in this plan

- Kurdish and Arabic pages and their fonts.
- The date version of the 16 lights (question 8 in plan 003).
- Vendor names on the map.
- Next.js, hosting, the domain (plan 003).
- The pause control question (WCAG 2.2.2). The whip is one more thing that moves without a stop; the decision before launch stays open.
