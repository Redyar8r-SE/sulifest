# 004 — Home page under the animation (in the demo)

Status: Approved by the user on 2026-11-26 ("plan it and send it to the Worker")
Date: 2026-11-26
Source text: `docs/brief/christmas-nights-brief.md`
Builds on: plan 002 Part 0 (the demo in `prototypes/home-hero/`, pull request #1)

## Goal

The demo has only the animation. Now add the rest of the Home page **under** it:
first **About**, then the other sections from the brief.

What the user asked for:

| Request | What it means here |
|---|---|
| The animation is the first thing | The hero stays at the top, unchanged in how it moves |
| "Under the animation we should have About, everything" | About comes first, then every section of the brief |
| "Make a match with them" | The new sections use the hero's colours and fonts and start from the snow at the end of the hero |
| "Use a basic style" | Text and colour only. One column. No new pictures, no cards, no new library |
| "Add another animation, for example showing the text" | A simple text reveal when a section scrolls into view |

This is still the stand-alone demo (plain HTML, CSS, JavaScript). It moves into the real Next.js project later (plan 003).

## The page, from top to bottom

All text is copied from the brief, word for word. Do not write new sentences.

| # | Section | Background | Content (brief section) |
|---|---|---|---|
| 0 | Hero | Night scene | As now, with the text changes below |
| 1 | **About Christmas Nights** (`id="about"`) | Snow | Section 1: the first paragraph as a large lead, then the other two paragraphs. Then a small facts list: Dates, Location, City, Organizer (section 9) |
| 2 | The festival experience | Snow | Section 3: the opening sentence, then the four experiences, each as a title with its text |
| 3 | Family and children's experiences | Snow | Section 4: two paragraphs, the list of six activities, the closing paragraph |
| 4 | Youth, creativity and learning | Snow | Section 5: two paragraphs, the list of seven activities, the closing paragraph |
| 5 | New Year celebration | Midnight (dark) | Section 6: three paragraphs |
| 6 | The venue: Magma Square | Snow | Section 7: opening sentence, the list of six features, closing sentence |
| 7 | From SuliFest to Christmas Nights | Midnight (dark) | Section 8: the motto on three lines ("One vision." / "Different seasons." / "Endless experiences."), then the four paragraphs |
| 8 | Footer | Midnight (dark) | "Christmas Nights by SuliFest", "Organized by italk", and the three language names |

The placeholder section "The rest of the Home page" is removed. The skip link at the top now jumps to `#about`.

## Text changes in the hero (facts from the brief)

| Now | Change to |
|---|---|
| Small line "Sulaymaniyah festival" | "by SuliFest" |
| Title "Sulifest" | "Christmas Nights" |
| (nothing) | Add the tagline under the title: "A Season of Lights, Joy & Celebration" |
| Logo text "Sulifest" | "Christmas Nights" |
| Card sentence "Sulifest is the festival of Sulaymaniyah…" | "Christmas Nights brings together different elements of the festive season to create a complete experience for visitors." |
| `[FESTIVAL DATES]` | "16–31 December 2026" |
| `[PLACE] · Sulaymaniyah` | Two lines: "Magma Square" and "Sulaimani" |
| Button "Book a booth" (two places) | "About the festival", a link to `#about` |
| "Booth booking is free" | Remove this line |
| Page title "Sulifest – home hero demo" | "Christmas Nights by SuliFest (demo)" |

Check after the change that the longer title "Christmas Nights" still fits at 375 px wide and does not cover the moon or the sleigh badly. Make the title smaller on phones if needed. Do not change how the scene moves.

## Style (basic, and matched to the hero)

| Part | Rule |
|---|---|
| Colours | Snow `#EEF2F7` (page background, the colour of the snow at the end of the hero), Midnight `#0B1430` (text on snow, dark sections), Frost `#D5DEEA` (soft text on dark), Lantern `#F2B84B` (list dots, motto, links on dark), Berry `#B8324A` (link hover on snow, focus ring) |
| Join with the hero | The hero ends on its snow ground. The About section starts directly on the same snow colour, with no line or gap between them |
| Fonts | Only the fonts already in the demo: Space Grotesk bold for headings, the system font for text, Great Vibes for nothing new. No new font files |
| Sizes | Text 18 px (17 px on phones), line height 1.6. Lead paragraph 24 px (20 px on phones). Section headings 40 px (30 px on phones) |
| Layout | One text column, at most about 68 characters wide. Text starts at the reading edge, not centred. Use logical CSS (`margin-inline`, `padding-inline`, `text-align: start`) |
| Space | About 96 px above and below each section on desktop, 64 px on phones |
| Lists | Normal `<ul>` lists. The bullet is a small Lantern dot |
| Not allowed | Cards with shadows, small ALL-CAPS labels, icons, pictures, arrows on links, dots between facts ("A · B") |

Every text and background pair must have a contrast of at least 4.5:1. Do not use Lantern for text on Snow.

## The text animation ("showing the text")

One simple effect, used the same way in every section:

| Element | Effect |
|---|---|
| Section heading | It slides up from behind an invisible line (the heading sits in a box with `overflow: hidden` and moves from 100% down to its place). 0.6 seconds |
| Paragraphs, list items, facts | They fade in and rise 16 px, one after another, 80 ms apart. 0.5 seconds each |

Rules:

1. It plays **once**, when the section comes into view. It does not replay and it is not tied to the scroll position.
2. Use `IntersectionObserver` and CSS transitions. Do not add a library, and do not use GSAP for this.
3. Animate only `transform` and `opacity`.
4. Move whole headings, lines or paragraphs. Never split text into letters (this breaks Kurdish and Arabic later).
5. The text is visible by default. It is hidden before the effect only when `<html>` has the `motion` class. So with JavaScript off, or with "reduce motion" on, all text is simply there.
6. If `IntersectionObserver` is missing, show everything.

## Security (websec)

The audit of 2026-11-26 found no problem in the demo code. Keep it that way:

| Rule | Why |
|---|---|
| The Content-Security-Policy line in `index.html` stays as it is. No `unsafe-inline`, no new sources | The new sections must work under the same strict policy |
| No inline `style="..."`, no inline `<script>`, no `onclick="..."` | Same reason |
| No outside requests: no CDN, no web fonts from other sites, no embedded map | Supply chain and privacy |
| The new script reads nothing from the URL, cookies or storage, and uses no `innerHTML` | No way in for an attacker |
| All new links are `#` anchors inside the page | No redirects |
| No new packages, no new vendor files | Nothing new to trust |
| No pictures in this task. If one is needed, stop and ask the PM | Licence |
| The demo is still not deployed anywhere | It is a prototype |

## Steps for the Worker

1. On branch `feature/home-hero-demo`: first commit the PM's uncommitted docs (`docs/brief/`, `docs/plans/`) as their own commit.
2. Change the hero texts (table above). Check the title on a 375 px screen.
3. Replace the placeholder section with sections 1–8. Use real HTML: `<section>` with `aria-labelledby`, one `<h2>` per section, `<p>`, `<ul>`, `<dl>` for the facts, `<footer>`.
4. Add the styles to `hero.css`, or a new `page.css` if that keeps the files clearer.
5. Add the text reveal in a new small file `reveal.js` (loaded with `defer`).
6. Test: 375 px and desktop, Chrome and Edge, reduce motion on, JavaScript off, keyboard only.
7. Update `prototypes/home-hero/README.md` and the screenshots. Push to the same pull request #1. Do not merge.

## Done when (report these to the PM)

- [ ] The animation is still the first thing on the page and moves exactly as before.
- [ ] Under it: About first, then sections 2–8, with the brief's text word for word.
- [ ] No placeholder like `[PLACE]` is left. "Book a booth" is gone.
- [ ] The text reveal plays once per section, and looks the same in every section.
- [ ] With "reduce motion" on, and with JavaScript off, all text is visible and nothing moves.
- [ ] Console: no errors and no CSP errors. Network: local requests only.
- [ ] 375 px and desktop both look right; no sideways scrolling.
- [ ] Keyboard: every link can be reached and shows a focus ring. Contrast is at least 4.5:1.
- [ ] New screenshots: the About section on phone and desktop, and one dark section.

## Not in this plan

- The string of sixteen lights (from the design direction in plan 003): the user has not said yes to it yet.
- Kurdish and Arabic text, right-to-left layout.
- Separate pages (About, Experience, …): the demo is one long page. They come with plan 003.
- The six open polish points of the hero (left-over moon at the top of scene 2, the dark shape around the tree, and so on).
- Next.js, hosting, the domain.
