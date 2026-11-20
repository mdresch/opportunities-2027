---
name: "pandaos-dashboards"
description: "Build and change live PandaOS dashboards in the Dashboards app: tiles over database connections, the linked Supabase project and connected apps (Gmail, Calendar, the board, Sheets), with the right chart kind (numbers and gauges, bar, line, area, pie, scatter, heatmap, funnel, sunburst, treemap, sankey, world map), series, options, format, size and range for each. Load before calling dashboard_sources, dashboard_create or dashboard_add_tile."
---
You are building a live dashboard in the PandaOS **Dashboards** app. A dashboard is a board of tiles, each one a small recipe (source, measure, parameters, group-by) that PandaOS runs on the user's own data and draws as a number, a chart, a list or a table. You choose the recipes and the presentation; PandaOS runs them.

## 1. What a dashboard is

- **Tiles on a 12-column grid.** Each tile has a width `w` (columns, 1 to 12) and a height `h` (rows). Tiles flow left to right in their order.
- **One shared range chip** at the top: `today`, `7d`, `30d`, `90d`, `mtd` (month to date), `ytd` (year to date). Every tile that reads dates follows it. A tile may pin its own `range` only when it must ignore the board's.
- **Refresh cadence**: `manual`, `15m`, `30m`, `1h`, `6h`, `1d`, set with `dashboard_update`. Scheduled refreshes run **only while PandaOS is open**. Say so when you offer one.
- **Themes**: `paper` (warm, the default), `midnight` (dark), `ocean` (cool), `app` (the PandaOS colours), plus an optional accent colour.
- **Linking** to a dashboard: every dashboard tool answer that names one carries its link, `pandaos://dashboard/<id>`. When the user asks for the link, or you point them at a board, give it as `[Title](pandaos://dashboard/<id>)`, copied from the tool answer; a click opens that board in the Dashboards app. Never build one by hand or guess another format. A share link (`share.pandaos.ai`) is a different thing: a public snapshot page.
- **Sharing** publishes a snapshot page, never a live connection. A shared board republishes its page after every refresh that lands results, manual or scheduled, so the link follows the board while PandaOS is open.

## 2. Chart kinds and when each fits

Pick `show` from the rows the query returns, not from what looks impressive. Each kind says what rows it needs; a tile whose rows do not fit draws that sentence instead of a chart, so `dashboard_get` plus a look at the query tells you what to fix.

### Numbers

| `show` | Use it for | Rows it needs | Options | Size |
| --- | --- | --- | --- | --- |
| `value` | One headline number, its change against the previous window and a sparkline, or a gauge or progress bar against a target | Needs one number, or a day series | `variant`, `target`, `caption`, `showDelta`, `showSparkline`, `min`, `max`, `thresholds`, `goodDirection`, `deltaAs` | `w 3, h 1`; a gauge `w 3, h 2` |

### Charts

| `show` | Use it for | Rows it needs | Options | Size |
| --- | --- | --- | --- | --- |
| `bar` | Comparing categories, up to about 12, or a series per category over time | Needs rows of category and number, several number columns or a split column for series | `stack`, `orientation`, `sort`, `limit`, `labels`, `seriesColors`, `legend` | `w 6` to `8`, `h 2` |
| `line` | A series over time, one line per series | Needs rows of category and number, several number columns or a split column for series | `curve`, `points`, `seriesColors`, `legend` | `w 6` to `8`, `h 2` |
| `area` | The same as `line` when the volume matters, stacked for parts of a total | Needs rows of category and number, several number columns or a split column for series | `stack`, `curve`, `seriesColors`, `legend` | `w 6` to `8`, `h 2` |
| `pie` | Shares of one whole, 2 to 6 slices | Needs rows of category and number, several number columns or a split column for series | `variant`, `sort`, `limit`, `labels`, `legend` | `w 4, h 2` |
| `scatter` | How two measures relate, one point per row | Needs rows of two numbers (x and y), with an optional split column and a size column | `size`, `seriesColors`, `legend` | `w 6, h 2` |
| `heatmap` | Intensity over two categories, such as day by category | Needs rows of row label, split column and number | `labels` | `w 6, h 2` |
| `funnel` | Stages in order, with the drop between them | Needs rows of category and number, several number columns or a split column for series | `labels` | `w 5, h 2` |
| `list` | A ranked top N, drawn as horizontal bars | Needs rows of category and number, several number columns or a split column for series | `sort`, `limit` | `w 5, h 2` |

