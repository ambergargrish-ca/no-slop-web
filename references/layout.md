# Layout and composition

## Grid and spacing

- Use a 12-column grid on desktop with a max content width of 1200 to 1360px, and fluid side padding (`clamp(1.25rem, 4vw, 4rem)`).
- A 4px or 8px base spacing scale, exposed as tokens: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160.
- Section padding is large and fluid: `clamp(4rem, 10vw, 9rem)` top and bottom for marketing sections.
- Space inside a group is smaller than space between groups (proximity). If everything is 24px apart, nothing is grouped.
- Align everything to something. Ragged left edges are the fastest way to look amateur.

## Rhythm

Vary sections deliberately. A classy page reads like music: dense, open, dense, very open, close.

- Alternate full-width and contained sections.
- Alternate text-led and image-led sections.
- Change the number of columns between sections (1, then 2 asymmetric, then 1, then 3 only if items really are equal).
- Not every section needs a heading, an eyebrow and a subheading. Some sections are just one image or one sentence.

## Section anatomy

Every section answers one question for the visitor. Write the question as a code comment above the section.

1. **One idea.** If the section has two ideas, split it.
2. **One focal point.** The headline, the image or the number. Not all three at equal weight.
3. **Supporting detail.** Short, specific.
4. **Optional action.** Only where the visitor is ready to act.

## Hero patterns (choose for the content, not by habit)

| Pattern | Use when |
|---|---|
| **Statement:** huge headline, left aligned, small supporting line, one action | The proposition is strong and clear in words |
| **Image-led:** full-bleed photo, small headline overlaid or beside | The place, food, product or work sells itself |
| **Product-led:** real UI cropped to the moment of value | The product is the proof |
| **Split asymmetric:** 7/5 or 8/4 columns, text and image | Both words and visuals matter |
| **Index:** list of work or offerings as the hero itself | Portfolios, menus, studios |
| **Demo:** an interactive or live element | The experience is the pitch (an order flow, a calculator) |

Avoid by default: the centered headline + subline + two buttons + floating tilted screenshot with a glow.

## Replacing the three-card grid

When you have "features", try instead:

- **Two to four features, each with a real visual** (a cropped screenshot, a photo), alternating left and right.
- **A numbered list** (01, 02, 03) with generous type and no boxes.
- **One hero feature** large, with the others listed small beside it.
- **A table** comparing before and after.
- **A single demo** that shows all features working together.

If three equal cards really are right, remove the icons, vary the content length naturally, and make sure the cards are true peers.

## Navigation

- 3 to 6 top-level items. One primary action in the nav, visually distinct.
- Logo links home. The current page is indicated.
- On mobile: a full-screen or sheet menu with large targets, not a tiny dropdown.
- Sticky nav only if it is slim and the site is long; hide on scroll down, show on scroll up.

## Footer

Sized to the real site. Contact, key links, legal, and one closing line in the brand voice. No 6-column link farm for a small site.

## Responsive

- Design mobile with intent, not as a squashed desktop. Re-order content so the most important thing is first on a phone.
- Test at 375, 768, 1024, 1280 and 1920. Check the awkward widths (900 to 1100) where grids break.
- Touch targets at least 44 by 44px. Primary actions within thumb reach on mobile.
- No horizontal scroll at any width.

## Borders, radius, shadow

- Pick one radius from the direction and use it everywhere (buttons, inputs, cards, images). Mixed radii look accidental.
- Prefer 1px rules and space over boxes.
- One shadow level, for elements that truly float (menus, dialogs, sticky bars). Flat everything else.
