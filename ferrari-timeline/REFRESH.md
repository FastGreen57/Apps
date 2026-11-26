# Monthly value refresh: Ferrari Timeline

`values.json` holds the market value shown on each car's card. The page loads it at startup,
so updating this one file updates the live app at https://fastgreen57.github.io/Apps/ferrari-timeline/.
Do not edit `index.html` for a value refresh.

## Format

```json
{"asOf": "YYYY-MM-DD", "values": { "<model name exactly as in index.html>": {
  "v": 2581748,            // number in USD, or null when there is no usable figure
  "kind": "market",        // market | sale | est | new | none
  "src": "CLASSIC.COM market benchmark",
  "url": "https://www.classic.com/m/ferrari/f40/",
  "lo": 1100000, "hi": 4000000,   // optional range across variants or estimate
  "note": "optional short sentence",
  "label": "optional text shown instead of a value when v is null"
}}}
```

Keep all 100 keys. Never rename or drop a key.

## Where the numbers come from

1. **CLASSIC.COM market benchmark (CMB)** is the default for anything with a used market
   (`kind: "market"`). Each entry's `url` is the CLASSIC.COM page it came from; many are
   family pages (for example `/m/ferrari/250/`, `/m/ferrari/testarossa/`, `/m/ferrari/america/`)
   that list several sub-models with their CMB, so fetch each family page once and read all
   the models on it. Use the sub-model named in the note when there are variants (for example
   manual vs F1, Series I vs II), and keep `lo`/`hi` as the spread across those variants.
2. **Last public sale** (`kind: "sale"`) for cars with no CMB. Use a named auction
   (RM Sotheby's, Gooding Christie's, Bonhams, Broad Arrow, Mecum) and say which and when in
   `src`/`note`. Update it only if there has been a newer public sale.
3. **Auction estimate** (`kind: "est"`) when only an unsold estimate exists.
4. **New-car price** (`kind: "new"`) for current models without a resale market. Switch
   them to `market` once CLASSIC.COM shows a CMB.
5. Cars marked `kind: "none"` (125 S, 330 P4, Sergio, J50, 166 Inter, 195 Inter) stay as they
   are unless a public sale appears.

## Rules

- Only change a number when a source you actually read this run shows a different one. If a
  page fails to load, keep the old value.
- Sanity-check any change over 40% month-on-month against a second source before saving, and
  skip one-off specials (for example the $26M charity Daytona SP3 "Tailor Made") as a model value.
- Set `asOf` to today's date.
- Commit only `values.json` with a message like `Refresh Ferrari values (Dec 2026)` and push to `main`.
  GitHub Pages republishes automatically within a few minutes.