`bar`, `line` and `area` take extra `series` and a `splitBy`; `scatter` and `heatmap` take a `splitBy` (a heatmap needs one: its columns are the split values). A pie, funnel or list draws one series: the first number column. A funnel reads the stages in row order, so `ORDER BY` them.

### Advanced

| `show` | Use it for | Rows it needs | Options | Size |
| --- | --- | --- | --- | --- |
| `sunburst` | Parts of a whole with levels, as rings | Needs one to three text columns (the levels) then a number | `labels`, `legend` | `w 5, h 3` |
| `treemap` | Parts of a whole with levels, as nested boxes | Needs one to three text columns (the levels) then a number | `labels` | `w 6, h 3` |
| `sankey` | Flows from one set of categories to another | Needs rows of source, target and a number | `labels` | `w 8, h 3` |
| `map` | A number per country on a world map | Needs rows of country (ISO code or English name) and number | `legend` | `w 8, h 3` |

A sunburst or treemap keeps up to 200 leaves and folds the rest into Other. A sankey keeps up to 60 nodes and refuses a cycle, naming the two nodes. The map matches ISO 3166-1 alpha-2 (`DE`), alpha-3 (`DEU`), numeric codes and English short names, and counts unmatched rows under the map.

### Detail

| `show` | Use it for | Rows it needs | Options | Size |
| --- | --- | --- | --- | --- |
| `table` | Anything else: several columns, records, details | Shows any rows | none | `w 6` to `12`, `h 2` |

### Layout

Two tiles with no data source. They sit in the same grid, move and resize like any tile and follow the look. Pass `show`, `title` and `text` only, never `kind` or `measure`; PandaOS gives them the internal source kind `content`, which you never pass yourself.

| `show` | Use it for | Rows it needs | Options | Size |
| --- | --- | --- | --- | --- |
| `heading` | A section title over a group of tiles, on its own full-width row | Needs no data, it shows its own text | none | `w 12, h 1` |
| `text` | A short note that explains a number or a group: what it counts, a caveat | Needs no data, it shows its own text | none | `w 4` to `12`, `h 1` |

A heading's `text` defaults to its `title`. A text tile's `text` is short markdown: paragraphs, `**bold**`, `*italic*`, `` `code` ``, `- ` lists and `https` links, nothing else. Its `title` is only the name it has in Edit.

If a category chart would have more than 12 bars or 6 slices, switch to `list` or `table`, set `limit`, or filter the query down. Negative numbers draw below a zero line on bars and lines; pie, funnel, sunburst, treemap, sankey and map skip rows with a negative or empty number.

### Options

`options` is one object; a kind reads only the options its row lists and keeps the rest, so switching a tile from `pie` to `bar` and back keeps its `variant`. Options never re-run a tile, except `showDelta` on a number. On `dashboard_update_tile` only the keys you pass change, and `null` clears one back to its default.

| Option | Values | Read by |
| --- | --- | --- |
| `variant` | `number` (default), `gauge`, `progress` for a number; `donut` (default), `pie`, `half` for a pie | `value`, `pie` |
| `stack` | `grouped` (default), `stacked`, `percent` (100%) | `bar`, `area` |
| `orientation` | `vertical` (default), `horizontal` | `bar` |
| `curve` | `true` smooths the lines | `line`, `area` |
| `points` | `true` draws a dot on every point | `line` |
| `sort` | `none` (as returned), `desc`, `asc` | `bar`, `pie`, `list` |
| `limit` | 1 to 50 rows; a pie folds the rest into Other | `bar`, `pie`, `list` |
| `labels` | `true` prints values on bars, slices, cells and nodes when they fit | `bar`, `pie`, `heatmap`, `funnel`, `sunburst`, `treemap`, `sankey` |
| `legend` | `auto` (hidden for one series), `hidden`, `bottom`, `right` | `bar`, `line`, `area`, `pie`, `scatter`, `sunburst`, `map` |
| `size` | A numeric column name that sizes each bubble | `scatter` |
| `target`, `min`, `max` | Numbers for a gauge or progress bar | `value` |
| `thresholds` | Up to 5 `{ at, tone }`, tone `good`, `warn` or `bad` | `value` |
| `caption` | One line under the number, up to 80 characters | `value` |
| `goodDirection` | `up` (default) or `down` | `value` |
| `showDelta`, `showSparkline` | `false` hides the change or the sparkline | `value` |
| `deltaAs` | `auto`, `percent`, `absolute` | `value` |

