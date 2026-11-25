# Imagery and icons

## Photography

- Real photos of the real business beat everything else. A phone photo with good light, edited consistently, beats premium stock.
- One grade across the site: same warmth, contrast and saturation. Apply it to every image.
- Crop with intent: tight on detail (hands, textures, food) or wide on place. Avoid the middle distance.
- Faces only with permission. Never photos of public figures without licence.
- If stock is unavoidable, choose unstaged, specific images (Unsplash, licensed libraries), and avoid: handshakes, high fives, people pointing at laptops, lightbulbs, chess pieces, globes, puzzle pieces.
- No AI-generated people. Generated textures or abstract backgrounds are acceptable only if they are clearly abstract and on-brand.

## Product imagery

- Show real UI at real size, cropped to the moment of value.
- No tilted 3D browser mockups with glow. A flat screenshot with a 1px border and the direction's radius looks far more confident.
- Annotate with real text, not lorem ipsum.

## Illustration

- One style, one stroke weight, one palette (from the tokens). Commission or draw it; do not mix packs.
- Avoid the "corporate Memphis" style (flat purple people with tiny heads) unless deliberately ironic.

## Icons

- One set, one weight, one size scale: Lucide, Phosphor, Heroicons, Tabler, or custom. Never mix sets.
- Stroke width consistent with the body text weight (1.5px for light type, 2px for regular).
- Icons support labels; they rarely replace them.
- Never emoji as interface icons. Never ✨ for AI.
- Decorative icons get `aria-hidden="true"`; meaningful icon buttons get an accessible name.

## Performance and format

- Serve AVIF or WebP with a JPEG fallback, using `<picture>` or a framework image component.
- Always set `width` and `height` (or `aspect-ratio`) to prevent layout shift.
- `loading="lazy"` below the fold; the hero image is eager with `fetchpriority="high"`.
- Responsive `srcset` and `sizes`.
- Meaningful `alt` text describing what matters in the image; `alt=""` for purely decorative images.

## Open Graph

Design the share image (1200 by 630) like a poster for the page: the headline, the brand, one image. It is the first impression for anyone who sees the link.
