# 006 — The story in three steps: SuliFest, italk, Christmas Nights (in the demo)

Status: Approved by the user on 2026-11-27 (standing instruction: "don't ask for permission, when everything is ready send it to the Worker")
Date: 2026-11-27
Builds on: plan 005 (brand design, done in pull request #1)
Facts and draft text: `docs/brief/sulifest-and-italk.md`
Working preview made by the PM: `docs/design/home-v2-preview/` (the `#about` section, `story.js`, and part 7 of `brand.css`)

## Goal

The user looked at the About section and asked for the best design and the best animation for it. The user also asked:

> "First talk about the Sulifest. After gather information about italk… Separately talk about Sulifest as a brand, also italk as an organizer. After also came talk about that night."

So the About section becomes a short story in three steps, in this order:

| Step | Small label | Heading | What it says |
|---|---|---|---|
| 1 | The brand | SuliFest | Where the name comes from, the first festival in June 2026 |
| 2 | The organizer | italk | Who italk is, how it began |
| 3 | The festival | About Christmas Nights | The text that is there now |

After step 3 come the 16 lights and the four facts, as now.

## Design

| Part | Rule |
|---|---|
| The wire | A thin green line runs down the start side of the section, from step to step. Each step begins with a red diamond on the wire. After step 3 the wire goes down into the row of 16 lights: it is the same wire |
| Layout | Each step is one row: text and a stamp. Step 1: text first, stamp second. Step 2: stamp first, text second. Step 3: text first, stamp second. On phones: one column, text first, stamp under it |
| Stamps | Step 1 and step 2 have no stamp picture, so their stamps are made in CSS: a cream card (`#F3E6C4`) with the cut stamp edge (CSS `mask`, no picture), a thin Tan inner line, and a red postmark circle at the corner. Step 1 holds the ring + "SuliFest" + "Sulaimani, since 2026". Step 2 holds the italk mark + "italk" + "Organizer, since 2019". Step 3 uses the tree stamp picture |
| Numbers | Under each text: a row of short facts, each with a red side line. A big green number (Cinzel Bold 30 px) and a small label |
| Small labels | "The brand", "The organizer", "The festival": Cinzel Bold, spaced, in the small-text red `#A32B20` |

## The animation

One movement per step, **once**, when the step comes into view (its top passes 72% of the screen height):

| Order | What moves | How |
|---|---|---|
| 1 | The wire grows down through the step | `scaleY` 0 → 1 from the top, 1.2 s |
| 2 | The diamond turns from an empty green outline to red, with a small pop | 0.5 s |
| 3 | The heading slides up from behind its line | As in plan 004 |
| 4 | The stamp drops onto the page: it starts a little above, turned and bigger, then lands with a small bounce | `opacity` + `transform`, 0.7 s, starts after 0.3 s |
| 5 | The postmark is pressed on the stamp | Scale 1.5 → 1 with a turn, 0.35 s, starts after 0.95 s |
| 6 | The numbers count up to their value | 0.9 s. A year (2019) only runs through its last 25 numbers |

Rules:

1. `IntersectionObserver` + CSS transitions. Counting uses `requestAnimationFrame`. No library, no GSAP for this.
2. Only `transform` and `opacity` move (plus the diamond's colour).
3. Everything is visible by default. Things are hidden before their moment only when `<html>` has `motion` **and** `story-on` (set by `story.js`). With JavaScript off, with "reduce motion", or if the script fails, the whole story is simply there, with the final numbers in the HTML.
4. A step that is already above the screen when the page opens is shown at once.
5. Whole words and lines move. No letter-by-letter effects (Kurdish and Arabic later).
6. The numbers use `font-variant-numeric: tabular-nums` so the row does not jump while counting.

## Text

The draft English text is in `docs/brief/sulifest-and-italk.md` ("Draft text for the page"). Use it word for word, and add it to `docs/brief/website-copy-en.md` marked "(new, plan 006, needs italk's approval)".

Do not add a visitor number for SuliFest. The public numbers are a forecast (500,000) and a four-day count (about 100,000); the final number is not known.

## Steps for the Worker

1. Read the preview's `#about` section, `story.js`, and part 7 of `brand.css` in `docs/design/home-v2-preview/`. Screenshots: `screenshots/story-*.jpg`.
2. Commit the PM's docs first as their own "Docs:" commit (`docs/plans/006-…`, `docs/plans/README.md`, `docs/brief/sulifest-and-italk.md`, `docs/design/brand/README.md`, the changed preview files).
3. Build it in `prototypes/home-hero/` in your clean structure (tokens in `hero.css`, page rules in `page.css`). The preview uses the class names `.step`, `.step-text`, `.step-art`, `.step-mark`, `.stamp-drop`, `.paper-stamp`, `.postmark`, `.stats`, `.stat`. Note: `.chapter` is already used by the "From SuliFest" boxes; do not reuse it.
4. Keep `id="about"` on the section and `id="about-title"` on the third heading. The skip link and the two "About the festival" buttons still go to `#about`, which is now the start of the story.
5. Headings: the three step headings are `<h2>`. Check the heading order of the whole page with a screen reader or an outline tool.
6. Update `website-copy-en.md`, the demo README and the screenshots. Push to pull request #1. **Do not merge.**

## Things the PM did not finish (the Worker must check them)

| Point | Why |
|---|---|
| Firefox and WebKit | The story was only checked in Chrome (1440 × 900 and 390 × 844) |
| The CSS stamp edge (`mask` with two layers and `round`) | Check WebKit. If it fails there, the fallback must be a plain card, not a broken one |
| The join between the wire and the row of lights | It is placed with fixed pixel numbers in the preview. Make it hold at every width |
| The two "SuliFest" parts | Step 1 (new) and the last section "From SuliFest to Christmas Nights" both talk about SuliFest. Keep both for now; tell the PM if it reads as a repeat |
| Contrast of the new parts | Run your contrast scan again (the small labels, the stamp text, the number labels) |
| The ring appears twice close together | Once in scene 2 of the hero, once in the step 1 stamp. Tell the PM how it feels in the real scroll |

## Security (websec)

| Rule | Why |
|---|---|
| The Content-Security-Policy line stays exactly as it is | The preview runs under it with no errors |
| `story.js` reads nothing from the URL, cookies or storage. It writes numbers with `textContent`, never `innerHTML` | No way in for an attacker |
| No inline styles, no inline scripts, no outside requests, no new packages, no new pictures | As in plans 004 and 005 |
| No link to italk.krd, sulifest.com or the news sites on the page for now | Outside links are a decision for the real site (plan 003), with `rel="noopener"` |
| No person's name on the page (the organizer quoted in the news is not named) | Privacy; nobody asked that person |
| The demo is still not deployed | It is a prototype |

## Languages / right-to-left (later)

- The wire and the diamonds use `inset-inline-start`, so they move to the right side in Kurdish and Arabic.
- Step 2 puts the stamp first with `order`; in right-to-left the row flips by itself. Do not add `left` or `right`.
- Numbers: the count-up writes Western digits. If the site chooses Arabic-Indic digits (question 5 in plan 003), the count-up must use `Intl.NumberFormat` for the page language.
- "SuliFest" and "italk" inside the CSS stamps are names: they stay in Latin letters, wrapped so they do not break the line direction.

## Done when (report these to the PM)

- [ ] The About section shows three steps in this order: SuliFest, italk, About Christmas Nights; then the 16 lights and the four facts.
- [ ] Each step's movement plays once, in the order of the table. Scrolling back up does not replay it.
- [ ] With "reduce motion" on, and with JavaScript off: all three steps, the stamps, the wire and the final numbers are visible, and nothing moves.
- [ ] The numbers end on exactly 8, 100+, 200+, 60, 2019, 16, 66 and 1.
- [ ] The wire meets the row of lights at 375 px, 768 px and 1440 px.
- [ ] 375 px and desktop look right; no sideways scrolling.
- [ ] Console: no errors and no CSP errors. Network: local requests only. The CSP line is unchanged.
- [ ] Contrast at least 4.5:1 for every new text.
- [ ] `website-copy-en.md` holds the new text, marked as waiting for italk.
- [ ] New screenshots: the three steps on phone and desktop.

## Not in this plan

- A final visitor number, team names or event counts (waiting for italk).
- Photos of SuliFest 2026 (none are in the project; ask italk).
- Kurdish and Arabic text.
- Separate "About SuliFest" and "About italk" pages (plan 003).

## Addition (2026-11-27): the join between the night and the paper

The user looked at the end of the hero and said the two background colours do not match: the dark night stops with a hard cut and the cream paper starts. The row of small half circles (the stamp edge) made the cut even harder.

New rule for the bottom of scene 2 (built in the preview, see `screenshots/join-night-to-paper-*.jpg`):

| Part | Rule |
|---|---|
| The stamp edge under the hero | Removed here. It stays on the two green sections |
| Snow hills | One inline `<svg class="ground-hills">` inside `.s-ground` (view box `0 0 1440 160`, `preserveAspectRatio="none"`) with three hills, all in the Paper colour `#EDDDB3`: the far hill at 16% opacity, the middle hill at 42%, the front hill at 100%. So the colour steps from night to paper in three tones, and the page under the hero starts with no line |
| White edge | A 2 px Ivory line on top of the front hill (75% opacity, `vector-effect: non-scaling-stroke`), like light on snow |
| Height | `.s-ground` is `1.6 ×` the old ground height. In the drawing, y = 60 is the line the tree and the gifts stand on. The front hill stays between y = 44 and y = 62, so it always covers their bottom edge |
| Warm glow | `.ground-glow`: a soft gradient that rises from the hills, from Paper at 22% to Bright gold at 10% to nothing. It warms the dark blue near the ground, so the night and the paper share a tone |
| Movement | None of its own. The hills and the glow are inside `.s-ground`, which the GSAP timeline already moves |

Security: inline SVG with classes only, no inline style, no new file. The CSP line does not change.

Add to the done-when list:

- [ ] At the end of the hero there is no hard line between the night and the paper, at 375 px, 768 px and 1440 px. The tree and the gifts stand on the front hill; their bottom edges are not visible.

## Result (2026-11-27)

Built by the Worker in commit `d5f7cdb` (pull request #1, not merged) and checked by the PM in Chrome: CSP line unchanged, no outside requests, story text the same as the copy file, numbers end on the right values, no sideways scrolling, map still works.

Changed by the user during the build: the red "About the festival" button in the **header** is removed (the user told the Worker "delete this about for me"). The same button at the end of scene 2 stays. Plans 004 and 005 still describe the header button; this note replaces them on that point.

## Addition 2 (2026-11-27): two repeats found by the Worker

| Repeat | Decision by the PM |
|---|---|
| The big ring is at the end of the hero, and one short scroll later the step 1 stamp shows the same ring | The step 1 stamp becomes a stamp made of letters only. No ring |
| Step 1, the last section's second paragraph, and the "SuliFest" box all say "eight days, summer, Hawary Shar Park" | Cut the first half of that paragraph in the last section. Step 1 and the box stay |

### The step 1 stamp (letters only)

Inside the same CSS stamp card, top to bottom, centred:

| Line | Style |
|---|---|
| "Suli" | Cinzel Decorative Black, about 76 px (56 px on phones), Green |
| "Fest" | Cinzel Bold, about 20 px, letter spacing 0.5em, small-text red `#A32B20` |
| A thin Tan line, 40 px wide | |
| "Sulaimani, since 2026" | As now |

This shows the point of the text next to it: the name comes from "Suli". Remove the ring picture from this stamp (and its `srcset` files if nothing else uses them).

### The last section's text

In "From SuliFest to Christmas Nights", the second paragraph changes from

> Following SuliFest 2026, an eight-day summer festival held at Hawary Shar Park, Christmas Nights continues the same vision of bringing people together through large-scale cultural, entertainment, and community experiences.

to

> Christmas Nights continues the same vision of bringing people together through large-scale cultural, entertainment, and community experiences.

Join it with the first sentence in one paragraph. It is a cut only, with no new words. Record it in `website-copy-en.md` as edit 8, waiting for italk's approval like the others. The statue stamp and the two boxes stay.

Done when: the ring is seen once in the scroll from scene 2 to step 1 (plus the small logo in the header); the facts "eight days" and "Hawary Shar Park" are each said once in sentences (step 1) and once in the box; contrast and no-sideways-scroll checks still pass.