### Series and splitting

A chart can show several series in two ways, never both on one tile:

- **Split one query** with `splitBy`: one colour per value of a column. For `sql` and `analytics` it names a text column of the result, and the rows stay long, `[x, split, number]`. For `records` it is a second field to group by inside `groupBy`. Split values beyond 12 fold into Other.
- **Add queries** with `series`: up to 5 extra recipes, each `{ label, kind, ref, measure, params, groupBy }` plus an optional hex `color`, each from any source. They run with the tile's range and merge on the first column, so return the same key (an ISO day merges with an ISO day). Each series takes its first number column; a key missing from one series is a gap, not zero. A field you leave out comes from the tile's own recipe. On an update the list replaces the stored one: pass a series' `id` from `dashboard_get` to keep it, `[]` to remove them all.

Revenue by product as stacked bars, from one query:

```json
{ "dashboardId": "<id>", "title": "Revenue by product", "kind": "database", "ref": "<connection id>",
  "measure": "sql", "show": "bar", "w": 8, "h": 2, "splitBy": "product",
  "params": { "sql": "SELECT date_trunc('day', paid_at)::date AS day, product, sum(amount) AS revenue FROM orders WHERE paid_at >= {{start}} AND paid_at < {{end}} GROUP BY 1, 2 ORDER BY 1" },
  "options": { "stack": "stacked", "legend": "bottom" } }
```

Signups from Postgres next to Supabase, as two lines:

```json
{ "dashboardId": "<id>", "title": "Signups", "kind": "database", "ref": "<connection id>", "measure": "sql", "show": "line",
  "params": { "sql": "SELECT created_at::date AS day, count(*) AS signups FROM users WHERE created_at >= {{start}} AND created_at < {{end}} GROUP BY 1 ORDER BY 1" },
  "series": [{ "label": "Supabase", "kind": "supabase", "ref": "<project ref>", "measure": "sql",
               "params": { "sql": "SELECT created_at::date AS day, count(*) FROM auth.users WHERE created_at >= {{start}} AND created_at < {{end}} GROUP BY 1 ORDER BY 1" } }],
  "options": { "curve": true } }
```

On a collection, `groupBy: "day"` with `splitBy: "calendar"` on Calendar `events` draws hours per day with one colour per calendar. Suggest `stack: "stacked"` when the series are parts of a whole.

### Series colours

Bar, line, area and scatter tiles take a colour per series in `options.seriesColors`, keyed by the series name `dashboard_get` lists on the tile's line (`series "signups", "first opens"`): a result column, a split value or an extra series' label. For "make signups blue and first opens red":

```json
{ "dashboardId": "<id>", "tileId": "<tile id>", "options": { "seriesColors": { "signups": "#2563eb", "first opens": "#dc2626" } } }
```

It merges by name, so the series you leave out keep their colour. A name set to `null` goes back to the look's colour, `"seriesColors": null` clears them all. Series nobody coloured follow the theme or design system as before. A colour too faint for the board is shaded until it reads, and the share link and Animate use the same colours. Nothing re-runs.

### KPI options

A number tile can be more than a number:

- `variant: "gauge"` draws a half ring from `min` (default 0) to `max` (default `target`) with a tick at `target`; `variant: "progress"` draws a bar with a marker at `target` and the share of it. Without a `target` or `max` it runs from 0 to a round number above the data (830 runs to 1,000), so set a `target` whenever the user has a goal.
- `thresholds` colour the number, ring and bar by the tone of the highest `at` the value reaches.
- `goodDirection: "down"` for numbers that should fall (churn, open tickets, response time), so a fall reads green.
- `caption` says what the target is ("of 40 this month"). `showDelta: false` stops fetching the previous window.

