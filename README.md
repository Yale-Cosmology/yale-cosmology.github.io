# Yale Cosmology Seminar website

A small static site for the Yale Physics × Astronomy Cosmology Seminar, built with [Astro](https://astro.build). Three pages: the upcoming talk, the semester schedule, and directions to Kline Tower. No JavaScript is shipped to visitors; everything is plain HTML and CSS.

## Everyday editing

You only ever need to touch files in `src/content/` and `src/site.config.ts`.

### Add a talk

Create one Markdown file per talk in `src/content/talks/`. Name it `YYYY-MM-DD-lastname.md`; the file name becomes the talk's URL.

```markdown
---
speaker: Jane Doe
affiliation: Princeton University
date: 2027-02-09
host: Isa
title: Cosmic shear with Rubin year one
photo: ../../assets/speakers/doe.jpg
---

The abstract goes here, in Markdown. Blank lines separate paragraphs.
```

| Field | Required | Notes |
|---|---|---|
| `speaker` | yes | Use "A & B" for two speakers. |
| `affiliation` | yes | |
| `date` | yes | `YYYY-MM-DD`. Two separate talks on the same date are fine: make one file per talk and set `order: 1` and `order: 2`. The front page shows both. For a joint talk, use one file with `speaker: A & B`. |
| `title` | no | Omit until announced; the site shows "To be announced". |
| `host` | no | Internal note of who is hosting. Not shown on the site. |
| `photo` | no | Put the image in `src/assets/speakers/` and reference it as `../../assets/speakers/file.jpg`. Square-ish portraits work best; the site crops to a square. Resize to about 600 × 600 px first (`sips -Z 600 file.jpg` on a Mac) to keep the repository small. |
| `photoAlt` | no | Alt text for the photo, if it should not read "Portrait of" plus the speaker field. |
| `time`, `room` | no | Only if the talk differs from the series default. |
| `slides` | no | A URL, shown after the abstract. |
| `draft` | no | `true` hides the talk without deleting the file. |

The abstract is the Markdown body under the frontmatter. Leave it empty until you have one. Subscripts such as H<sub>0</sub> can be written with HTML `<sub>0</sub>` tags.

The front page automatically shows the first talk whose date is today or later, and the schedule greys out past talks. There is nothing to update week to week.

### Change the semester, room, time, or organizers

Edit `src/site.config.ts`. It holds the semester label, the default weekday/time/room, the organizer list shown in the footer, the funding line, and the department address.

### Edit the directions or speaker guide pages

Edit `src/content/pages/visit.md` or `src/content/pages/speakers.md`. Both are ordinary Markdown. The parking map on the Visit page draws its lines and lots from `src/data/parking.ts`.

### New semester

Set `semester` in `src/site.config.ts`, then add the new talk files. Old talks can stay; they are listed in grey below the current ones. If you prefer a clean schedule, move old files into `src/content/talks/archive/` and they will still be included, or delete them.

## Running locally

```bash
npm install
npm run dev
```

Open <http://localhost:4330>. Edits to content files refresh the page instantly. (The port is fixed in `astro.config.mjs` so it never collides with other local sites.)

```bash
npm run build
```

writes the finished static site to `dist/`. `npm run preview` serves that folder so you can check it.

## Deploying to GitHub Pages

The site lives in the [Yale-Cosmology/yale-cosmology.github.io](https://github.com/Yale-Cosmology/yale-cosmology.github.io) repository and is published at <https://yale-cosmology.github.io/>.

Every push to `main` rebuilds and publishes the site through the workflow in `.github/workflows/deploy.yml`. The workflow also rebuilds every Wednesday morning so the "next talk" rolls over after each Tuesday seminar with no commit needed. The repository's **Settings → Pages → Source** must be set to **GitHub Actions** (it is).

For a custom domain, change `site` in `astro.config.mjs` and add a `CNAME` file in `public/`.

## Layout of the code

```
src/
  site.config.ts        series settings, hosts, address, date helpers
  content.config.ts     schema for talk files (validated on every build)
  content/talks/        one Markdown file per talk
  content/pages/        visit.md
  assets/speakers/      portrait images
  layouts/Base.astro    <head>, fonts, header and footer
  components/           Header, Footer, TalkCard, RingMotif (masthead line art)
  pages/                index (upcoming), schedule, visit, talks/[slug]
  styles/global.css     colours, type, shared utilities
```

Typography is Source Serif 4 and Source Sans 3, self-hosted from npm (`@fontsource-variable/*`), so the site has no third-party requests.
