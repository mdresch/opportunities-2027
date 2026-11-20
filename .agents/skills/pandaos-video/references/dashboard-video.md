# Dashboard video

A short video of one of the user's PandaOS dashboards: the headline figure counts up,
the charts draw themselves in, the change against the previous period lands, and the
piece closes on the dashboard's name and the time the numbers are from. Every figure
stays tied to its tile, so Refresh numbers in the video editor updates the video later.

Follow the pandaos-video SKILL.md flow (preflight, skills, upstream entry point,
PandaOS conventions). Route it as a motion-graphics piece (`general-video` when no
better workflow fits). This file adds the data rules, the design system, the fixed
opening and close, and the beat menu. Where the two disagree, this file wins.

## Hard rules

1. **Every figure is bound, never typed.** A number, chart, change label or tile title
   on screen comes from `dashboard_bind_video`, never from you. A number you type goes
   stale the next day and may simply be wrong. If a figure you want has no tile, leave
   it out; do not compute it.
2. **Read the dashboard first.** `dashboard_get` with the id lists every tile with its
   id, kind and current figure. If tiles have no results, run `dashboard_refresh` once.
   A tile marked "hidden from AI" cannot be bound: skip it and never guess its value.
3. **Ask the user nothing** once the dashboard is known. The look is Professional.
   Cinematic 3D is not available yet: never offer it, and if the user asks for it, say
   it is coming and build the Professional piece.
4. **The look is binding.** Follow the Professional rules below to the letter.
5. **No em or en dashes in any visible copy.**

## How the numbers reach the composition

1. Scaffold the project at `<project>/videos/<slug>/` as the skill says, in a NEW folder.
   An existing `videos/<slug>/` is another video, possibly of another dashboard: never
   reuse, edit or replace it. Add `-2`, `-3` to the slug until the folder is free. Only
   change an existing dashboard video when the user asks for that video by name.
2. Decide the story (see "Choosing the story"), then call `dashboard_bind_video` with
   `projectDir`, `dashboardId` and one variable per figure:

   ```json
   { "hero": { "tileId": "t_ab12", "field": "value" },
     "hero_delta": { "tileId": "t_ab12", "field": "delta" },
     "hero_label": { "tileId": "t_ab12", "field": "title" },
     "daily": { "tileId": "t_cd34", "field": "chart" } }
   ```

   Fields: `value` and `previous` give a number plus `<id>_text`, already formatted
   like the tile ("24 h", "€79,254"); `delta` and `title` give text; `chart` gives
   `{ type, columns, rows }`, the first column the label, the others numbers. Every
   video also gets `dashboard_title` and `as_of_text` ("Thursday 9 October, 10:12").
   The answer lists what each variable shows now; read it before you write the
   composition, and never add a unit or currency next to a `_text` value.
3. Declare every variable you read in `data-composition-variables` on the root
   `<html>`, with a neutral default: `0` for numbers, `""` for text, and for charts a
   `"string"` declaration with default `""`. Never put a real figure in a default.
4. Read the values ONCE, at the top of the composition script, before you build any
   tween: `const v = window.__hyperframes.getVariables()`. Build counters, text and
   charts from `v`. Do not read them again inside an animation callback: the preview
   and the export must start from the same values.
5. Counters tween from 0 to the number and display the matching `_text` once they
   settle, so the last frame shows the tile's own formatting.
6. Charts are drawn by your own code from `v.<id>.rows` (SVG or DOM bars, lines, a
   donut), sized from the data. Never hard-code a bar height or a point.
7. Never write `dashboard-data.json` or `dashboard-link.json` yourself; PandaOS owns
   them. A call adds to what is bound; to drop a variable, call again with the full set
   and `replace: true`.
8. When you render yourself, pass the numbers: `npx hyperframes render --quality draft
   --variables-file dashboard-data.json --output renders/<slug>.mp4`. The editor's
   Export button does this on its own.
9. `npx hyperframes snapshot` cannot take the data file, so its frames show your
   placeholder defaults. To look at frames with the real numbers, render a draft with
   `--variables-file` as above and pull stills from it with ffmpeg
   (`ffmpeg -ss 3.6 -i renders/<slug>.mp4 -frames:v 1 snaps/hero.png`).

## Style: Professional

For a board meeting, an investor update, a weekly report. Calm, exact, every frame
could be a slide.

- **Banned:** WebGL, Three.js, canvas scenes, particles, 3D transforms, rotation,
  blur, glow beyond the one radial in the design system table, parallax over 40px,
  overshoot over 1.04, illustrative imagery.
- **Layout:** 96px outer margins, a 12-column grid, text left-aligned, one accent
  colour. A figure and its label always share a left edge.
- **Beats:** title, HERO, then at most three of CHART REVEAL, THE ROW, SPLIT, COMPARE,
  then the close. 10 to 16 seconds.
- **Motion:** rise, fade, mask wipe, counters, charts growing in. Each beat holds at
  least 1.2s fully settled, so any paused frame reads as a finished slide.
- **Camera:** one slow push-in (scale 1.0 to 1.03) over the whole piece, nothing else.

## Style: Cinematic 3D (not available yet, never build it)

Kept for when its scene ships. For a launch, a social post, a screen in the lobby. The piece is built around a real
3D scene shaped by the dashboard's numbers.

- **Mandatory:** a Three.js scene on a full-bleed canvas, built from
  `references/scenes/data-skyline.js` next to this file. Copy it into the video folder
  with the local Three.js build it names; never load Three.js from a CDN.
- **The numbers shape the geometry.** The scene reads a bound chart variable
  (`v.daily.rows`) and builds one object per row, its size proportional to the row's
  value. Never hard-code a height. Because it reads the variable, Refresh numbers
  reshapes it too.
