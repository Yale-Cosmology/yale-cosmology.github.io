#!/bin/sh
# Render the flyer templates to PDF with headless Chrome.
#
#   ./build.sh                  renders flyer.html → "Cosmology Seminar Flyer.pdf"
#   ./build.sh flyer-time-change.html "Cosmology Seminar Flyer (Time Change).pdf"
#
# PDFs are build output and are not tracked in git.
set -e
cd "$(dirname "$0")"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SRC="${1:-flyer.html}"
OUT="${2:-Cosmology Seminar Flyer.pdf}"

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PWD/$OUT" "file://$PWD/$SRC" 2>/dev/null

PAGES=$(pdfinfo "$OUT" 2>/dev/null | awk '/^Pages:/ {print $2}')
echo "Wrote $OUT${PAGES:+ ($PAGES page$( [ "$PAGES" = 1 ] || echo s))}"
if [ -n "$PAGES" ] && [ "$PAGES" != 1 ]; then
  echo "Warning: the flyer spills onto $PAGES pages; shorten the abstract or reduce its font size." >&2
fi