A gauge against a quota:

```json
{ "dashboardId": "<id>", "title": "Deals closed", "kind": "hubspot", "ref": "<account id>", "measure": "records", "show": "value", "w": 3, "h": 2,
  "params": { "collection": "deals", "filters": [{ "field": "stage", "op": "is", "value": "closedwon" }], "metric": { "fn": "count" } },
  "options": { "variant": "gauge", "target": 40, "caption": "of 40 this month",
               "thresholds": [{ "at": 0, "tone": "bad" }, { "at": 25, "tone": "warn" }, { "at": 40, "tone": "good" }] } }
```

### Formats

`format` decides how numbers read:

- `number`: plain, with thousands separators. The default.
- `compact`: 1.2k, 3.4M. Use for large counts on number tiles.
- `percent`: a value between -1 and 1 reads as a ratio (0.807 reads 80.7%), a larger value reads as a percentage already (80.7 reads 80.7%). Return one or the other consistently in a tile, never a mix.
- `currency`: put the currency symbol in `unit`, for example `unit: "€"`.
- `duration-h`: hours, for time spent (calendar hours, resolution time).

`unit` is an optional suffix after the number for every other format ("tickets", "ms").

## 3. Layout recipe

1. A first row of **3 to 4 number tiles**: the headline figures.
2. Then **1 or 2 charts** that explain them: a trend over time, a breakdown by category.
3. Then **one table or list** with the detail: the oldest open items, the top customers.

Give the board one subtitle sentence saying what it tracks. Tile titles are short nouns ("Open tickets", "Revenue", "Unread by label"), never sentences. Six to eight tiles is a good board; more than twelve is a report, ask before building it.

**Section headings never by default.** Add them only when the tiles clearly form two or more groups, for example five revenue tiles and five user tiles: one `heading` before each group ("Revenue", "Users"), each group laid out with the recipe above. They suit a branded board built on a design system best. A board with one theme gets no heading, even a long one, a heading never sits over a single tile, and a heading is never added only to decorate.

**Text tiles never by default.** At most one or two per board, only where a reader would otherwise misread a number ("Counts paid orders only, refunds excluded.") or needs one line of context for a group. Never restate a tile's title, never describe the chart.

Large boards simply scroll, on the app, the share link and a phone. There are no tabs or pages, so never split a board into several to keep it short.

## 4. Sources

Call `dashboard_sources` first. It lists what this project can read, each source with its `kind`, `ref`, measures, parameters and group-bys. Use exactly the kinds, refs and measure ids it returns. A collection's group-by fields are also what `splitBy` takes; a `sql` or `analytics` tile splits by a column its query returns. Two sources from the list can sit on one chart as `series`. A source with `available: false` says why; pass that on instead of trying it.

### Database connections (`kind: "database"`)

`ref` is the connection id. Two measures, and a connection lists only the ones its AI access mode allows:

- `sql`: one read-only `SELECT` in `params.sql`. Use the range placeholders so the tile follows the chip: `{{start}}` and `{{end}}` (ISO timestamps, UTC) or `{{start_date}}` and `{{end_date}}` (calendar days, end exclusive), always as `>= start AND < end`. PandaOS puts each one in as a quoted literal, so write it bare, never inside quotes.

  ```sql
  SELECT date_trunc('day', created_at)::date AS day, count(*) AS signups
  FROM users
  WHERE created_at >= {{start}} AND created_at < {{end}}
  GROUP BY 1 ORDER BY 1
  ```

- `analytics`: a structured query object in `params.query`, the same shape `database_analytics_query` takes (`from`, `joins`, `columns`, `filters`, `groupBy`, `orderBy`; `connectionId` may be left out). It is **mandatory on analytics-mode connections**, which never take raw SQL. Put the placeholders in filter values:

  ```json
  { "from": "orders",
    "columns": [{ "expression": "DATE(created_at)", "alias": "day" }, { "aggregate": "SUM", "column": "total", "alias": "revenue" }],
    "filters": [{ "column": "created_at", "op": ">=", "value": "{{start}}" }, { "column": "created_at", "op": "<", "value": "{{end}}" }],
    "groupBy": ["day"], "orderBy": [{ "column": "day" }] }
  ```

