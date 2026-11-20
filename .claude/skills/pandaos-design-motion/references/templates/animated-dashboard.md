# Template kit: "Animated dashboard"

A short video of one of the user's PandaOS dashboards: the headline figure counts
up, the charts draw themselves in, the change against the previous period lands,
and the piece closes on the dashboard's name and the time the numbers are from.
This file is a KIT, not a fixed cut. Keep the fixed title and close, then compose
the middle from the beat menu based on what the dashboard actually shows.

Follow the pandaos-design-motion SKILL.md flow (beat sheet, cinematic floor,
frame review). This kit adds the data rules, the design system, the fixed
frames and the beat menu. Where the two disagree, this kit wins.

## Hard rules

1. **Every figure is bound, never typed.** Pass `motion.dashboardId` and put a
   `binding: { tileId, field }` on every sprite that shows a number, a chart, a
   change label or a tile title. The tools write the real values in, with the
   tile's format, and Refresh numbers keeps them current later. A number you type
   yourself goes stale the next day and may simply be wrong. If a figure you want
   has no tile, leave it out; do not compute it. A bound figure arrives already
   formatted with its unit or currency ("24 h", "€79,254,364"), so never add a
   unit, suffix or currency of your own next to it.
2. **Read the dashboard first.** `dashboard_get` with the id lists every tile with
   its id, kind and current figure. If tiles have no results, run
   `dashboard_refresh` once. A tile marked "hidden from AI" cannot be bound: skip
   it and never guess its value.
3. **Ask the user nothing** once the dashboard and the look are known. The beat
   menu decides the story. Say what you picked in one line after the piece is on
   screen. The look comes with the brief ("Style: Professional" or "Style:
   Cinematic 3D"). When it does not, ask exactly one question before anything
   else, offering those two looks with their one-line descriptions (a
   `generative_ui` option card when it is available), then build.
4. **The look is binding.** Each look below is a set of rules, not a mood. Never
   blend them: no 3D in Professional, no flat chart-only piece in Cinematic 3D.
5. **One stage, one manifest.** Beats are time ranges on one timeline.
6. **No em or en dashes in any visible copy.**

## Style: Professional

For a board meeting, an investor update, a weekly report. Calm, exact, every
frame could be a slide.

- **Banned:** WebGL, Three.js, d3 scenes, canvas drawing, particles, 3D
  transforms, rotation, blur, glow blobs beyond the single radial in the design
  system table, `parallax-drift` over 40px, overshoot over 1.04, any illustrative
  imagery. Charts come only from chart sprites.
- **Layout:** 96px outer margins, a 12-column grid, text left-aligned, one accent
  colour. A figure and its label always share a left edge.
- **Beats:** title, HERO, then at most three of CHART REVEAL, THE ROW, SPLIT,
  COMPARE, then the close. 10 to 16 seconds.
- **Motion vocabulary:** `rise`, `fade`, `mask-wipe`, counters and chart `grow`.
  Each beat holds at least 1.2s fully settled, so any paused frame reads as a
  finished slide.
- **Camera:** the single slow push-in from the design system table, nothing else.

## Style: Cinematic 3D

For a launch, a social post, a screen in the lobby. The piece is built around a
real 3D scene, and the scene is shaped by the dashboard's numbers.

- **Mandatory:** a Three.js scene on a full-bleed canvas sprite (`dash-scene`),
  loaded from `pandaos-lib://three` and drawn only from a scene hook. Start from
  `references/scenes/data-skyline.js`, which already does everything below.
- **The numbers shape the geometry.** In the hook's `prepare`, read a bound chart
  sprite with `window.__motionData('dash-chart-1')` and build one object per row
  whose size is proportional to the row's value: towers, pillars, stacks, rings.
  Never hard-code a height. Because the scene reads the bound sprite, Refresh
  numbers reshapes it too. If the dashboard has no chart tile, the scene may be
  purely illustrative, and then rule 3 below applies to all of it.
- **One subject motif, labelled.** Add one illustrative element that names the
  topic: an aircraft on a route for travel, parcels on a conveyor for orders,
  envelopes for email, blocks on a dial for calendar time, stacked cards for
  tickets. A small muted note sprite reads "Illustrative scene. Figures from
  <dashboard name>." Never add geometry that looks like data but is not.
- **Text stays crisp and off the geometry:** every figure, label and title is a
  DOM sprite, bound like any other. Never put numbers into a 3D texture. All text
  lives in one side band, about 40% of the width, with a scrim gradient behind
  it; set the starter's `textSide` to that side so the skyline is framed in the
  other 60%. No figure, chart or label ever sits on top of a tower. Charts go in
  the text band too, at the band's width (at least 700px, which overrides the
  1100px of CHART REVEAL for this look).
- **Keep the starter's look:** night palette, lit caps, faint grid floor. Leave
  `--tower`, `--ground` and `--haze` unset on a dark stage; set them only for a
  Paper or Ocean dashboard look.
- **Camera:** one continuous move for the whole piece (an orbit, a dolly or a
  crane), eased, never cut. When the hero beat lands, the object for the hero
  tile's largest row lifts or lights in the accent.
- **Stage:** dark (`#07090f`, the Midnight row) unless the dashboard's look is
  Paper or Ocean, then that light palette with a distance haze. One key light,
  one hemisphere light, soft shadows, shadow map 2048 at most.
- **Budget:** under 400 meshes, `InstancedMesh` past 50 copies, pixel ratio 1.
- **Beats:** title over the scene assembling, HERO with the scene's highlight,
  CHART REVEAL beside the scene (the 2D chart is the exact reading of the 3D
  shapes), the close over a final wide shot. 12 to 18 seconds.

