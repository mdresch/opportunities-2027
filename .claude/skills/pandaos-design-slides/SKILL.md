---
name: pandaos-design-slides
description: "Create a slide deck in the PandaOS Design app: gather the deck's purpose, audience, and outline first, confirm the design system, then build polished HTML slides with design_create type \"slides\". They present full screen and export to PDF, HTML and an approximate PowerPoint."
user-invocable: true
disable-model-invocation: false
source: pandaos
---

# Design a Slide Deck

You create a **slide deck** in the PandaOS Design app as **HTML slides**: one self-contained HTML document, built with `design_create({ type: "slides", ... })` and iterated with `design_edit`. HTML is the real deck. It is styled with everything CSS can do, scales to any screen, presents full screen, and exports to **PDF** (one page per slide, exact) and **PowerPoint** (approximate: each slide becomes a picture of the design with editable text boxes over it). Design for the HTML first. Never water a deck down to what PowerPoint could draw.

The older structured deck engine (`design_slides_create` / `design_slides_modify`) still edits **existing** classic decks. Never start a new deck with it unless the user explicitly asks for the classic engine.

## House rules (ALL designs, non-negotiable)
- **No emojis, ever.** Never put an emoji glyph in a heading, label, button, nav item, or body copy, and never use one as a stand-in for an icon. For every icon, embed an inline **lucide** SVG (or a lucide `<i data-lucide="...">` element plus the lucide script). Lucide icons only.
- **No em dashes or en dashes in visible copy.** Use a colon, a comma, or a plain hyphen instead.
- **Confirm the design is on screen when you finish.** `design_create` opens the canvas by itself, but if the user was left on the Design home, end your turn with `design_open({ designId })` so the finished deck is showing.

## The Flow

### 1. Do NOT open the canvas yet
Gather direction in the chat first. The Design tab opens by itself, on the finished deck with a build animation, the moment `design_create` runs. Opening it earlier shows an empty canvas that competes with your questions. Call `design_open` only with `{ designId }` to bring an EXISTING design back on screen, or when the user explicitly asks to see the Design app.

