# Color

Classy palettes are mostly neutral. The accent is rare, which is why it works.

## The ratio

- **60%** background neutral (paper, bone, off-white, or a deep dark).
- **30%** ink and secondary neutrals (text, rules, surfaces).
- **10%** accent: primary actions, links, one highlight per screen.

If the accent covers large areas, it stops meaning "act here".

## Neutrals with temperature

Pure grey looks cheap. Tint every neutral toward one hue.

- Warm: paper `#f7f4ee`, ink `#1b1a17`, grey `#77736b`.
- Cool: paper `#f6f7f9`, ink `#14171c`, grey `#6b7280` shifted toward blue.
- Build 8 to 10 steps from one hue in OKLCH so lightness steps feel even:

```css
--neutral-50:  oklch(98% 0.005 80);
--neutral-100: oklch(95% 0.007 80);
--neutral-200: oklch(90% 0.009 80);
--neutral-300: oklch(82% 0.010 80);
--neutral-500: oklch(60% 0.012 80);
--neutral-700: oklch(38% 0.012 80);
--neutral-900: oklch(20% 0.010 80);
```

## Choosing the accent

1. Start from the business, not from tech: a bakery is not violet, a law firm is not neon.
2. Avoid the generated defaults: violet `#7c3aed` / `#8b5cf6`, indigo `#6366f1`, the purple to blue gradient.
3. Pick one hue; derive a hover (darker 8 to 10% lightness) and a tint (very light, for surfaces and selected states).
4. Check accent text contrast on the background (4.5:1). If it fails, use the accent for fills with white or ink text instead.

## Semantic colors

Success, warning, danger and info are separate from the brand accent. Desaturate them so they sit in the palette, and never rely on color alone (add an icon or text).

## Gradients

Allowed only when:
- the brand owns one, or
- it is subtle and functional (a 2 to 4% lightness shift that adds depth to a surface), or
- it is a real photographic or atmospheric effect.

Never: gradient headline text, purple to blue hero backgrounds, rainbow borders, glow halos.

## Dark mode

- Not inverted: build a separate neutral ramp. Background around `oklch(16% 0.01 hue)`, not `#000`.
- Text is off-white (`oklch(93% 0.01 hue)`), not `#fff`.
- Reduce accent saturation slightly so it does not vibrate.
- Elevation in dark mode comes from lighter surfaces, not shadows.
- Respect `prefers-color-scheme`, and if there is a toggle, remember the choice.

## Checks

- Every text and background pair passes WCAG AA. UI components and focus rings pass 3:1.
- Grayscale screenshot test: hierarchy still works with color removed.
- Count accents on each screen. More than one emphasised element per viewport usually means none is.