A number tile sums the second column when the query returns several rows. Results are capped at 500 rows. A schema-only connection runs tiles for the user but never reports their numbers back to you.

### Supabase (`kind: "supabase"`)

The Supabase project linked to this PandaOS project, read through the Supabase account the user already connected. `ref` is the project ref from `dashboard_sources`. It takes the **same two measures**, `sql` and `analytics`, with the same placeholders. Analytics queries read database `postgres` and schema `public` unless you name another schema (for example `auth` for `auth.users`). Every Supabase tile runs read-only: any statement that writes is refused on the tile.

### App collections (`measure: "records"`)

Connected apps expose **collections** of records (Gmail conversations, board tickets, and more as apps add them). Every collection speaks one model:

- `params.collection`: the collection id, for example `threads` (Gmail) or `tickets` (the board).
- `params.filters`: up to 10 conditions `{ field, op, value }`. The ops are `is`, `is_not`, `contains`, `not_contains`, `gt`, `gte`, `lt`, `lte`, `in`, `not_in`, `is_set`, `is_empty`. Each field lists the ops its kind allows; `in` and `not_in` take a list, `is_set` and `is_empty` take no value.
- `params.metric`: `{ fn, field? }` with `fn` one of `count`, `count_distinct`, `sum`, `avg`, `min`, `max`. `count` needs no field; `count_distinct` takes any field; `sum`, `avg`, `min` and `max` take an aggregatable number field.
- `groupBy`: a field id, or `day`, `week` or `month` when the collection has a time field, or `none`.

`dashboard_sources` prints each collection's fields with their kind, the ops each allows, the metrics and the group-bys. Use only those. A field with `dynamicOptions` has values that come from the account (Gmail labels, board lists); pass the option value, and you may add `"<param>__label"` with its display name.

Worked example, **unread mail per label** as a bar chart:

```json
{ "dashboardId": "<id>", "title": "Unread by label", "kind": "gmail", "ref": "<account id>",
  "measure": "records", "show": "bar", "w": 6, "h": 2, "groupBy": "label",
  "params": { "collection": "threads",
              "filters": [{ "field": "unread", "op": "is", "value": true }],
              "metric": { "fn": "count" } } }
```

Gmail `threads` fields: `label`, `unread`, `starred`, `from`, `subject`, `hasAttachment`, `date`. Its counts are a snapshot of the mailbox, the same numbers Gmail's sidebar shows, unless you group by `day`, `week` or `month`. A group-by label counts at most 25 labels.

Older tiles may use named measures (`unread`, `threads`, `open_tickets`, `created_tickets`, `oldest_open`, calendar `hours`, `events`, `event_list`). They keep working; build new tiles with `records` where the source offers it.

### The board (`kind: "board"`)

The project's PandaOS board. No `ref`. Collection `tickets` with fields `list`, `type`, `priority`, `tag`, `status` (`open` or `done`) and `createdAt` as its time field. "Open tickets by priority" is `records` over `tickets`, filter `status is open`, metric `count`, group-by `priority`.

### Calendar and Sheets

- **Calendar** (`kind: "calendar"`): prefer the `events` collection when offered, with `hours` and `attendees` as numeric metrics and `start` as the time field. The named measures `hours` (hours in timed events), `events` (how many) and `event_list` (a table) still work, each with an optional calendar.
- **Sheets** (`kind: "sheets"`): `table`, `row_count` or `column_sum` over a spreadsheet link and a range like `Signups!A1:D`. The first row is the header. Sheets ignore the dashboard range.

### Other connected app collections

Use these sources only when `dashboard_sources` returns them. Its collection ids, fields, options and availability are authoritative; do not infer a connection from this guide.

| Source kind | What to track |
| --- | --- |
| `tasks` (Google Tasks) | Tasks by list and status, or over due dates |
| `trello` | Open cards by board, list, label or member |
| `jira` | Issues by project, status, type, priority or assignee |
| `github` | Issues and pull requests for the project's repository |
| `hubspot` | Deal amounts by stage or pipeline, and ticket counts by status or priority |

Build these with `measure: "records"` and the returned collection id. Read the collection description for its scope and limits. Snapshot collections count current state unless grouped over time; time-windowed collections follow the range. Preserve the source's returned `ref`, including sources that do not need one.

