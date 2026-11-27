---
name: no-slop-web
description: Build, redesign or audit a website so it looks designed by a senior human, not generated. Strips AI slop (purple gradients, emoji icons, three-card grids, filler copy) and enforces a classy, intentional system for type, color, layout, motion and copy. Use for any landing page, marketing site, portfolio, product site or redesign, or when a page "looks AI-made".
---

# No Slop Web

A complete playbook for websites that look expensive, calm and deliberate. It combines a design direction, a token system, a slop blocklist, UX laws, accessibility and a final polish gate into one workflow.

The core belief: **AI slop is the absence of decisions.** Every generic default (Inter, a violet gradient, three feature cards, "Elevate your workflow") is what appears when nobody chose. This skill forces a choice at every layer, then checks the result mechanically.

## When to use

- New landing pages, company sites, portfolios, product and SaaS marketing sites, restaurant, studio, shop and service sites.
- Redesigns where someone says the site "looks generic", "looks like AI", "looks like a template" or "needs to feel premium".
- Audits: "check this page for slop", "make this classier", "polish before launch".
- For dense product UI (dashboards, tables, admin), use the same tokens and copy rules but skip the marketing layout patterns.

## The workflow (do not skip steps)

### 1. Brief (2 minutes, before any code)

Write a five-line brief at the top of your plan. If any line is unknown, ask the user once, briefly; if they are not there, pick a sensible answer and state it.

1. **Who** is the visitor, and what do they already believe?
2. **One action** the page exists to get (book, buy, sign up, call).
3. **Proof** you actually have: numbers, clients, photos, testimonials with real names. Never invent any.
4. **Brand constraints**: existing palette, fonts, logo. Existing brand always wins over this skill's taste.
5. **Feel** in three adjectives that are not "modern", "clean" or "sleek" (those are the slop defaults). Example: "warm, exacting, unhurried".

### 2. Direction (pick exactly one)

Read `references/directions.md` and pick ONE direction that matches the three adjectives. Do not blend two. Write down its type pair, palette ratio, radius, and signature move. A site with one strong direction beats a site with five tasteful ideas.

### 3. System (tokens before components)

Copy `templates/tokens.css` and fill it from the direction. Every color, size, space, radius, shadow and duration on the page must come from a token. No magic numbers in components. Fill `templates/DESIGN.md` so future edits stay consistent.

Read as needed:
- `references/typography.md`: scale, pairing, measure, the details that read as premium.
- `references/color.md`: the 60/30/10 rule, neutrals with temperature, one accent, dark mode.
- `references/layout.md`: grid, rhythm, section anatomy, how to avoid the template look.

### 4. Build

- Write the copy before the layout. Read `references/copy.md`. Layout serves the words, not the reverse.
- Compose each section with one idea and one focal point. See the section anatomy in `references/layout.md`.
- Imagery: `references/imagery.md`. Real photos or nothing; no stock-hero cliches; no AI people.
- Motion: `references/motion.md`. Fewer, better animations. Respect `prefers-reduced-motion`.
- Usability: `references/ux-laws.md` for navigation, forms, CTAs and pricing.
- Accessibility is not a final pass. Build to `references/accessibility.md` from the first line.

### 5. Slop scan (mechanical)

Run the scanner from your own working directory against the project:

```bash
node <skill-dir>/scripts/slop-scan.mjs <project-dir>
```

It reports `file:line` findings by severity and a 0 to 100 score. Fix every **high** finding. Fix **medium** findings unless there is a written reason to keep one. The target is 90+. Then read `references/slop-catalog.md` and check the tells the scanner cannot see (composition, rhythm, imagery, tone).

### 6. Polish gate (human eye)

Open the page in a real browser at 375px, 768px, 1280px and 1920px. Go through `references/polish-checklist.md` line by line. For forms, toasts, anchors and loading states, try them for real on a phone and on a throttled network (`references/interaction-details.md`). On a real iPhone and Android phone, go through `references/mobile-details.md`. Check every form against `references/forms-and-flows.md` and every state change against `references/motion-details.md`. Take screenshots and look at them: squint at each viewport and confirm the eye lands on the one thing that matters first.

### 7. Ship

Report: the direction chosen and why, the scanner score before and after, what was fixed, and anything left for the user to decide (usually real photos or real testimonials).

## Non-negotiables

These apply to every build, whatever the direction:

1. **No em dashes in visible copy.** Use commas, colons, periods or parentheses. It is the single most recognised AI writing tell.
2. **No invented proof.** No fake testimonials, logos, user counts, star ratings or "trusted by 10,000+ teams". Use placeholders clearly marked `[REAL QUOTE NEEDED]` instead.
3. **No emoji as icons**, no sparkle (✨) as a stand-in for "AI", no rocket for "launch".
4. **No default purple-to-blue gradient**, no gradient text on headlines, no glowing blobs behind the hero.
5. **One accent color**, used for action and emphasis only (roughly 10% of the surface).
6. **One typeface pair at most**, with a real reason for each. Never default to Inter alone for a marketing site.
7. **Every number on the page is real or removed.**
8. **Contrast passes WCAG AA** (4.5:1 body, 3:1 large text and UI). Focus states are visible.
9. **The page works without JavaScript animations** and with `prefers-reduced-motion: reduce`.
10. **Existing brand rules beat this skill.** If the user has a palette, fonts or a design system, use them and apply the rest of these rules around them.

## Files

| File | Use it for |
|---|---|
| `references/slop-catalog.md` | The full catalogue of AI tells, visual, layout, copy, motion, code |
| `references/directions.md` | Eight named directions with tokens and signature moves |
| `references/typography.md` | Type scale, pairing, measure, premium details |
| `references/color.md` | Palette construction, ratios, dark mode |
| `references/layout.md` | Grid, spacing rhythm, section anatomy, hero patterns |
| `references/copy.md` | Banned phrases, headline formulas that are not formulas, microcopy |
| `references/imagery.md` | Photography, illustration, icons, art direction |
| `references/motion.md` | Durations, easing, what to animate, what never to animate |
| `references/ux-laws.md` | Laws of UX mapped to concrete page decisions |
| `references/accessibility.md` | WCAG 2.2 AA build rules and checks |
| `references/interaction-details.md` | Double submits, hit areas, theme flash, image space, Enter to submit, anchors, validation, states, toasts, share previews |
| `references/mobile-details.md` | 16px inputs, tap highlight, keyboards, hover media query, OTP autofill, overscroll, email fields, double-tap zoom, enterkeyhint, scroll snap |
| `references/motion-details.md` | Sheets, tooltips, typing dots, toast stacks, drops, success bursts, showing steps, morphing icons |
| `references/forms-and-flows.md` | The perfect text input; one-question-at-a-time mobile search with a live count; pricing tables |
| `references/polish-checklist.md` | The pre-ship gate, 92 checks |
| `scripts/slop-scan.mjs` | Zero-dependency slop scanner with a score |
| `templates/tokens.css` | Starter design tokens |
| `templates/DESIGN.md` | Design system record for the project |
| `examples/` | A sloppy page and its fixed version, for calibration |

## Credits

Created by Amber Gargrish (gargrish.com) from the end-to-end UI and UX build of the Platepoint restaurant platform. See `references/credits.md` for the open source work and authors that shaped it. If you use or adapt this skill, please cite it (see `CITATION.cff`).
