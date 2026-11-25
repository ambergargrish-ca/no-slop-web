# Accessibility (WCAG 2.2 AA)

Accessible sites are better designed sites: clearer hierarchy, stronger contrast, honest structure. Build to this from the first line. It is also the legal baseline in many places (for example the ADA in the US, the AODA in Ontario, the European Accessibility Act).

## Structure

- One `<h1>` per page. Headings in order, never skipped for styling.
- Landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`, and `<section>` with a heading.
- A "Skip to content" link as the first focusable element.
- `<html lang="...">` set correctly.
- Real elements: `<button>` for actions, `<a href>` for navigation. No clickable `<div>`.

## Color and contrast

- Body text 4.5:1. Large text (24px, or 18.66px bold) 3:1.
- UI components, icons and focus indicators 3:1 against neighbours.
- Never rely on color alone (errors need text or an icon too; links in body text need an underline).

## Keyboard and focus

- Everything works with a keyboard alone, in a logical order.
- Visible focus on every interactive element using `:focus-visible`, at least 2px, 3:1 contrast. Never `outline: none` without a replacement.
- Focus is trapped inside open dialogs and returns to the trigger on close. Escape closes.
- Focused elements are not hidden behind sticky headers (`scroll-padding-top`).

## Forms

- Every input has a visible `<label>`. Placeholders are hints, not labels.
- Correct `type` and `autocomplete` attributes (email, tel, name, address).
- Errors are announced (`aria-live` or `aria-describedby`), described in text, and next to the field.
- Do not clear the form on error.

## Media and motion

- Meaningful images have alt text; decorative images have `alt=""`.
- Video has captions; autoplay is muted, short, and pausable.
- Respect `prefers-reduced-motion`. Anything moving over 5 seconds can be paused.
- No content that flashes more than 3 times per second.

## Targets and zoom

- Targets at least 24 by 24px (WCAG 2.2 minimum), 44 by 44px recommended on touch.
- Page works at 200% zoom and at 320px width without horizontal scroll.
- Never disable zoom (`user-scalable=no`).

## ARIA

- No ARIA is better than wrong ARIA. Use native elements first.
- Icon-only buttons have `aria-label`. Decorative SVGs have `aria-hidden="true"`.
- Use `aria-expanded`, `aria-controls` and `aria-current` for menus, accordions and the current nav item.

## Checks before shipping

1. Tab through the whole page. Can you reach and use everything? Can you always see where you are?
2. Run axe DevTools or Lighthouse accessibility. Fix every issue.
3. Zoom to 200%. Shrink to 320px.
4. Turn on reduced motion in the OS. Reload.
5. Try a screen reader on the main flow (VoiceOver on Mac or iOS, NVDA on Windows).
