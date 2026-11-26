# 004 — Home page under the animation (in the demo)

Status: Done on 2026-11-26 (approved by the user: "plan it and send it to the Worker"). **Changed** the same day by four design choices of the user, see "Changes after the first build"
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

## Changes after the first build (user decisions, 2026-11-26)

The user looked at a comparison page in the Worker session and chose four changes. They are built (commit `a2b1f02`, pull request #1). Where this section and the text below disagree, **this section wins**.

| # | Choice | What changed in this plan |
|---|---|---|
| 1 | **16 lights = 16 nights** in the About section | New. It was under "Not in this plan". See "The sixteen lights" below |
| 2 | **One moment**: paragraphs and lists do not fade in any more | The second row of the text-animation table is cancelled. Headings still slide up, once |
| 3 | **No ALL-CAPS text** | "by SuliFest", the place on the card and "Scroll for a surprise" are in normal letters |
| 4 | **English is marked as the current language** in the header | The page is in English, so this is correct |

### The sixteen lights

| Part | Rule |
|---|---|
| Place | In About, after the three paragraphs and before the facts list |
| What | One row of 16 small round lights on a thin line, one light per night (16–31 December). Lantern colour. The last light is bigger and Berry red: the New Year night |
| Labels | "16 December" at the start, "31 December" and "New Year" at the end |
| Movement | When the row comes into view, the lights turn on one by one (120 ms apart), once. They change colour and glow only; they do not move |
| Without motion | With "reduce motion" on, or JavaScript off, all 16 lights are simply on |
| For screen readers | The row is one picture with one description. The single lights and labels are hidden from screen readers |
| In the demo | All 16 lights are on. The demo does not look at today's date. The real site can show which night it is (plan 003) |

Two notes for later:

- The description for screen readers and the labels are new short English texts. They are not in the brief. They need Kurdish and Arabic versions from a native speaker.
- The lights change `background` and `box-shadow`, not only `transform` and `opacity` (rule 3 of the text animation). This is fine for 16 small dots that change once.

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
| ~~Paragraphs, list items, facts~~ | ~~They fade in and rise 16 px, one after another, 80 ms apart.~~ **Cancelled** on 2026-11-26 (choice 2): this text is simply there |

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
- [ ] Each section heading slides up once. Paragraphs and lists do not move (changed by choice 2).
- [ ] The 16 lights in About turn on one by one, once (added by choice 1).
- [ ] With "reduce motion" on, and with JavaScript off, all text is visible and nothing moves.
- [ ] Console: no errors and no CSP errors. Network: local requests only.
- [ ] 375 px and desktop both look right; no sideways scrolling.
- [ ] Keyboard: every link can be reached and shows a focus ring. Contrast is at least 4.5:1.
- [ ] New screenshots: the About section on phone and desktop, and one dark section.

## Not in this plan

- The sixteen lights that follow today's date (which night it is, how many days are left). The demo shows all 16 lights on. The date version comes with plan 003.
- Kurdish and Arabic text, right-to-left layout.
- Separate pages (About, Experience, …): the demo is one long page. They come with plan 003.
- The six open polish points of the hero (left-over moon at the top of scene 2, the dark shape around the tree, and so on).
- Next.js, hosting, the domain.
