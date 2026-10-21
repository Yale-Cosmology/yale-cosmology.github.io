# Seminar flyer

A one-page letter-size flyer for each talk, rendered from HTML with headless Chrome. Only the templates, images, and build script are tracked in git; the PDFs are build output.

- `flyer.html` — the template, set in New Computer Modern (LaTeX look) from your TeX Live install. Edit the speaker, affiliation, date, time, room, title, abstract, and photo in the clearly marked sections.
- `flyer-yale-fonts.html` — the same layout set in Yale 2024 and Proxima Nova, for print use within Yale.
- `speaker.jpg` — the portrait referenced by both templates. Replace it for each speaker, keeping it around 100 KB (see the main README).
- `qr.svg` — styled QR code for https://yale-cosmology.github.io, shown in the footer. Error-correction level H, so the centre motif is safe; if the address ever changes, regenerate it from a plain QR matrix rather than editing by hand.
- `build.sh` — renders a template to PDF.

Build the flyer:

```bash
./build.sh
```

That writes `Cosmology Seminar Flyer.pdf` next to the templates. To render another template, pass it and an output name:

```bash
./build.sh flyer-yale-fonts.html "Cosmology Seminar Flyer (Yale fonts).pdf"
```

If the abstract is long and the script warns that the flyer spills onto a second page, reduce the abstract font size in the `<style>` block a little.
