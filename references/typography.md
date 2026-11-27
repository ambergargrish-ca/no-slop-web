# Typography

Type is 90% of how classy a site feels. Most "premium" impressions come from four things: a real scale, a comfortable measure, generous line height on body and tight line height on display, and small details done right.

## Scale

Use a modular scale. Pick a ratio by direction:

| Ratio | Feel | Directions |
|---|---|---|
| 1.2 (minor third) | calm, dense | Technical Mono, Soft Modern |
| 1.25 (major third) | balanced | Swiss, Warm Craft |
| 1.333 (perfect fourth) | expressive | Editorial, Quiet Luxury |
| 1.5+ | dramatic | Bold Brutal |

Make it fluid with `clamp()` so it scales between 375px and 1440px without breakpoints:

```css
--step--1: clamp(0.83rem, 0.80rem + 0.15vw, 0.94rem);
--step-0:  clamp(1.00rem, 0.95rem + 0.25vw, 1.13rem);  /* body */
--step-1:  clamp(1.25rem, 1.15rem + 0.45vw, 1.50rem);
--step-2:  clamp(1.56rem, 1.40rem + 0.80vw, 2.00rem);
--step-3:  clamp(1.95rem, 1.65rem + 1.40vw, 2.67rem);
--step-4:  clamp(2.44rem, 1.95rem + 2.40vw, 3.55rem);
--step-5:  clamp(3.05rem, 2.25rem + 4.00vw, 4.74rem);  /* display */
```

Use 6 to 8 steps. If you need a size not on the scale, the scale is wrong or the design is.

## Line height and measure

- Body: line height 1.5 to 1.7. Measure 60 to 75 characters (`max-width: 65ch`).
- Headings: line height 1.05 to 1.2. The bigger the size, the tighter.
- Display (over 56px): line height 0.95 to 1.05, and letter spacing slightly negative (`-0.02em` to `-0.035em`).
- Small caps and labels: letter spacing positive (`0.04em` to `0.12em`), and only on short text.

## Pairing

Two families maximum. Each must have a job.

- **Contrast pairing:** serif display + sans text (Editorial, Quiet Luxury, Warm Craft).
- **Superfamily:** one family in two weights or optical sizes (Swiss, Soft Modern).
- **Sans + mono:** grotesk text + monospace for data, labels, code (Technical Mono).

Rules:
- Never pair two similar sans serifs. It looks like a mistake.
- Never use a script or novelty face for body copy.
- Avoid "safe default" stacks for marketing sites: Inter alone, Roboto, Open Sans, Poppins, Montserrat. They are not bad fonts, they are invisible fonts. If the brand uses one, keep it and create contrast with scale and weight.
- Load only the weights in use. Two or three is typical.

## Hierarchy without noise

- Make the step from headline to body big. A 3x jump looks confident; 1.5x looks timid.
- Use weight or size, rarely both, to separate levels.
- Left-align body text and most headings. Center only short, standalone lines (a hero tagline, a single quote).
- Limit color in text to ink, a secondary grey, and the accent for links.

## Details that read as premium

- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.
- Curly quotes (“ ” ‘ ’), real apostrophes (’), a real ellipsis (…), en dash for ranges (9–5). Never use em dashes in copy.
- `font-variant-numeric: tabular-nums` for prices, tables and counters; `oldstyle-nums` inside editorial body text if the font supports it.
- Hanging punctuation on pull quotes (`hanging-punctuation: first` where supported, or a negative indent).
- Optical size axis (`font-optical-sizing: auto`) on variable fonts.
- `-webkit-font-smoothing: antialiased` on light text on dark backgrounds only.
- Links: underline with `text-underline-offset: 0.2em` and `text-decoration-thickness: 1px`, not removed.
- No faux bold or faux italic: load the real styles.

## Performance

- Self-host with `woff2`, subset where possible, `font-display: swap`.
- Preload only the display weight used above the fold.
- Set a fallback with matched metrics (`size-adjust`, `ascent-override`) to avoid layout shift.

## Audit an app's type

Apps drift: every new screen adds a size "just for this". Count before you redesign.

- **Sizes.** List every `font-size`. Pick one ratio (1.2 or 1.25 for apps, 1.333 for marketing) and keep 5 to 7 sizes, for example 13, 16, 20, 25, 32 at 1.25. Snap every odd value (12.5, 13.5, 15.5) to the nearest step. `slop-scan` flags more than 9.
- **Inks.** Three text colours, not ten greys: primary (the thing you scan for, such as the amount), secondary (still readable, such as the invoice number), muted (present but quiet, such as the date). Inside one row, rank with colour; between blocks, rank with size.
- **Weights.** Two do the work: 400 to read, 600 to scan (headings, numbers, labels). A third only for display. `slop-scan` flags more than 3.
- **Leading against size.** Line height falls as size rises: about 1.5 for body, 1.3 for subheads, 1.1 for headings.
- **Tracking at the extremes.** Large headings tighten (about -0.02em); small uppercase labels open up (about +0.06em); body text stays at 0.
- **Measure.** Cap the text, not the box: 45 to 75 characters per line, even inside a 1400px container.
- **Figures.** `font-variant-numeric: tabular-nums` on prices, totals, tables, timers and anything that updates, so columns line up and numbers don't wobble as they change.
