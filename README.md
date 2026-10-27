# GymPT

An original, mobile-first weekly training planner and local workout companion. This is a standalone trial app. It does not migrate or connect to any existing training application.

## Run

Requires Node 20 or later, no packages or downloads.

```sh
node server.mjs
node --test
```

Open http://127.0.0.1:4173. The local server only serves explicitly allowed public app files. For production, serve the static application files on HTTPS after hosting approval. No hosting configuration or cloud service has been created.

## What works

- Today, Plan, Train, Progress and Equipment screens with a responsive bottom navigation on small screens.
- A seven-day prescription: three full-body strength sessions, intervals, and recovery. Six selectable weeks retain anchor lifts, alternate accessories and interval formats, and reduce volume in week 4.
- Move/swap days without regenerating the week; warn for adjacent strength days. Exercise exclusions and available equipment filter new plans. Missing movements are flagged for review.
- Previous vs prescribed vs actual set logging, adjustable prescribed reps, actual loads/reps/RIR, and explained double progression based on completed sets. Starting load overrides can be entered before each session.
- Immediate local saves, resumed sessions, timestamp-based rest and interval timers with pause/resume and background recovery.
- Progress journal, JSON export, strict validated import with replacement confirmation, and corrupt-data recovery export.
- Original two-pose SVG movement schematics, favicon, 180px Apple touch icon, and 192px/512px manifest icons. No competitor assets or branding.

## Privacy

The separate browser key is `gympt.private.v1`. Source includes only generic program templates and synthetic tests; there is no seeded workout history. No analytics, remote fonts, requests to a backend, or account system. Export files contain private data: keep them out of version control. `.gitignore` excludes the private/export folders and `*.gympt.json` backups. Browser storage is device-local and not encrypted; backups are important. The app is served under its own origin when deployed; do not share an origin with untrusted applications.

## Programming limits

This is an editable generic template, not a validated personal programme or medical assessment. Load increments are a user-confirmed global total external kg increment, not a full inventory optimizer. Bodyweight is recorded as 0 external kg. Available dumbbells, TRX and rower are demo selections; no personal equipment capabilities are asserted. Barbell and multi-gym inventory can be recorded but their movements are not prescribed until attachments and choices are defined. Restriction notes do not automatically alter a programme: use explicit exercise exclusions and review balance. Goals are descriptive; no physique outcome is guaranteed.

The initial library contains nine original exercise-specific schematics and concise cues, not professional coaching videos. The template is intentionally small; adding a broader validated exercise library and per-equipment increments is follow-up work. No off-tab audible notification, service worker, offline installation guarantee, wearable integration, or secure cloud sync is claimed. Timers recover elapsed time after returning even when a browser suspends execution.

## Project files

`core.mjs`: deterministic planning, progression, timer math, import validation.
`app.mjs`: UI, durable local storage and event handling.
`style.css`: responsive visual system.
`core.test.mjs`: Node built-in tests.
`make-icons.mjs`: dependency-free original PNG icon generator.

All visuals and source were created for this project. No personal inputs, health records, photos or nutrition records belong in this repository.