- **Time comes from the composition.** Every position, rotation and camera move is a
  function of the composition's current time, driven from the GSAP timeline, never of
  the wall clock or `requestAnimationFrame` deltas. Two exports of the same data must
  match frame for frame.
- **One subject motif, labelled.** One illustrative element names the topic (an
  aircraft for travel, envelopes for email, cards for tickets) with a small muted note:
  "Illustrative scene. Figures from <dashboard name>."
- **Text stays crisp and off the geometry:** every figure, label and title is DOM text
  in one side band of about 40% of the width with a scrim behind it. Never put numbers
  into a 3D texture.
- **Camera:** one continuous move for the whole piece, eased, never cut. When the hero
  lands, the object for the hero tile's largest row lights in the accent.
- **Budget:** under 400 meshes, instancing past 50 copies, pixel ratio 1.
- **Beats:** title over the scene assembling, HERO with the scene's highlight, CHART
  REVEAL beside the scene, the close over a final wide shot. 12 to 18 seconds.

## Choosing the story

Rank the value tiles by how much they say, then build around the best one:

1. A value tile whose change against the previous period is large beats a flat one.
2. Outcome figures (revenue, signups, users, orders) beat activity figures (emails
   sent, meetings held), which beat inventory figures.
3. The chart tile that explains the hero figure comes right after it. A second chart
   only earns its place if it says something new.

Never show more than seven figures in the whole piece.

## Design system

The video wears the dashboard's look, and its colours arrive as data like the numbers:
`v.theme` holds `background`, `card`, `ink`, `muted`, `line`, `accent`, `series` (chart
colours in order), `up` and `down`. Set them as CSS custom properties at the start
(`--bg: v.theme.background`, and so on) and use only those. Never type a colour, never
pick a dark look for a light dashboard or the reverse. A light theme gets a faint
vignette in `muted`, a dark one a single soft radial glow in `accent`.

Use `accent` for charts and for the hero delta when the change is positive, `down` when
it is negative. A bound chart may carry `colors` (series name to hex): someone picked those
for the tile, so paint each named series with its colour, exactly as the dashboard does, and
the others from `series` in order.

Type at 1080p: kicker 28 to 32px in the muted colour, sentence case; hero figure 200
to 260px, weight 700, tabular numbers; secondary figures 72 to 96px; labels 28px. One
sans family throughout (Inter or Geist), no monospace.

When the dashboard uses one of the user's design systems, `v.theme` also carries `font`
(text) and `fontNumbers` (figures): use those families instead of Inter or Geist, loaded the
way the composition loads any web font. When it has a logo, `v.theme.logo` is an image data
URI and `v.theme.logoPlacement` is `left` or `right`: show it in that corner of the opening
and closing frames, about 56px tall at 1080p, and never recolour or crop it. The colours are
already checked for readability, so never swap them for brighter ones.

## Fixed opening (about 1.5s)

The dashboard name (`dashboard_title`) and, under it, the date range in the muted
colour. It enters with a short rise, holds, and moves into a small top-left label that
stays for the rest of the piece.

## Beat menu (compose 2 to 4 middle beats)

- **HERO (mandatory).** The chosen value tile's number counting up at hero size, its
  bound title above, its bound delta in a pill below, landing after the counter
  settles. The counter lands at about a third of its window, then breathes.
- **CHART REVEAL.** A bound chart, at least 1100px wide (700px in the Cinematic band),
  growing in over 1.4 to 1.8s, its bound tile title above. Start it while the hero
  exits, overlapping 0.3s.
- **THE ROW.** Three or four secondary value tiles side by side, each a bound title and
  a bound counter, cascading in left to right 0.12s apart.
- **SPLIT.** A donut (a pie tile) on one side and a line or area chart on the other,
  the second starting 0.4s after the first.
- **COMPARE.** The hero tile's `previous` small and muted, then the current value large,
  with the delta between them. Use it when the change is the story.

## Fixed close (about 1.5s, held to the last frame)

The dashboard name and "Numbers as of" followed by `as_of_text` ("Friday 6 November,
18:05"), in the muted colour.

## Frame bounds and pacing

- Everything sits inside 1920 by 1080 with at least 64px to spare. A chart box gets an
  explicit width and height, the height about 0.56 of the width.
- Total 10 to 20s. Entrances decelerate, exits run about 30% faster. Never an
  overshoot on the number itself.
- Every element of a later beat starts hidden in its CSS (`opacity: 0`), not only in
  the timeline, so nothing of it shows before its beat, in the editor's preview or in
  the render. A real run left a chart ring sitting on the title and on the hero.
- Hand over cleanly: an incoming beat may overlap the outgoing one by about 0.3s only
  where they do not share space. Where they do, the outgoing beat is gone first. Never
  a blank frame either way.

## Checklist before reporting

- Every figure, chart, delta and tile title on screen reads a variable that the last
  `dashboard_bind_video` answer listed. Search the composition for digits in visible
  text: there should be none besides the date range.
- No real figure in any `data-composition-variables` default.
- `npx hyperframes check` passes, and the opening, HERO and close are all there.
- Stills from a draft render with the data, one a third of a second after every beat
  starts: nothing from another beat is on screen over the current one.
- At most seven figures.
- Professional: nothing from its banned list. Cinematic 3D: the scene reads the chart
  variable, no height is typed, motion comes from composition time, the note is on
  screen.
- Tell the user that Refresh numbers in the video editor updates every figure later,
  and that Export makes a new MP4 with them.
- Render a draft MP4 with the data file (see "How the numbers reach the composition"),
  then, when the `result_card` tool is available, end the turn with it: the video design
  and that MP4 as its attachments, so the user can play the video right in the chat.