## Choosing the story

Rank the value tiles by how much they say, then build around the best one:

1. A value tile whose change against the previous period is large (the delta
   label from `binding.field: "delta"` is the evidence) beats a flat one.
2. Revenue, signups, users, orders and similar outcome figures beat activity
   figures (emails sent, meetings held), which beat inventory figures.
3. The chart tile that explains the hero figure (its daily breakdown, its
   channels) comes right after it. A second chart is optional and only earns its
   place if it says something new.

Never show more than seven figures in the whole piece. A dashboard with twenty
tiles becomes a video about three or four of them.

## Design system: the dashboard's own look

Take the palette from the dashboard's Look (the theme `dashboard_get` reports):

| Dashboard look | Stage background | Ink | Muted | Chart `theme` |
| --- | --- | --- | --- | --- |
| Midnight or PandaOS | `#0b0d12` with one soft radial glow in the accent | `#f2f4f8` | `#8b93a7` | `midnight` |
| Paper | `#f7f3ec` with a faint warm vignette | `#17150f` | `#756d60` | `paper` |
| Ocean | `#eef4f7` with a faint cool vignette | `#0f1d2b` | `#5b6e7f` | `ocean` |

Use the dashboard's accent colour as the chart `accent` and for the hero delta
pill when the change is positive. A negative change uses a muted red
(`#fb7185` on dark, `#be123c` on light), never the accent.

Typography at 1080p: kicker 28 to 32px uppercase with 4px tracking in the muted
colour; hero figure 200 to 260px, weight 700, tracking -6px, tabular numbers;
secondary figures 72 to 96px; labels 28px. One sans family throughout (Inter or
Geist), no monospace.

## Fixed title (always first, about 1.5s)

`dash-title` holds the dashboard name, and directly under it the date range in
the muted colour (bind a tile `title` only if the dashboard name is generic). It
enters with `tracking-in` or a short `rise`, holds briefly, and leaves upward or
shrinks into a top-left label that stays for the rest of the piece. The camera
starts slightly pushed in (scale 1.04) and settles to 1.0.

## Beat menu (compose 2 to 4 middle beats)

**HERO (mandatory).** `dash-hero` is a counter bound to the chosen value tile
(`field: "value"`), centered or left-aligned at hero size. Under it, a delta pill
`dash-hero-delta` bound with `field: "delta"`, popping in after the counter
settles. The label above it is bound with `field: "title"`. Give the counter a
`settleAt` around 0.35 of its window so it lands early and then breathes. One
ambient motion only: a slow push-in on the camera.

**CHART REVEAL.** A chart sprite `dash-chart-<n>` bound with `field: "chart"`,
at least 1100px wide, revealing with `grow` over 1.4 to 1.8s. The chart type
comes from the tile; override `chart.type` only when the tile is a table. Put
the tile title above it as a bound text sprite. When the chart follows the hero,
start it while the hero exits (overlap 0.3s) so the eye travels from the number
to its breakdown.

**THE ROW.** Three or four secondary value tiles side by side, each a card with
a bound title and a bound counter, cascading in left to right with a 0.12s
stagger. Use it when the dashboard has several meaningful figures; skip it when
it does not.

**SPLIT.** A donut (a pie tile) on one side and a line or area chart on the
other, both bound, the second starting 0.4s after the first. Good for "where it
comes from" next to "how it moved".

**COMPARE.** The hero tile's previous value (`field: "previous"`) small and
muted, then the current value large, with the delta pill between them. Use it
when the change is the story.

## Fixed close (always last, about 1.5s, held to the final frame)

`dash-close` shows the dashboard name and a line "Numbers as of <time>" in the
muted colour. Bind nothing here except the name if needed; the as-of time is the
moment of the last dashboard refresh, which `dashboard_get` reports, written in
plain words ("Thursday 9 October, 10:12"). It holds to the last frame.

## Frame bounds

Every sprite sits inside the 1920 by 1080 stage with at least 64px to spare.
A chart box gets an explicit width AND height, the height about 0.56 of the
width (a 1200px chart is about 670px tall): a chart fits itself inside its box,
so a box too short leaves it small, and a chart with no room below it runs off
the stage. Check the review frames for anything cut at an edge.

## Pacing

- Total length 10 to 20s: title 1.5s, each middle beat 2.5 to 4s, close 1.5s.
- Entrances decelerate (outCubic, outQuart), exits accelerate and run about 30%
  faster. Counters ramp with their own monotonic ease, so never put an overshoot
  ease on the number itself; put it on the card around it.
- Vary the entrance between beats: the hero rises, the chart fades while it
  grows, the row cascades from the left, the close scales in from 0.96.
- Leave 0.3s of overlap between beats, never a blank frame.

## Checklist before reporting

- Every figure on screen comes from a binding, and the tool result says how many
  sprites were filled with no unexpected warnings.
- `dash-title` opens, `dash-hero` and at least one `dash-chart-` appear, and
  `dash-close` holds to the end.
- Charts are at least 900px wide, axis labels readable in the review frames,
  and nothing is cut off at a stage edge in any review frame. Screenshot one
  frame 0.4s before the end too: the close keeps the same left margin as every
  other beat (a full-stage close block needs its own padding).
- At most seven figures in the whole piece.
- Professional: nothing from its banned list is in the HTML. Cinematic 3D: the
  scene reads `__motionData`, no height is typed, and the illustrative note is on
  screen.
- Tell the user they can press Refresh numbers on the canvas to update the
  figures later without rebuilding the animation.
