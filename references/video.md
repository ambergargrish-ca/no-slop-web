# Launch video format (product and promo videos)

Use for every short product video: launches, feature announcements, restaurant reels, ads. A plain screen recording with a voiceover is the thing to avoid. This format turns the real product into a short, designed piece people want to watch to the end.

## Shape (9:16, 15 to 25 seconds, 30 fps, 1080 x 1920)

1. **Hook (0 to 3 s).** One short line, arriving word by word, one key word in the brand colour. Lead with contrast or a problem the viewer has ("Stop using a screen recording for your launch"). The product is already on screen below it.
2. **Show the real product (3 to 12 s).** Real app screens in a floating phone or card frame, never a drawn fake UI. One beat per step, each with its own two-to-five-word caption that changes with the step ("add your app link", "or screenshots", "drop in your logo", "tell it what you're launching"). A cursor or tap shows each action.
3. **The turn (about 12 s).** Show the before and after: the raw version crossed out next to the clean result, then the clean result takes the whole frame.
4. **Brand card.** The name big in the brand colour, one line on what it does, a call-to-action button that gets tapped (press scale plus a ring).
5. **Feature payoff.** One or two scenes with a headline ("See every class, live.") over the real screen, rebuilt clean, with its elements arriving in sequence.
6. **End.** A short burst of brand-colour confetti behind the name, then the logo and the address or link.

## Captions

- Word by word: each word rises about 14 px and fades in over 0.2 s, about 0.13 s apart.
- One coloured word per line: the one that matters (marked by the writer, else the strongest of the last three words).
- Heavy display face, centred near the top, never over a busy part of the picture.
- Captions say what the voiceover says, in sync. They carry the video on mute (most people watch muted).

## Voiceover

Short, conversational, one sentence per beat, in step with the captions. Record it or generate it after the captions are locked, then time the beats to the voice.

## House rules (Platepoint and the -point products)

- Real screens and real data only; demo data clearly a demo. No invented customers, reviews or numbers.
- Brand colours on a flat cream ground with a subtle grain. Leave out the soft glowing blobs common in these ads (they break the design rules).
- Motion eases out with no overshoot. Confetti is the one celebratory moment, at the end only.
- No em dashes in captions or copy.
- Fonts: Bricolage Grotesque for captions and the name, Geist for lines and buttons.

## Where it is built

- Restaurant reels: `public/social.js` (`reelFrame`), drawn on canvas and recorded in the browser; each dish photo gets its dish name as its caption.
- Platepoint's own launch and feature videos: capture real screens from the app (headless Chrome), then lay them out in this shape.

Credit: format taken from an OpenArt "Launch Video" ad (Nov 2026), adapted to the house rules.
