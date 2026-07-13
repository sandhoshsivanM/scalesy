SCALESY — Font files
=====================

Drop your licensed Neue Montreal font files into this folder. The
@font-face rules in src/styles/global.css expect these filenames:

  NeueMontreal-Regular.woff2   (weight 400)
  NeueMontreal-Medium.woff2    (weight 500)
  NeueMontreal-Book.woff2      (weight 450 — optional; falls back to Regular)

If your files are named differently (e.g. .otf / .ttf, or "Light"/"Book"),
either rename them to match the above, or tell me the exact filenames and I
will update the @font-face `src` declarations accordingly.

Until these files are present, the site renders with a graceful fallback:
General Sans (loaded from Fontshare) → system sans-serif. Layout, spacing,
and hierarchy are unaffected — only the exact letterforms change.
