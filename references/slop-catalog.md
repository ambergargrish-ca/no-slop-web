# The slop catalogue

AI slop is what a page looks like when every decision was left at its default. Each tell below is listed with **why it reads as generated** and **what to do instead**. Items marked (scan) are caught by `scripts/slop-scan.mjs`.

## 1. Color

| Tell | Why it reads as AI | Do instead |
|---|---|---|
| Purple to blue or violet to pink gradient (scan) | The single most common generated palette since 2023 | One flat accent from the direction; gradients only if the brand owns one |
| Gradient text on headlines (scan) | Decoration standing in for a strong headline | Solid ink color; let weight and size do the work |
| Glowing blurred blobs behind the hero (scan) | Filler that signals "tech" without meaning anything | Real image, texture, or confident empty space |
| Pure `#000` on pure `#fff` (scan) | Harsh, unconsidered, nobody chose it | Warm or cool off-black (`#1a1a17`) on an off-white (`#faf9f6`) |
| Tailwind default palette used raw (`indigo-500`, `violet-600`) (scan) | Instantly recognisable as un-themed | Custom tokens with a named hue |
| Five accent colors in one view | No hierarchy, the eye has nowhere to land | One accent, plus neutrals |
| Neon on dark "cyber" theme for a non-tech brand | Genre cosplay | Match the palette to the business, not to AI |

## 2. Typography

| Tell | Why | Do instead |
|---|---|---|
| Inter (or system sans) everywhere on a marketing site (scan) | The generator's default font | A deliberate pair from `typography.md` |
| Every heading the same weight, centered | No rhythm, no voice | Vary size dramatically; left-align most text |
| Headline at 48px, body at 16px, nothing in between | Two sizes is not a scale | A modular scale with 6 to 8 steps |
| Long lines of body text across the full width | Unreadable, unedited | Measure of 60 to 75 characters (`max-width: 65ch`) |
| ALL CAPS paragraphs or overused letter-spaced eyebrows above every section (scan) | The "SECTION LABEL" pattern on every block | Use eyebrows rarely, only where they add navigation |
| Straight quotes and `--` in copy (scan) | Unset type | Curly quotes, real apostrophes, proper ellipsis |
| Orphans: one word alone on the last line of a headline | Unbalanced | `text-wrap: balance` on headings, `pretty` on paragraphs |

## 3. Layout and composition

| Tell | Why | Do instead |
|---|---|---|
| Centered hero, headline, subline, two buttons, screenshot below | The template every generator produces | One of the hero patterns in `layout.md`, chosen for this content |
| Three feature cards in a row with an icon, title and two lines each (scan, heuristic) | The most generated section on the web | Fewer, deeper features; asymmetric layout; a real demo |
| Every section the same height, padding and structure | Monotone rhythm | Vary density: a tight section, then an open one |
| Cards inside cards inside cards | Boxing in place of hierarchy | Use space and alignment to group; borders sparingly |
| Same border radius everywhere at 12 to 16px (scan) | The "soft SaaS" default | Pick a radius that matches the direction (0, 2, 6 or full) and apply it consistently |
| Drop shadows on everything (scan) | Depth with no light source | One elevation level for things that float; flat for the rest |
| Bento grid for content that is not a set of equals | Trend chasing | Bento only when items truly are peers |
| Logo wall of famous brands the business never worked with | Fake proof | Real clients or nothing |
| Pricing with three tiers and "Most popular" on the middle by reflex | Pattern, not strategy | Price structure that fits the actual offer |
| Footer with 6 columns of links for a 4-page site | Imitating big companies | Footer sized to the real site |

## 4. Copy

| Tell | Why | Do instead |
|---|---|---|
| Em dashes everywhere (scan) | Most recognised AI writing tell | Commas, colons, periods, parentheses |
| "Elevate", "unlock", "unleash", "supercharge", "seamless", "revolutionize", "empower", "harness", "game-changer", "cutting-edge", "next-level", "in today's fast-paced world" (scan) | Generated vocabulary | Concrete verbs that describe what actually happens |
| "Your all-in-one solution for..." (scan) | Says nothing | Name the job, the person and the outcome |
| Triplets everywhere: "Fast. Simple. Powerful." | Rhythm with no content | One specific claim with evidence |
| "Not just X, it's Y" constructions (scan) | A generator's favourite pivot | State Y directly |
| Headline as a question: "Ready to transform your business?" (scan) | Weak, generic | A statement of what the visitor gets |
| Button text "Get started" on every button (scan) | Ambiguous | Specific verbs: "Book a table", "See the menu", "Start a 14-day trial" |
| "Lorem ipsum" or invented testimonials from "Sarah J., CEO" (scan) | Fake | Real quotes with permission, or a marked placeholder |
| Numbers with no source: "10x faster", "99.9% satisfaction" | Unprovable | Real numbers with context, or cut |

More in `copy.md`.

## 5. Icons and imagery

| Tell | Why | Do instead |
|---|---|---|
| Emoji as icons (scan) | Cheapest possible visual | One consistent icon set, one stroke weight, or no icons |
| ✨ sparkles for AI features (scan) | Universal AI cliche | Describe the feature; if an icon is needed, use something literal |
| Icons inside colored rounded squares above every feature | Template filler | Icons only where they aid scanning |
| AI-generated people, uncanny hands, plastic skin | Erodes trust instantly | Real photography, or no people |
| Stock photo of a diverse team high-fiving at a laptop | Cliche | Real team, real place, real product |
| 3D glossy abstract shapes | Generic "innovation" | Product shots, texture, typography as image |
| Screenshot in a floating tilted browser mockup with a glow | Template | Real UI at real size, cropped to the important part |

## 6. Motion

| Tell | Why | Do instead |
|---|---|---|
| Everything fades up on scroll (scan, heuristic) | Motion as reflex | Animate only what needs attention or explains a change |
| Bouncy springs on serious content | Wrong personality | Easing that fits the direction |
| Long durations (over 500ms for UI) (scan) | Sluggish | 150 to 300ms for UI, longer only for large, rare transitions |
| Infinite looping background animations | Distracting, fails WCAG 2.2.2 | Run once and stop, or provide pause |
| No `prefers-reduced-motion` handling (scan) | Inaccessible | Always provide a reduced path |
| Typewriter headline effect | Dated generator trick | Static headline |

## 7. Code-level tells

| Tell | Why | Do instead |
|---|---|---|
| `div` soup with click handlers (scan) | Inaccessible, unconsidered | Semantic elements: `button`, `a`, `nav`, `main`, `section` |
| Images without `alt` (scan) | Inaccessible | Meaningful alt, or `alt=""` if decorative |
| `outline: none` with no replacement (scan) | Breaks keyboard users | `:focus-visible` style with clear contrast |
| Hardcoded hex values inside components (scan) | No system | Tokens |
| `!important` sprinkled through styles (scan) | Fighting the cascade | Fix specificity |
| Placeholder `href="#"` links (scan) | Unfinished | Real destinations or remove |
| Missing `<title>`, meta description, or Open Graph image | Unfinished | Fill them; share previews are part of the design |

## 8. The squint test

The scanner cannot judge taste. After it passes, take a screenshot, blur it (or squint), and ask:

1. Is there one obvious first thing to look at?
2. Can you tell what the business is from the blurred shape alone (a restaurant should not look like a SaaS)?
3. Does the page have rhythm, tight then open, rather than identical blocks?
4. Would a designer recognise a specific direction, or just "a website"?

If any answer is no, go back to `directions.md`.
