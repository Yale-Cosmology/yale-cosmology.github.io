import { existsSync, readFileSync } from "node:fs";
import { resolve, sep } from "node:path";
import { parse } from "yaml";

const pending = "To be announced";
function fail(message) {
  throw new Error(`[Seminar content] ${message}`);
}
function text(value, field, required = false) {
  if (value === undefined || value === null) value = "";
  if (typeof value !== "string")
    fail(`${field} must be text. Quote dates and times in YAML.`);
  value = value.trim();
  if (required && !value) fail(`${field} is required.`);
  return value;
}
/**
 * @typedef {{ id: string, speaker: string, affiliation: string, organizer: string, title: string, date: string, time: string, location: string }} Talk
 */
/** @returns {{ semester: string, organizers: string[], sample: boolean, talks: Talk[], current: Talk | undefined, headshot: string }} */
export function validateContent(data, featured, publicDir) {
  if (!data || typeof data !== "object")
    fail("semester.yaml must contain a semester and talks list.");
  const semester = text(data.semester, "semester", true);
  if (data.organizers !== undefined && !Array.isArray(data.organizers))
    fail("organizers must be a list of names.");
  const organizers = (data.organizers ?? []).map((name, index) =>
    text(name, `organizers: name ${index + 1}`, true),
  );
  if (data.sample !== undefined && typeof data.sample !== "boolean")
    fail("sample must be true or false.");
  if (!Array.isArray(data.talks)) fail("talks must be a list.");
  const ids = new Set();
  const talks = data.talks
    .map((entry, index) => {
      if (!entry || typeof entry !== "object")
        fail(`Talk ${index + 1} must be a record.`);
      const id = text(entry.id, `Talk ${index + 1}: id`, true);
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id))
        fail(
          `Invalid talk ID "${id}"; use lowercase words separated by hyphens.`,
        );
      if (ids.has(id)) fail(`Duplicate talk ID "${id}".`);
      ids.add(id);
      const talk = { id };
      for (const field of [
        "speaker",
        "affiliation",
        "organizer",
        "title",
        "date",
        "time",
        "location",
      ]) {
        talk[field] = text(entry[field], `${id}: ${field}`);
      }
      if (talk.date) {
        const parsed = new Date(`${talk.date}T12:00:00Z`);
        if (
          !/^\d{4}-\d{2}-\d{2}$/.test(talk.date) ||
          !Number.isFinite(parsed.getTime()) ||
          parsed.toISOString().slice(0, 10) !== talk.date
        )
          fail(`${id}: invalid date "${talk.date}"; use YYYY-MM-DD or "".`);
      }
      if (talk.time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(talk.time))
        fail(`${id}: invalid time "${talk.time}"; use 24-hour HH:MM or "".`);
      return talk;
    })
    .sort(
      (a, b) =>
        (a.date || "9999").localeCompare(b.date || "9999") ||
        a.time.localeCompare(b.time),
    );
  const talkId = text(featured?.talkId, "current-speaker.md: talkId");
  const current = talkId ? talks.find((talk) => talk.id === talkId) : undefined;
  if (talkId && !current)
    fail(`current-speaker.md: talkId "${talkId}" is not in semester.yaml.`);
  const headshot = text(featured?.headshot, "current-speaker.md: headshot");
  if (current && !headshot)
    fail(
      "current-speaker.md: headshot is required when a talk is selected. Use the supplied placeholder if needed.",
    );
  if (headshot) {
    const root = resolve(publicDir);
    const image = resolve(root, headshot);
    if (
      headshot.startsWith("/") ||
      !image.startsWith(root + sep) ||
      !/\.(png|jpe?g|webp|avif|svg)$/i.test(headshot)
    )
      fail("headshot must be a local image path relative to public/.");
    if (!existsSync(image)) fail(`Headshot not found: public/${headshot}`);
  }
  return { semester, organizers, sample: data.sample === true, talks, current, headshot };
}
export function loadContent(featured) {
  const root = process.cwd();
  let data;
  try {
    data = parse(readFileSync(resolve(root, "content/semester.yaml"), "utf8"));
  } catch (error) {
    fail(`Cannot read semester.yaml: ${error.message}`);
  }
  return validateContent(data, featured, resolve(root, "public"));
}
export const display = (value) => value || pending;
export function formatDate(date) {
  return date
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(`${date}T12:00:00Z`))
    : pending;
}
export function formatTime(time) {
  if (!time) return pending;
  const [hour, minute] = time.split(":").map(Number);
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour < 12 ? "AM" : "PM"}`;
}
