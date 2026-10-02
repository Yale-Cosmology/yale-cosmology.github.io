# Yale Cosmology Seminar

A three-page Astro site: upcoming talk, semester schedule, and speaker information. Builds to static HTML and CSS in `dist/`, with local images and no browser JavaScript.

## Start locally

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro. To validate and preview a production build:

```sh
npm run check
npm test
npm run build
npm run test:build
npm run preview
```

## Edit the content

Only three content files need routine editing:

- `content/semester.yaml`: semester label, semester-wide `organizers` list, and the complete semester schedule.
- `content/current-speaker.md`: selects the featured talk and supplies its portrait and abstract.
- `content/speakers.md`: information for invited speakers.

The Fall 2026 schedule contains the supplied speakers, affiliations, and organizers. Blank dates remain listed with speaker details to be announced; titles are pending. All listed sessions meet at 1:30 PM Eastern Time in KT 401. Amanda Macinnis is selected as the upcoming homepage talk, with the title, abstract, and headshot pending. The optional `sample: true` setting displays a sample-content notice when experimenting with example data. The speaker guide is adapted from https://yale-dsaas.github.io/speaker-guide/; its operational details have deliberately been replaced with guidance to contact the seminar host.

### Weekly update

1. Edit or add the talk in `semester.yaml`. Give it a unique lowercase ID, such as `2026-10-13-speaker-name`. Keep dates and times quoted: `date: "2026-10-13"`, `time: "15:00"`. All times refer to New Haven (Eastern Time, observing seasonal daylight saving changes). Use `""` for pending fields; they appear as “To be announced.” Affiliation is optional and is omitted when blank. The optional `organizer` field appears in the schedule; retain any co-organizer notes as ordinary text.
2. Put the headshot in `public/images/`, ideally a compressed JPEG or WebP of around 480–600 pixels. The page uses a portrait crop; preview it to ensure the face is visible.
3. Set `talkId` in `current-speaker.md` to the schedule ID and `headshot` to `images/your-photo.webp` (no leading slash). Replace the Markdown body with the abstract. Names, titles, dates, times, and locations automatically come from the schedule.
4. Preview and run the validation/build commands above. Commit and push to `main` to deploy after GitHub Pages has been configured.

The supplied `images/portrait-placeholder.svg` can be used until a headshot is available. Clear `talkId: ""` to display “Next talk to be announced.” You may also clear `headshot: ""` when no talk is selected. The abstract is hidden in this state.

Selection is **manual**: time passing does not switch or remove a talk. There is no scheduled rebuild. Change the selected ID and abstract together after each seminar. The schedule retains every listed talk, sorts dated entries chronologically, and places undated entries last. At the next semester, replace the semester label and talk list; no archive is generated.

Malformed dates/times, duplicate IDs, unmatched talk IDs, or missing referenced images stop the build with an explanatory error. Only local headshots inside `public/` are supported. Use a matching placeholder when no photograph is available.

## GitHub Pages

Repository: https://github.com/Yale-Cosmology/yale-cosmology.github.io

Website: https://yale-cosmology.github.io/

GitHub Pages is configured to publish through GitHub Actions. Push updates to `main` to publish automatically, or run **Deploy seminar website** manually from the Actions tab.

The workflow installs locked dependencies, checks the site, runs content tests, builds, and uploads `dist/`. It reads the Pages origin and base path from GitHub, so both `owner.github.io` and `owner.github.io/repository/` layouts work. For a custom domain, configure the domain in GitHub Pages before deploying. GitHub's `github-pages` environment can be configured to require deployment approval if desired.

To test a repository path locally:

```sh
SITE_URL=https://example.github.io BASE_PATH=/cosmology-seminar npm run build
BASE_PATH=/cosmology-seminar npm run preview
```

Open `/cosmology-seminar/` on the preview server. For ordinary local use, rebuild with `npm run build`. Upload the contents of `dist/` to any static host as an alternative to GitHub Pages.

## Design and boundaries

System fonts, deep blue accents, responsive layout, semantic headings/table, keyboard focus indicators, a native HTML hamburger menu on screens up to 1000px, a skip link, and image alternative text. The mobile schedule scrolls horizontally in its own keyboard-focusable region. Only the three requested pages are generated; there are no archives, individual talk pages, feeds, search, external font requests, or client-side scripts.

## Yale mark

The header uses the official logo glyph (U+F2A2) in YaleMarks (the YaleNew logo font), the same glyph used on the Yale Identity website. Its color is Yale Blue, `#00356B`. The remaining text uses the larger, readable sans-serif styling.

- Typeface guidance: https://yaleidentity.yale.edu/core-identity-elements/yale-typefaces
- Logo guidance: https://yaleidentity.yale.edu/core-identity-elements/yale-logo-and-wordmarks/yale-logo
- Web color specification: https://yaleidentity.yale.edu/guidelines/websites
- Official font source: https://yale-webfonts.yalespace.org/fonts/YaleNew/YaleNew-marks/yalemarks-webfont.woff

The font is bundled locally in `src/assets/`; visitors make no external font requests. The Yale typeface is provided for Yale-related work only and is not covered by any general license for this project's code. Retain this provenance if moving the site.
