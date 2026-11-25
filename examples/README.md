# Examples

The same restaurant landing page, twice.

- `sloppy/` contains everything the slop catalogue warns about, on purpose. Scanner score: 0.
- `clean/` applies the Warm Craft direction using the tokens in `templates/tokens.css`. Scanner score: 100. The hero photo is a placeholder path: drop in a real photo to see the full layout.

```bash
node ../scripts/slop-scan.mjs sloppy
node ../scripts/slop-scan.mjs clean
```
