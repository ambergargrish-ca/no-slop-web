# Polish gate

Go through every line before calling a page done (92 checks). Mark each pass, fail, or not applicable. A page ships with zero fails in sections A and B.

## A. Slop (must all pass)

1. `slop-scan` score is 90 or higher, with zero high findings.
2. No em dashes in visible copy.
3. No banned phrases (see `copy.md`).
4. No invented testimonials, logos, numbers or ratings.
5. No emoji icons, no ✨ for AI.
6. No default purple or indigo palette, no gradient headline text, no glow blobs.
7. Hero is not the centered headline, two buttons and tilted screenshot template (unless deliberately justified in `DESIGN.md`).
8. No three-equal-card feature grid with icons in colored squares (unless the items truly are peers and icons were removed or earned).
9. The page could not be mistaken for a different industry when blurred.
10. One direction is recognisable, and it is written in `DESIGN.md`.

## B. Accessibility (must all pass)

11. Contrast AA everywhere, including placeholder text, disabled states and text on images.
12. Visible focus on every interactive element.
13. Full keyboard path through nav, forms, dialogs and the primary action.
14. One `h1`, ordered headings, landmarks, skip link, `lang` set.
15. All images have correct alt text.
16. Forms have visible labels, correct autocomplete, helpful errors.
17. `prefers-reduced-motion` respected; nothing loops forever without a pause.
18. Works at 320px wide and at 200% zoom.

## C. Typography

19. All sizes come from the scale.
20. Body measure 60 to 75 characters.
21. Display headings have tight line height and slight negative tracking.
22. `text-wrap: balance` on headings; no orphans in the hero.
23. Curly quotes and apostrophes, real ellipsis, en dashes for ranges.
24. Tabular numbers for prices and data.
25. Two families maximum; only used weights loaded.
26. Links are visibly links.

## D. Color

27. 60/30/10 ratio roughly holds.
28. Neutrals are tinted, not pure grey; no pure `#000` on `#fff`.
29. One accent, used for action and emphasis only.
30. Grayscale screenshot still shows the hierarchy.
31. Dark mode (if present) has its own ramp, not an inversion.

## E. Layout

32. Everything aligns to the grid; left edges line up.
33. Spacing values all come from the scale.
34. Space within groups is smaller than space between groups.
35. Sections vary in rhythm and density.
36. One focal point per section; one primary action per screen.
37. One border radius across the site.
38. Shadows only on floating elements.
39. Tested at 375, 768, 1024, 1280, 1920, and the 900 to 1100 range.
40. No horizontal scroll at any width.

## F. Imagery and icons

41. Real photos, consistently graded; or none.
42. No AI-generated people; no cliche stock.
43. One icon set, one stroke weight.
44. All images sized (`width` and `height` or `aspect-ratio`), modern formats, lazy below the fold.
45. Open Graph image designed, title and meta description written.

## G. Motion

46. Every animation has a reason (feedback, state change, continuity, the one signature moment).
47. Durations within the ranges in `motion.md`; exits faster than entries.
48. Only `transform` and `opacity` animated.
49. Nothing animates body text into place on scroll.

## H. Copy

50. Headline could not be used by a competitor unchanged.
51. Every button is verb + object.
52. Every number is real and has context.
53. Read aloud: sounds like a person, not an ad.
54. Microcopy written for errors, empty states, loading and success.

## I. Craft and performance

55. Lighthouse performance 90+ on mobile; LCP under 2.5s; CLS under 0.1.
56. No layout shift from fonts or images.
57. No `href="#"`, no dead links, no lorem ipsum.
58. Favicon, apple touch icon and manifest present.
59. 404 page designed in the same direction.
60. The confirmation or thank-you moment is designed as carefully as the hero (peak-end).

## J. Interaction details (see `interaction-details.md`)

61. Submit buttons disable while the request runs and re-enable on failure; the server is idempotent anyway.
62. Every tap target is at least 44 by 44 pixels, with space between neighbours.
63. No theme flash on refresh: the theme is set in `<head>` before first paint.
64. Enter submits every form (real `<form>`, `type="submit"` on the main button).
65. Anchor targets clear the sticky header (`scroll-margin-top` or `scroll-padding-top`).
66. Fields validate on blur and on submit, not on every keystroke.
67. Loading, empty, error and offline states are designed; no endless spinner; typed input is kept.
68. Toasts pause on hover and focus; errors stay until dismissed.

## K. Mobile details (see `mobile-details.md`)

69. Inputs, selects and textareas are 16px or larger on touch screens; zoom is never disabled.
70. The grey tap flash is replaced by a designed `:active` state.
71. Every field opens the right keyboard (`inputmode`, `type`, `autocomplete`).
72. Hover-only styles sit inside `@media (hover: hover)`; nothing depends on hover.
73. Code fields use `autocomplete="one-time-code"` in one field and accept pasted codes.
74. Modals, drawers and horizontal rows contain their scroll (`overscroll-behavior`).
75. Email fields use `type="email"`, no auto-capital, no spellcheck, trimmed.
76. Tapped controls use `touch-action: manipulation` (no double-tap zoom).
77. `enterkeyhint` matches what Enter does (search, next, go, done, send).
78. Horizontal rows snap to items and visibly scroll.

## L. Motion details (see `motion-details.md`)

79. Sheets follow the finger and snap with a small overshoot; tooltips grow from their arrow.
80. Typing indicators wave; toasts slide in and older ones step back.
81. Success bursts only on the real peak (paid, ordered, booked), once, never on work screens.
82. Multi-step work shows its steps as they happen and folds them afterwards; the result reveals, not pastes.
83. Icons that change state morph (play/pause, theme, search/close, send, download, unlock) instead of swapping.
84. Every motion has a tested reduced-motion path.

## M. Forms, flows and type (see `forms-and-flows.md`, `typography.md`)

85. Every field has a visible label outside it; placeholders only show examples.
86. Field borders reach 3:1 contrast at rest; focus is a 2px accent outline with an offset.
87. Errors appear on blur, use `aria-describedby` and `aria-invalid`, and clear when fixed.
88. Mobile search opens full screen and asks one question at a time; done steps fold to one line.
89. The primary button carries the live result count; recent searches show before typing.
90. Five to seven font sizes on one ratio; three text inks; two weights (three for display).
91. Leading falls as size rises; big headings tighten, small caps labels open; body measure 45 to 75 characters.
92. Prices, totals, tables and live numbers use tabular figures.
