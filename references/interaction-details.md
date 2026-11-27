# Interaction details

The small behaviours that separate a page that looks finished from one that feels finished. None of them shows up in a screenshot, all of them show up the first time a real person uses the page. Check each one with a real browser, a real phone and a slow network (DevTools throttling).

These go with polish gate section J.

## 1. Stop double submits

A slow network plus an impatient tap sends the form twice: two sign-ups, two orders, two charges.

- Disable the submit button the moment the request starts, and show that it is working ("Saving…", a small spinner inside the button). Keep the label width steady so the button does not jump.
- Re-enable it when the request fails, with the error next to the form.
- The server must still be idempotent (an idempotency key or a unique constraint). The disabled button is courtesy, not protection.

## 2. Hit areas of at least 44 by 44 pixels

Small icons (close, remove, steppers, social links) are hard to tap. The icon can stay small; the target should not.

- Grow the target with padding, or a transparent `::before` with a negative `inset` on a `position: relative` button.
- Keep 8px or more between neighbouring targets so the grown areas do not overlap.
- Check on a phone with your thumb, not a mouse.

## 3. No theme flash on load

A dark or light preference read in JavaScript after the page renders makes the page flash the wrong theme on every refresh.

- Set the theme before first paint: a tiny inline script in `<head>` that reads the saved choice (or `prefers-color-scheme`) and sets a class or `data-theme` on `<html>`.
- Add `<meta name="color-scheme" content="light dark">` and a matching `theme-color`.
- Server-rendered sites can set the attribute from a cookie instead.

## 4. Reserve space for images

An image without a size pushes the content down when it loads (layout shift), often right as someone goes to tap a button.

- Give every image `width` and `height` attributes, or `aspect-ratio` in CSS, plus `object-fit: cover` for crops.
- Do the same for embeds, ads, maps and late-loading cards: reserve the box, fill it later.

## 5. Enter submits the form

People expect Enter to sign them in. It only works when the fields sit inside a real `<form>` with a submit button.

- Wrap inputs in `<form>` and handle `submit`, not a click on a div.
- Use `<button type="submit">` for the main action and `type="button"` for everything else inside the form.

## 6. Anchor links clear the sticky header

Jump links and in-page navigation land with the heading hidden under a sticky header.

- Add `scroll-margin-top` equal to the header height (plus a little air) on headings and section targets, or `scroll-padding-top` on `html`.
- Check every `#anchor` link on the page, including the ones from other pages.

## 7. Validate when the person leaves the field

Shouting "invalid email" after the first letter is rude.

- Validate on `blur` (and on submit), not on every keystroke.
- Once a field has shown an error, re-check it as they type so the error clears the moment it is fixed.
- Use the right input types and `autocomplete` values so the phone keyboard and autofill help.

## 8. Every state has a screen

A spinner that never ends tells the person nothing. Design the state for each case, not only the happy path.

- Loading (with a time limit), empty, error with a way to retry, offline, partial results, success.
- Offline or failed requests say so in plain words and offer "Try again". Keep what the person typed.
- Skeletons only where the layout is known; never a spinner that hides a failure.

## 9. Toasts pause while hovered or focused

A message that disappears while someone is reading it, or reaching for its Undo button, is a broken message.

- Pause the timer on hover and on keyboard focus, resume on leave.
- Give toasts with an action (Undo) more time, and keep errors until dismissed.
- Announce them with `role="status"` (or `alert` for errors) so screen readers hear them.

## 10. Design the share preview

When a link is shared in a chat or on social, the preview is the first impression.

- Write `og:title`, `og:description`, `og:url` and a designed 1200 by 630 `og:image` per page type, plus `twitter:card` = `summary_large_image`.
- Use real screens or real photos with the brand, readable at thumbnail size.
- Test the link in a real chat app and a preview checker before launch.

## Credit

The list of ten was prompted by a short "10 niche design hacks (part 2)" video by Charles Liu. The explanations and checks here are original writing.
