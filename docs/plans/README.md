# Sulifest plans

This folder holds the plans that the **PM** session writes.
The **Worker** session builds a plan only after the user says yes to it.

## How it works

1. The user asks the PM for something.
2. The PM reads the main plan, researches the topic, and checks security (websec checklists).
3. The PM writes a plan file here: `NNN-short-name.md` (for example `001-project-setup.md`).
4. The user reads it and says yes, or asks for changes.
5. The PM marks it `Approved` and sends it to the Worker.
6. The Worker builds it and reports back. The PM checks the result against the plan.

## Status values

`Draft` → `Approved` → `In progress` → `Done` (or `Changed` / `Cancelled`)

## Plan list

| # | Plan | Status |
|---|---|---|
| 001 | Project setup (weeks 0–1) | Not written yet |
| 002 | [Home hero with scroll animation](002-home-hero-scroll-animation.md) | Part 0 (stand-alone demo): In progress, sent to the Worker on 2026-11-26. Parts 1–2: wait for 001 |

---

## Template (copy this for every new plan)

```markdown
# NNN — <title>

Status: Draft
Date: YYYY-MM-DD
Main plan section: <section or week in Sulifest-Website-Plan.pdf>

## Goal
<1–3 short sentences: what we build and why>

## Before we start
- <things that must be done first, or questions the user must answer>

## Research (with sources)
- <fact> — <link>

## Steps for the Worker
1. <small, clear step>
2. ...

## Files to create or change
| File | What |
|---|---|

## Security (websec)
| Check | What the Worker must do | websec source |
|---|---|---|

## Languages / RTL (kurdish-arabic-web)
- <only if this plan touches text, fonts, forms or layout>

## Database changes
- <collections or fields changed; the migration name>

## Done when (tests)
- [ ] <a test the Worker must pass and report>

## Not in this plan
- <what we are leaving for later>
```
