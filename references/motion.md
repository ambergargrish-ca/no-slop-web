# Motion

Good motion is felt, not noticed. It explains change, confirms action and adds a moment of character in one or two places. Generated sites animate everything because it is free; classy sites animate almost nothing, very well.

## What to animate

- **Feedback:** button press, toggle, form submit, add to cart.
- **State change:** opening a menu, expanding an accordion, switching tabs, a dialog appearing.
- **Spatial continuity:** an item moving from a list into a detail view.
- **One signature moment:** a logo reveal, the hero entrance, an order confirmation. One, not ten.

## What not to animate

- Body text paragraphs fading up one by one on scroll.
- Every card staggering in as it enters the viewport.
- Parallax on everything.
- Infinite loops that cannot be paused (WCAG 2.2.2: anything moving for more than 5 seconds needs a pause control, or should run once and stop).
- Typewriter headlines, scramble text, cursor trails, magnetic buttons on a serious site.

## Durations

| Interaction | Duration |
|---|---|
| Hover, press, focus | 100 to 150ms |
| Small UI (toggle, dropdown, tooltip) | 150 to 220ms |
| Medium (dialog, drawer, accordion) | 220 to 320ms |
| Large or page transitions | 300 to 500ms |
| Ambient image crossfades (Quiet Luxury) | 600 to 900ms |

Exit faster than enter (about 70% of the enter duration).

## Easing

```css
--ease-out:    cubic-bezier(0.22, 1, 0.36, 1);     /* entering, most UI */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);     /* moving between positions */
--ease-in:     cubic-bezier(0.55, 0, 1, 0.45);     /* exiting */
```

- Never `linear` for UI movement (fine for progress and spinners).
- Springs only where the direction allows personality (Warm Craft, Bold Brutal), and keep overshoot small.

## Technique

- Animate `transform` and `opacity` only. Never animate `width`, `height`, `top` or `left` for movement.
- Small distances: elements entering move 4 to 16px, not 50px.
- Scale from 0.96 to 1, not from 0.
- Use `@starting-style` and `transition-behavior: allow-discrete` for entry animations where supported; View Transitions for page changes.
- Do not block interaction while animating.

## Reduced motion (mandatory)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Better still, design the reduced path: replace movement with a simple opacity change rather than removing feedback entirely. (This block is the one accepted use of `!important`.)

## Audit questions

1. What does this animation explain or confirm? If nothing, remove it.
2. Would the page feel broken without it? If not, it is decoration; keep at most one.
3. Does it still feel right on the tenth view? Signature moments should run once per session.
