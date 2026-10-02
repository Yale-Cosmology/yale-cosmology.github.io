import { test } from "node:test";
import assert from "node:assert/strict";
import { resolve } from "node:path";
import {
  validateContent,
  formatDate,
  formatTime,
} from "../src/lib/content.mjs";
const publicDir = resolve("public");
const data = () => ({
  semester: "Test semester",
  talks: [
    {
      id: "later",
      speaker: "Later Speaker",
      date: "2026-11-03",
      time: "15:30",
    },
    {
      id: "earlier",
      speaker: "Earlier Speaker",
      date: "2026-10-13",
      time: "12:00",
    },
    { id: "pending" },
  ],
});
const selected = (id) => ({
  talkId: id,
  headshot: "images/portrait-placeholder.svg",
});
const validate = (d = data(), f = selected("earlier")) =>
  validateContent(d, f, publicDir);
test("chronological schedule and pending fields", () => {
  const result = validate();
  assert.deepEqual(
    result.talks.map((t) => t.id),
    ["earlier", "later", "pending"],
  );
  assert.equal(result.talks[2].title, "");
  assert.equal(result.current.speaker, "Earlier Speaker");
});
test("switching and clearing the selected talk", () => {
  assert.equal(
    validate(data(), selected("later")).current.speaker,
    "Later Speaker",
  );
  assert.equal(
    validate(data(), { talkId: "", headshot: "" }).current,
    undefined,
  );
  assert.equal(validate({ semester: "Empty", talks: [] }, {}).talks.length, 0);
});
test("duplicates and missing references fail clearly", () => {
  const d = data();
  d.talks.push(d.talks[0]);
  assert.throws(() => validate(d), /Duplicate talk ID/);
  assert.throws(
    () => validate(data(), selected("unknown")),
    /not in semester.yaml/,
  );
});
test("invalid calendar dates and time formats fail", () => {
  for (const date of ["2026-02-30", "2026-13-01", "2026-2-01", "not-a-date"]) {
    const d = data();
    d.talks[0].date = date;
    assert.throws(() => validate(d), /invalid date/);
  }
  for (const time of ["24:00", "12:60", "3:00", "3 PM"]) {
    const d = data();
    d.talks[0].time = time;
    assert.throws(() => validate(d), /invalid time/);
  }
  const d = data();
  d.talks[0].date = "2028-02-29";
  assert.doesNotThrow(() => validate(d));
});
test("missing, remote, and escaping image paths fail", () => {
  assert.throws(
    () => validate(data(), { talkId: "earlier" }),
    /headshot is required/,
  );
  assert.throws(
    () =>
      validate(data(), { talkId: "earlier", headshot: "images/missing.jpg" }),
    /Headshot not found/,
  );
  for (const headshot of [
    "../private.jpg",
    "/images/test.jpg",
    "https://example.com/photo.jpg",
  ]) {
    assert.throws(
      () => validate(data(), { talkId: "earlier", headshot }),
      /local image|Headshot not found/,
    );
  }
});
test("formatting preserves local calendar date and handles noon/midnight", () => {
  assert.equal(formatDate("2026-10-13"), "Tue, October 13, 2026");
  assert.equal(formatTime("00:00"), "12:00 AM");
  assert.equal(formatTime("12:00"), "12:00 PM");
  assert.equal(formatTime("15:30"), "3:30 PM");
  assert.equal(formatDate(""), "To be announced");
});
