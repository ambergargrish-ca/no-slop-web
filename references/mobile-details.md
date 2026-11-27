# Mobile details

Phones and tablets are where most visitors meet a site, and where small browser defaults do the most damage. Test each of these on a real iPhone (Safari) and a real Android phone (Chrome), not only in a desktop emulator.

These go with polish gate section K.

## 1. Inputs at 16px or larger

iOS Safari zooms the whole page in when a field with text smaller than 16px gets focus, and doesn't zoom back out.

- Give inputs, selects and textareas a computed `font-size` of at least 16px on touch screens. A `@media (pointer: coarse)` rule keeps a tighter size on desktop if the design needs it.
- Never "fix" the zoom with `user-scalable=no` or `maximum-scale=1`: that blocks pinch zoom for people who need it. (Fixed kiosks and wall displays are the exception, and say so in a comment.)

## 2. Replace the grey tap flash

Mobile browsers paint a grey or blue box over anything tapped. It looks like a bug on custom buttons and cards.

- Set `-webkit-tap-highlight-color: transparent` and give every tappable element its own `:active` state (a slight darken or scale), so a tap still feels answered.
- Safari only shows `:active` when the page listens for touches; a passive `touchstart` listener on the document turns it on.

## 3. The right keyboard

- `inputmode="numeric"` for codes, PINs, card security codes and quantities (digits only, no spinner like `type="number"`).
- `inputmode="decimal"` for amounts and prices, `type="tel"` for phone numbers, `type="email"` for email (the @ key, no auto-capital), `type="url"` for links, `type="search"` for search.
- Pair with the matching `autocomplete` value (`tel`, `email`, `postal-code`, `cc-number`, `name`).

## 4. Hover only where hover exists

On a touch screen a tap triggers `:hover`, and the style sticks until the next tap somewhere else.

- Put hover-only styles inside `@media (hover: hover)` (or `(hover: hover) and (pointer: fine)`).
- Keep `:focus-visible` and `:active` outside it. Never hide information or actions behind hover.

## 5. One-time codes fill themselves

- Add `autocomplete="one-time-code"` with `inputmode="numeric"` to SMS and email code fields, so iOS and Android offer the code from the message.
- One field for the whole code, not one box per digit (boxes break paste and autofill). Accept pasted codes with spaces or dashes.
- On Android Chrome, the WebOTP API can read an SMS ending in `@yourdomain #123456`, as an extra.

## 6. Contain the scroll

Scrolling to the end of a drawer, menu or modal list carries on and scrolls the page behind it, or triggers pull-to-refresh.

- `overscroll-behavior: contain` on modals, drawers, side sheets, chat panes and long dropdowns.
- `overscroll-behavior-x: contain` on horizontal rows so a swipe doesn't trigger the browser's back gesture.
- Lock the page scroll while a modal is open, without the page jumping when the scrollbar disappears.

## 7. Email fields that behave

- `type="email"`, `autocomplete="email"`, `autocapitalize="off"`, `spellcheck="false"`.
- Trim spaces before checking; phones add one after autocomplete.

## 8. No double-tap zoom on controls

A quick second tap on a stepper, "add" button or keypad zooms the page instead of counting twice.

- `touch-action: manipulation` on buttons, links, inputs and anything tapped repeatedly. It keeps pinch zoom and removes the double-tap zoom and its delay.

## 9. Label the Enter key

`enterkeyhint` changes the label on the phone keyboard's Enter key, so people know what it will do.

- `search` on search boxes, `next` on fields that move to another field, `go` or `done` on the last field, `send` in chat and messages.
- The form still needs a real submit (see interaction-details, Enter submits the form).

## 10. Snap horizontal rows

Swipeable rows (category chips, cards, galleries) feel loose when they stop halfway through an item.

- `scroll-snap-type: x mandatory` (or `proximity` for chip rows) on the row, `scroll-snap-align: start` on items, `scroll-padding-inline` to match the page gutter.
- Show that the row scrolls: a cut-off last item or an edge fade, never a hidden scrollbar with nothing else.

## Credit

The list of ten was prompted by a short "10 niche mobile hacks" video by Charles Liu. The explanations and checks here are original writing.
