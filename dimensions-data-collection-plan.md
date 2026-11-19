# Dimensions Report: Data Collection Plan

How to capture real data points over time so a future comparison (or line graph) is built from evidence, not extrapolated the way the old `Dimension Reporting overtime comparison...docx` was. The dataset itself lives in [dimensions-tracking.csv](dimensions-tracking.csv), already backfilled with every real number recovered from the 2014 and 2018 reports (see [dimensions-report-2014-vs-2018-real-comparison.md](dimensions-report-2014-vs-2018-real-comparison.md) for how those were extracted).

## Three tiers of data, by rigor

**Tier 1 — Real retake.** An actual Talent Q / Korn Ferry Dimensions questionnaire completion. This is the only source of true forced-choice scores and the categorical Behavioural Type. It requires access to the licensed tool (an employer's L&D/outplacement program, or buying it directly) — it isn't something that can be run on demand, which is exactly why it's only happened twice in 12 years. When it happens again: parse the PDF (`miyo parse`), read each section's narrative and numeric tables directly (not a summary), and add one CSV row per dimension, same columns as the existing rows, `tier=1_real_retake`.

**Tier 2 — Self-rating on the real anchors.** Between retakes, a legitimate middle option: rate yourself against the *exact* definition text the real reports use — e.g. the Sales Profile's 8 stage descriptions, the Potential Report's 11 element definitions, the Leadership Derailer's 8 factor descriptions (all quoted in the comparison doc, or re-readable from the source PDFs at `F:\OneDrive - CBA\Documenten\CV and Job Applications\`). Pick a dimension, read its real low-anchor and high-anchor text, rate 1–10 honestly, and log it with a one-line justification. This isn't the licensed instrument's methodology, so it's more exposed to self-presentation bias than Tier 1 — but it's genuine, dated, first-person data using the correct definitions, which is a real step up from nothing. Suggested cadence: once a year is enough to be useful without becoming a chore.

**Tier 3 — Observed-behavior log.** Already running in memory at `dimensions-observation-log.md` (project memory, not this repo) — dated notes tied to specific real tasks, mapped to whichever dimension(s) the task actually evidenced. This happens naturally during normal work and costs nothing extra, but a single observation is never strong enough on its own to imply a score — its value is in corroborating or contradicting Tier 1/2 data when enough of it accumulates (exactly how the 2014→2018 comparison cross-checked Trait Profile against Sales Profile against the Derailer report and got the same answer three times).

## Adding a new data point

1. Pick the tier (above).
2. Append row(s) to `dimensions-tracking.csv`: `date, tier, source, section, dimension, score, scale, score_type, note`.
   - `score_type` is `explicit` (printed/stated directly), `estimated` (inferred with a stated method — say what method), or `narrative_only` (no number, leave `score` blank, put the real quote/paraphrase in `note`).
   - Never write a number with `score_type=explicit` or `estimated` unless there's an actual source to point to in `note`/`source`. A guess goes in Tier 3 as a plain observation, with no score at all.
3. If it's a Tier 1 retake, also update [dimensions-report-2014-vs-2018-real-comparison.md](dimensions-report-2014-vs-2018-real-comparison.md) — rename/restructure it to cover three (or more) points instead of two once there's a third real retake.

## What this makes possible later

Once there are at least 3 real (Tier 1) or Tier-1+Tier-2 data points for a given numeric dimension, a real line/trend chart becomes meaningful — exactly what was originally asked for, but built from `dimensions-tracking.csv` rows instead of an invented smooth trend. Two points (2014, 2018) is already there; it's just presented as a table in the comparison doc rather than a chart, because two points don't really need a chart to read.

## What this deliberately doesn't do

It doesn't try to fill in the gaps for dimensions with no real score (the `narrative_only` rows for 2014's Potential Report, Risk Profile, and most of the Trait Profile) by estimating or interpolating. Those stay blank in `score` on purpose — a blank cell is more honest than a plausible-looking number with no real source behind it.
