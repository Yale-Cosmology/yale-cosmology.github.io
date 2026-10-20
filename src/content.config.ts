import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * One Markdown file per talk in src/content/talks/.
 * The file name becomes the talk's URL slug (e.g. 2026-10-20-macinnis.md → /talks/2026-10-20-macinnis/).
 * The Markdown body is the abstract.
 */
const talks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talks' }),
  schema: ({ image }) =>
    z.object({
      speaker: z.string(),
      affiliation: z.string(),
      /** Seminar date, written as YYYY-MM-DD. */
      date: z.coerce.date(),
      /** When two talks share a date, the order they are given in (1 first). */
      order: z.number().optional(),
      /** Overrides the default time from site.config.ts, e.g. "2:00 PM". */
      time: z.string().optional(),
      /** Overrides the default room, e.g. "KT 201". */
      room: z.string().optional(),
      /** Organizer's note of who is hosting. Not shown on the site. */
      host: z.string().optional(),
      /** Talk title. Leave out until announced. */
      title: z.string().optional(),
      /** Portrait, relative to this file, e.g. ../../assets/speakers/name.jpg */
      photo: image().optional(),
      /** Alt text for the photo, e.g. when a joint talk has only one speaker's portrait. */
      photoAlt: z.string().optional(),
      /** Link to slides or a recording, shown after the talk. */
      slides: z.string().url().optional(),
      /** Set to true to hide the talk from the site without deleting the file. */
      draft: z.boolean().default(false),
    }),
});

/** Free-form pages such as the Visit page. */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { talks, pages };
