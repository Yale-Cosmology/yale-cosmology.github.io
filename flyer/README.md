# Seminar flyer

A one-page letter-size flyer for each talk, rendered from HTML with headless Chrome.

- `flyer.html` — the template, set in New Computer Modern (LaTeX look) from your TeX Live install. Edit the speaker, affiliation, date, room, title, abstract, and photo in the clearly marked sections.
- `flyer-yale-fonts.html` — the same layout set in Yale 2024 and Proxima Nova, for print use within Yale.
- `speaker.jpg` — the portrait referenced by both templates. Replace it for each speaker.
- `qr.svg` — styled QR code for https://yale-cosmology.github.io, shown in the footer. Error-correction level H, so the centre motif is safe; if the address ever changes, regenerate it from a plain QR matrix rather than editing by hand.
- `Cosmology Seminar Flyer.pdf` — the latest render.

Regenerate the PDF with:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="$PWD/Cosmology Seminar Flyer.pdf" "file://$PWD/flyer.html"
```

If the abstract is long and the footer spills onto a second page, reduce the abstract font size in the `<style>` block a little.
