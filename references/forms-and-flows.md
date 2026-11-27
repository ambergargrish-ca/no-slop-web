# Forms and flows

The text input is the most used control on the web, and a search or booking flow is where people decide to stay or leave. Both are easy to get almost right.

## The text input

1. **Label outside, always visible.** A placeholder is a hint, not a label: it disappears the moment someone types, and then nobody knows what the field was. Use `<label for>` above the field; the placeholder can show an example (`name@example.com`).
2. **44px tall, 16px text.** A comfortable target, and no iOS zoom on focus (mobile-details 1).
3. **A real focus ring.** A 2px outline in the accent colour with a 2px offset (`outline: 2px solid var(--accent); outline-offset: 2px`). A slightly darker border or a faint shadow is easy to miss.
4. **A border you can see at rest.** The resting border needs 3:1 contrast against the field and its background (WCAG 1.4.11). Pale grey borders (around 1.5 to 2:1) make empty fields invisible.
5. **Errors after blur.** Check when the person leaves the field, link the message with `aria-describedby`, mark the field `aria-invalid="true"`, and clear the error as soon as the value is fixed (interaction-details 7).
6. **Right type, right autocomplete.** `type="email"` with `autocomplete="email"`, `type="tel"` with `autocomplete="tel"`, `autocomplete="one-time-code"` for codes (mobile-details 3, 5). Autofill does half the work.

## Search and booking flows on a phone

Five decisions sit behind a good mobile search (places, tables, appointments, products):

1. **One task per screen.** On a phone, tapping the search opens a full-screen sheet with nothing else on it. The page behind stays where it was.
2. **One question at a time.** Where, then when, then who. Each answered step folds to one line ("When · Fri, 7:30 pm") that can be tapped to change.
3. **The count lives on the button.** The primary button shows the live result count as filters change ("Show 9 places", "Show 3 restaurants"), so people see what is left before they commit and never hit a dead end.
4. **Keep the thumb low.** Primary actions and the map/list switch sit in the bottom third. One floating pill switches between map and list.
5. **Fill the empty state.** Before typing: recent searches (one tap repeats the whole search, dates and party included), "Near me", and a few nearby picks. Zero keystrokes for a returning visitor.

## Pricing tables

Three identical cards with a badge on each, twelve repeated ticks and three gradient buttons is the generated pricing page.

1. **One tier gets the highlight.** Lift it slightly (a step forward, a stronger border); the others stay quiet. It anchors the choice.
2. **One badge, or none.** "Most popular" on one card only. A badge on every card is a badge on none.
3. **List what changes, not what repeats.** The higher tiers start with "Everything in Starter, plus" and list only the differences, so the comparison reads in seconds.
4. **One primary button on the page.** The highlighted tier gets the filled button with a specific label ("Start with Team"); the others are outlined ("Choose Starter", "Talk to sales").
5. **Write the saving in money.** "Save $98 a year" beats "-17%". Show the crossed-out monthly price next to the annual one, and do the arithmetic for them.

## Checks

- Every field has a visible label, a 3:1 border, a 2px focus ring and the right type and autocomplete.
- Errors appear on blur, are announced, and clear when fixed.
- On a phone, search opens as a full-screen, step-by-step sheet with a live count on the button and recent searches before typing.
- Pricing: one highlighted tier, at most one badge, differences only, one filled button, savings in money.

## Credit

Prompted by "The perfect text input", "Airbnb-style search, recreated", "Typography is a system" and "De-AI your UI: pricing" videos by designmotionhq. The guidance here is written for this skill.