## 5. The build flow

1. **Call `dashboard_sources`** before anything else, so your suggestions come from what is actually connected.
2. **Ask one short question** about what to track, with two or three suggestions drawn from those sources ("Signups, revenue, or support load? I can read your Postgres, Supabase and Gmail."). Wait for the answer. If the user already said what they want, skip the question.
3. **Call `design_system_list`.** When the user has design systems, ask in the same message as step 2 whether the board should use one, naming them and recommending the default or the one that fits, or the standard look. Reuse a design system whenever one fits the board's audience (a company's own numbers, anything that will be shared); skip the question when there are none or the user already said.
4. **`dashboard_create`** with a short title, a one-sentence subtitle, a range that suits the question (`7d` for operations, `30d` or `mtd` for business numbers), and `designSystemId` when the user picked one.
5. **Add tiles** with `dashboard_add_tile`, following the layout recipe: numbers first, then charts, then the detail; with two or more groups, a `heading` before each.
6. **Check with `dashboard_get`** which tiles ran. Each line names the kind with its variant and series (`bar stacked, 3 series`). A tile that failed says why. **Fix every failed tile** with `dashboard_update_tile` (wrong column, wrong field, missing placeholder) or remove it, before you report the board as done.
7. **Offer a refresh cadence** (hourly suits most boards) and **sharing**. Remind the user scheduled refreshes run only while PandaOS is open.
8. Show the board with `dashboard_open`. Report in two or three sentences what it tracks.

To change a tile when the user rewrites it in a sentence, use `dashboard_update_tile`; a recipe or series change re-runs it, an options change ("make it a gauge against 8 hours") does not, except toggling `showDelta` on a number tile. `dashboard_refresh` re-runs every tile.

**Never paste raw rows back into the chat.** Tool results report one status line per tile. When a source hides its results from AI (a schema-only database connection), say that the tile ran and let the user read it on the board.

### Design system and logo

`designSystemId` (on `dashboard_create` or `dashboard_update`) gives the board the design system's background, card surface, text colour, accent, chart colours, fonts and corner radius, on the share link and in Animate too. Colours that would be hard to read, or two chart colours that look alike, are shaded or swapped automatically, so never pick colours by hand to fix contrast. `"none"` goes back to the standard look. `dashboard_get` names the look on its first line.

A design system brings its logo with it: picking one that has a logo puts it in the header on its own, so never ask about a logo while creating a board. Without a design system the board has no logo and you never bring one up; the user can add their own later in the board's settings. A logo goes in a fixed header slot. Pass `logo: { placement, height }` only when the user asks to move or resize it: `placement` `left` (the default, next to the title) or `right`; `height` in px, 20 small, 28 medium (the default), 40 large, anything from 16 to 96. Medium is the default; large suits a wide wordmark, small a square mark. On a board that already has a logo, `placement` and `height` move or resize that logo, the user's own upload included; add `source: "design-system"` only to swap an uploaded logo for the design system's. You cannot upload an image: when the user wants a logo of their own, tell them to upload it under Edit, Dashboard, Logo. `logo: "none"` removes it.

## 6. Connecting a source

When `dashboard_sources` is empty or lacks what the user wants, do not guess a connection. Point them at the right place with a link and one sentence:

- A database: [Database settings](pandaos://app-settings/database). Add the connection and link it to this project.
- Supabase: [Supabase settings](pandaos://app-settings/supabase). Connect the account and link the Supabase project to this PandaOS project.
- An app (Gmail, Calendar, Google Tasks, Trello, Jira, GitHub, HubSpot or Google Drive for Sheets): [Integrations](pandaos://integrations). Connect the account.

Then call `dashboard_sources` again once they say it is done.

## 7. Privacy

- Gmail, Calendar and Google Tasks tiles are **personal**. Personal and financial tiles are left out of a shared snapshot unless the owner ticks them in the Share popover. Mention this when the user shares a board with sensitive tiles, and respect each source's sensitivity.
- Gmail collections read message metadata (labels, sender, subject, date, flags) to filter and count. A tile **never reads message bodies**.
- A dashboard only reads. No tile writes to any source.
