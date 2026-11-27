# Color

Classy palettes are mostly neutral. The accent is rare, which is why it works.

## The ratio

- **60%** background neutral (paper, bone, off-white, or a deep dark).
- **30%** ink and secondary neutrals (text, rules, surfaces).
- **10%** accent: primary actions, links, one highlight per screen.

If the accent covers large areas, it stops meaning "act here".

Build it in three moves and look after each one:

1. **Set the mood with the 60.** The background alone should already say something: cream paper for an indie venue, raw clay for a pottery studio, petrol blue for an evening event.
2. **Add the 30 for character.** One strong secondary carries the type, imagery or large blocks: riso teal on cream, iron brown on clay, ivory on petrol. Two colours often look tasteful but dull.
3. **Spend the 10 on one thing.** A single loud accent placed on the hero subject or the main action (fluorescent pink, turquoise glaze, saffron gold) is what makes people look. One element, not sprinkled everywhere.

Tint photography and illustration into the palette (duotone in the 30 colour, accent on the subject) so images belong to the page instead of fighting it.

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
- Elevation in dark mode comes from lighter surfaces, not shadows. Page darkest, then card, input, menu and dialog, each a step lighter (closer to the viewer means lighter).
- A card the same colour as the page reads flat; lift it a step instead of adding a border.
- Borders: swap white or light borders for a grey one step above the surface (or white at a low alpha). A bright border on dark shouts louder than the content.
- Hierarchy: dim captions and meta text further than in light mode; titles carry the contrast, captions sit back (still AA).
- A bright brand accent on dark glows like a beacon: lower its chroma and lift its lightness, and drop any coloured glow.
- Dark does not have to mean grey: a warm, plum or green tinted ramp works if the same elevation steps hold.
- Respect `prefers-color-scheme`, and if there is a toggle, remember the choice.

## Checks

- Every text and background pair passes WCAG AA. UI components and focus rings pass 3:1.
- Grayscale screenshot test: hierarchy still works with color removed.
- Count accents on each screen. More than one emphasised element per viewport usually means none is.