### 2. Intent first: the outline is the spec
Open with purpose, not style. Gather (via `generative_ui` short_form, or plain prose if `generative_ui` isn't discoverable; search tools for `generative_ui` first):
- What is the deck for: pitch / report / training / talk?
- Who is the audience, and what should they decide or remember?
- Rough outline: which sections, roughly how many slides?
- Tone: formal / energetic / minimal?

**Depth gate: do NOT build after two questions.** A deck needs an outline first. Propose one, get it confirmed, THEN build. Never generate slides from a one-line ask.

**Gather fresh for each NEW deck.** Don't carry a prior design's direction over to a new deck in the same chat. Intake is per-design.

### 2b. Match the app you are designing for, before you invent a look

A design that does not look like the product it belongs to is a failed design, even when it is
pretty on its own. Whenever the design belongs to an existing app or site, spend a bounded effort
matching it before you propose anything fresh.

1. **Try the extractor first.** `design_system_import({ name: "<product> (codebase)", source: { kind: "codebase" } })`
   is a regex pass over the project's Tailwind config and CSS variables. No install, no dev server,
   about a second, and it returns a pack id you pass straight to `design_create` as `designSystemId`.
2. **If that finds nothing, read the app yourself. Time-boxed, roughly 6 files, no installs.**
   Tokens live in `tailwind.config.*`, `globals.css` / `index.css` / `app.css` / `theme.css`, any
   `:root` or `@theme` block, `components.json` (shadcn). The idiom lives in one or two real UI files
   that carry the app's chrome: a card, a button, the page shell, the nav. Read those and write down
   the actual values: palette plus surface and border colors, corner radius, border weight, shadow
   depth, font stacks, spacing density, light or dark default, icon set.
3. **Copy the idiom, not only the hex codes.** Same radius, same border weight and color, same
   shadow depth, same button and label shape, same density. A design with the right colors but 24px
   pills where the app uses 6px squared cards still reads as a different product.
4. **Put what you found into the document.** Declare the extracted values as CSS custom properties
   at the top of the HTML and build every component off those, so the match is real rather than
   approximate.
5. **Never** run `npm install`, add a dependency, or start a dev server for this. If a couple of
   reads turn up nothing usable, stop and move on to fresh proposals.

Propose a fresh direction only when there is genuinely nothing to match (a brand new product, a
standalone deck) or when the user asks for one. Either way, say in one line which you did: matched
the app's existing style, or proposed a fresh direction, and why.

### 3. One visual palette picker: saved systems live INSIDE it, not behind a yes/no
Before proposing colors, call `design_system_list` (packs from the current project + the global
personal library, each with its colors, scope, and id). Then present a **single `palette_picker`**
(search tools for `generative_ui` first). Do NOT ask a separate "reuse saved vs propose new" question
first. Build the picker's `options` in this order:
1. **Each saved design system as a real swatch**: use the pack's own `colors`, set the option `id`
   to the pack id, label by name + scope. This puts the current/on-brand system in the actual
   picker so the user picks it visually alongside fresh ideas.
2. **3-4 fresh proposed palettes** tuned to the brief: distinct directions, each previewed by its
   colors.
Leave `allowCustom` on so "Something else…" returns a described direction; for importing, point to
the **Design systems** panel or `design_system_import`.

- Never gate the palette behind a worded question: the saved system is one of the swatches.
- If the returned selection `id` matches a saved pack, pass it to `design_create` as
  `designSystemId`. If it's a fresh palette, carry its colors into the deck's CSS custom properties.
- If NO packs exist, the style you extracted in step 2b IS the first swatch (label it "Current app style"), shown alongside the fresh proposals. Never block.
- If `generative_ui` is unavailable, fall back to a plain worded choice listing saved systems by name +
  scope alongside a few proposed directions.

### 4. Type direction
After the palette, confirm the heading/body type direction (a short `generative_ui` or plain question).
Skip this when the user picked a saved design system, because it already defines its fonts.

### 5. Build
`design_create({ type: "slides", title, html, designSystemId })` with the confirmed outline and the chosen direction. Pass `designSystemId` when the user picked a saved system in step 3 or step 2b produced one. When the system has components, call `design_system_components({ designSystemId, type: "slides" })` first and reuse its blocks verbatim. Stamp a stable `data-eid` on every meaningful element so later changes are `design_edit` ops.

#### The slides contract (the runtime, the PDF and the PowerPoint export all read it)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Deck title</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
  <style>
    :root { --bg: #0f1115; --ink: #f4f4f5; --muted: #a1a1aa; --accent: #6d5efc; --font: 'Inter', Arial, sans-serif; }
    .slide { background: var(--bg); color: var(--ink); font-family: var(--font); padding: 120px 140px; display: flex; flex-direction: column; }
  </style>
</head>
<body>
  <main class="deck">
    <section class="slide" data-eid="s1"> ... <aside class="notes">What to say on this slide.</aside></section>
    <section class="slide" data-eid="s2"> ... </section>
  </main>
</body>
</html>
```

- One `<main class="deck">`; its **direct children** are the `<section class="slide">` elements, one per slide, in order.
- Every slide is designed on a fixed **1920 x 1080** canvas, in px. Do not set the slide's width, height, zoom or transform, and do not make slides responsive with media queries: the runtime scales the whole canvas to fit any screen, so a slide looks identical on a laptop, a phone, a projector and paper.
- Lay out *inside* each slide freely: flex, grid, absolute positioning, gradients, layered shapes, images, inline SVG, `backdrop-filter`, shadows. The runtime owns only the frame around slides (gutter, scaling, present mode, print pagination).
- Speaker notes go in `<aside class="notes">` inside the slide. They never render, and they travel to PowerPoint notes.
- Present mode is built in: viewers press **P** or the Present button in a shared or exported deck. Don't build your own navigation, slide counter or keyboard handling.
- Entry animations are optional and must end visible: exports capture each slide at its final state.

#### Type and spacing on a 1920 x 1080 slide
- Display / cover titles 112-160px, slide headlines 64-88px, sub-heads 36-44px, body 30-36px, captions and labels 22-26px. **Nothing under 22px**: it is unreadable on a projector.
- Safe margins of 120px or more on every side; an 8px rhythm for everything else.
- Max 2 families. Put an Office-safe fallback in every stack (`'Inter', Arial, sans-serif`; `'Playfair Display', Georgia, serif`), because PowerPoint uses the fallback when the web font is not installed.
- Line length for body copy at most ~60 characters; headlines at most ~8 words.

#### Keep the PowerPoint fallback decent (it costs nothing in the HTML)
The PowerPoint export turns real HTML text into editable text boxes and everything else into a picture. So:
- Keep words as real text in the DOM. Text drawn inside SVG, canvas, or an image, and text in CSS `content:` pseudo-elements, can only come across as part of the picture.
- Gradient or image-filled text (`background-clip: text`) stays in the picture on purpose; that is fine for one hero word, not for paragraphs.
- Charts: inline SVG. Their labels arrive as part of the picture, which reads fine.
- Put `data-pptx-image` on a block that must stay pixel-exact in PowerPoint (a logo lockup, a complex diagram): its text then stays in the picture instead of becoming text boxes.

### 6. Check it, iterate, export
After you build or edit, call `design_screenshot({ id })` and LOOK at the render before telling the user it is done. Check every slide against the craft floor below; fix with `design_edit`, then screenshot again.

Iterate with **`design_edit`** by default: surgical ops keyed by `data-eid` (`setStyle` / `setText` / `insert` / `delete` / `setVar`) that keep everything you don't touch, including the user's own edits on the canvas. Add a slide with an `insert` op `after` the previous slide's `data-eid`. Reserve `design_regenerate` for a redesign of most of the deck; it must keep the deck contract. Every version is saved and revertable.

Need imagery? `design_generate_image({ id, prompt })` generates one into the design's media and returns a URL for an `<img>` or a CSS `background-image`. Reuse an existing image with `design_add_media`.

When approved, tell the user how to get it out: **Export** on the canvas gives **PDF** (exact, one page per slide, the best file to send), **HTML** (self-contained, presents full screen in any browser), and **PowerPoint (approximate)** for people who must edit in PowerPoint or Keynote. `design_share` publishes a link that presents in the browser. `design_slides_export_google({ designId })` uploads the PowerPoint version to Google Slides. Say plainly that the PowerPoint version is a fallback: it looks like the deck and its text is editable, but shapes are part of a picture and fonts PowerPoint lacks are substituted.

## Deck specifics
- One idea per slide; the headline states the takeaway (assertion-evidence), not a topic label.
- Big type, generous margins; visuals over bullet walls. Max ~5 bullets when bullets are unavoidable.
- A clear arc: hook, context, argument/content, takeaway, ask.
- Real content over lorem; a consistent system of layouts, colors and type across slides.

## Compose: match the slide to the shape of the idea (sameness is what makes decks boring)
A deck where every slide is "headline + bullets" or "headline + two columns" reads as flat and template-y. That is the #1 failure. Design each slide around what it has to say:

- **Openers and breaks**: a cover with a strong type lockup; full-bleed **section dividers** in an accent or dark color between acts.
- **One number that matters**: a huge figure (240-400px) with a one-line label and context. A single stat gets a whole slide.
- **A claim worth landing**: a callout or pull quote with real presence (large type, an accent rule or mark, generous space).
- **Capabilities / benefits**: icon + heading + one-line blurb, as 3-4 rows or a 2x2 / 2x3 grid of cards. Never a bullet wall.
- **Evidence / trends**: an inline SVG chart with the takeaway as the headline; a row of 3-4 stat tiles only for peer metrics.
- **Two things opposed**: a before/after or us/them comparison with clearly different visual weight on each side.
- **Sequence, roadmap, how it works**: numbered steps or a dated timeline with a connecting line.
- **People**: portrait cards with name and role.
- **Anything visual**: full-bleed image with a scrim and overlaid headline, or image left/right with text. A pitch or story deck with zero imagery is a red flag.

**Rhythm rule:** vary the composition every 1-2 slides, and break a light deck with a dark or accent slide at each section boundary (or the reverse for a dark deck). A deck that never changes background or structure is the boring default you are avoiding.

**Anti-void rule (critical):** never leave a slide 60% empty because the content is thin. Pick a composition that fills the frame with meaning (big number, quote, section, image) or merge the slide into another.

**Match richness to deck type.** What you learned in step 2 decides it:
- **Pitch / marketing / talk / story**: high richness. Every content slide earns a visual or structural device (image, chart, big number, callout, comparison, timeline). Lean on imagery and bold section breaks.
- **Report / research / training / internal**: restraint reads as clarity. Structured layouts (stat tiles, comparison, chart, table) and disciplined whitespace beat decoration. Variety still applies: vary structure, not ornament.

**Materials, not flat fills.** Give surfaces depth where the direction allows it: subtle gradients, a soft noise or grid texture, layered shapes, real shadows on cards, a consistent accent used sparingly. Tables are real `<table>` elements styled to match, max ~4 columns and 6 rows per slide.

## Craft floor (non-negotiable)
Consistent type scale across slides, max 2 families; contrast at least 4.5:1 for body text; one focal point per slide; restrained palette led by the design system; nothing under 22px; no cramped slides, no default-template look. No deck where more than ~half the slides share one composition, and no slide left mostly empty. No text overflowing its slide: check the screenshot.
