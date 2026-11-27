# Motion details

Small, specific motions that make an interface feel physical. Every one of them answers something the person just did. Use them on marketing pages and calm customer screens; keep busy work screens (tills, kitchen displays, dashboards under load) to the quiet versions. Everything here has a reduced-motion version: an instant change or a short fade.

Numbers are starting points, tuned in slow motion. Animate only `transform` and `opacity`.

## Surfaces

**Bottom sheets follow, then snap.** While dragging, the sheet tracks the finger one to one. On release it springs to the nearest stop (closed, half, full) with a small overshoot, about 7px, settling in roughly 400ms. A flick past a threshold velocity goes to the next stop even if the distance is short.

**Tooltips grow from their arrow.** Set `transform-origin` at the arrow (or the trigger side), start at about 50 to 90% scale and 0 opacity, finish in 120 to 180ms with a slight overshoot. Exit faster, without the overshoot. After the first tooltip, the next appears with no delay until the pointer has been away for 300ms.

**Typing dots wave, they don't blink.** Three dots lift in turn, 100 to 150ms apart, in a loop of about 1s. A blink on/off reads as an error light.

**Toasts slide in and stack.** The new toast rises about 64px into place; older ones step back (scale about 0.92 to 0.96, a little dimmer) so the newest reads first. Pause on hover and focus (interaction-details 9).

## Moments

**Drops lift, then land.** A dragged file or card lifts to about 105 to 110% with a deeper shadow while held, then shrinks into the target (about 55%) as it is accepted, with a check. The motion says "it went in there".

**Burst on the win, once.** For the real peak (payment done, order placed, booking confirmed), a short burst: 12 to 20 small pieces on a gravity arc, peaking around 460ms, gone by 1s. Once per success, never on routine saves, never on staff work screens.

**Steps show the work.** When the system does several things for one request (an assistant reading data, an import, a checkout), list each step as it happens: a spinner while it runs, a tick when done, then fold the list into one line ("Worked through 3 steps") once the result arrives. The result appears paragraph by paragraph, about 70ms apart, not pasted in one block. Steps say what is happening in plain words ("Looking at your sales"), never internal names.

## Icons that morph

Change the shape, don't swap the picture. Use one SVG whose parts move.

- **Play to pause:** the triangle's points slide into two bars, about 300ms.
- **Download:** arrow, then a progress ring with the number, then a tick, about 1.2s in total; the ring shows real progress.
- **Theme toggle:** the sun's rays retract and rotate while a bite slides over the disc to make the moon, about 450 to 600ms. Reverse for the other way.
- **Search to close:** the lens circle undraws (`stroke-dashoffset`) while the handle becomes one stroke of the X, about 400ms.
- **Send:** the arrow or plane flies out in the send direction (about 400ms) and springs back in from the other side, ready for the next message.
- **Unlock:** the shackle springs up about 18px with a clear overshoot (about 30%) before settling open.

## Native feel (what phones do that web pages forget)

- **Respond on touch down.** The press state shows the instant a finger lands (0ms), not on release. On iOS Safari, `:active` only fires when the page has a touch listener; add a passive `touchstart` listener once.
- **Springs, not timers.** Things that arrive use a spring (damping about 0.8, about 1.5% overshoot) instead of a fixed duration and a dead stop. In CSS, `linear()` with spring points approximates it; JS springs if you drag.
- **Keep native momentum and rubber band.** Don't hijack scrolling or replace it with JS; don't set `overscroll-behavior: none` on the page (only on fixed screens like a kitchen display, or on inner panels with `contain`). The stretch at the edge tells people they've reached the end.
- **Interruptible.** A tap during an animation turns it around from where it is. Use CSS transitions (which reverse mid-way) rather than keyframes for open/close states, and never block input while something animates.
- **Continuous corners.** Squircle corners ramp their curve in instead of snapping from straight to round: `corner-shape: squircle` where supported (keep it off 999px pills). Nobody can name it, everybody sees it.

## Checks

- Each motion is tied to an action or state change, and the reduced-motion path was tested.
- Overshoot is small and only on things that "land"; exits are faster and plainer than entrances.
- Nothing loops on a work screen except a real progress or loading indicator.

## Credit

Prompted by "More smooth details, in slow-mo", "Icons that feel alive" and "iPhone: 6 invisible details" videos by @motion_ui_interface. The guidance and numbers here are written for this skill.
