# Libraries in a motion design: Three.js and d3

PandaOS ships two script libraries with the app and serves them itself, so a scene that uses them
plays on the canvas, scrubs, and exports to MP4 with no network at all. Use them only through a
**scene hook** (see the Motion contract in SKILL.md): the runtime hands you the stage time `t` and you
draw the whole scene for that `t`.

| Library | Version | How to load it |
| --- | --- | --- |
| Three.js | 0.185.1 | `import * as THREE from 'pandaos-lib://three'` inside `<script type="module">` |
| d3 | 7.9.0 | `<script src="pandaos-lib://d3"></script>`, then the global `d3` |

Always write the `pandaos-lib://` address, never a CDN URL for these two. PandaOS swaps it for the
copy inside the app on the canvas and in export, and for the identical pinned version on a public
CDN in a share link or an exported HTML file. Any other `pandaos-lib://` name is not available, and
the design tools will say so.

## d3: a bar chart that grows in

d3 is for building the shapes and scales once. The growth itself comes from `t`, never from
`selection.transition()`, which runs on its own clock.

```html
<svg data-eid="chart" width="1400" height="700"></svg>
<script src="pandaos-lib://d3"></script>
<script>
  (window.__motionHooks = window.__motionHooks || []).push({
    prepare: function () {
      var data = [42, 58, 61, 77, 93]
      var svg = d3.select('[data-eid="chart"]')
      var x = d3.scaleBand().domain(data.map(function (_, i) { return i })).range([0, 1400]).padding(0.25)
      var y = d3.scaleLinear().domain([0, 100]).range([700, 0])
      this.bars = svg.selectAll('rect').data(data).join('rect')
        .attr('x', function (_, i) { return x(i) }).attr('width', x.bandwidth()).attr('rx', 12).attr('fill', '#7c5cff')
      this.y = y
    },
    frame: function (t) {
      var y = this.y
      this.bars.each(function (v, i) {
        // Each bar grows over 0.6s, staggered by 0.08s, eased with d3's own curve.
        var p = d3.easeCubicOut(Math.min(1, Math.max(0, (t - 0.4 - i * 0.08) / 0.6)))
        var h = (700 - y(v)) * p
        this.setAttribute('y', 700 - h); this.setAttribute('height', h)
      })
    },
  })
</script>
```

## Three.js: a slowly orbiting object

Render on demand from `t`. Never call `renderer.setAnimationLoop` or `requestAnimationFrame`.
Pass `preserveDrawingBuffer: true` so every exported frame captures the canvas.

```html
<canvas data-eid="scene" width="1920" height="1080"></canvas>
<script type="module">
  import * as THREE from 'pandaos-lib://three'
  const canvas = document.querySelector('[data-eid="scene"]')
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true })
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(35, 1920 / 1080, 0.1, 100)
  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1, 0.32, 220, 32), new THREE.MeshStandardMaterial({ color: 0x7c5cff, metalness: 0.4, roughness: 0.25 }))
  scene.add(knot, new THREE.AmbientLight(0xffffff, 0.5))
  const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(3, 4, 5); scene.add(key)
  ;(window.__motionHooks = window.__motionHooks || []).push({
    frame: (t) => {
      camera.position.set(Math.sin(t * 0.35) * 6, 1.5, Math.cos(t * 0.35) * 6)
      camera.lookAt(0, 0, 0)
      knot.rotation.y = t * 0.6
      renderer.render(scene, camera)
    },
  })
</script>
```

## Reading the real numbers in a scene

`window.__motionData(eid)` returns the figures a sprite carries after binding:
`{ value, chart: { columns, rows } }`, or `null` for an unknown eid. Read it in `prepare` and
size geometry from it, so a scene never carries a typed number and Refresh numbers reshapes it
with everything else. `references/scenes/data-skyline.js` builds one tower per chart row this
way.

## Particles and other randomness

Create one seeded generator per system with `window.__motionRandom(seed)` and draw the particles'
starting values from it ONCE in `prepare`. In `frame`, place each particle as a pure function of its
starting values and `t`. That way frame 90 looks the same during playback, after a scrub, and in
the MP4.

## Checklist

- The library is loaded with `pandaos-lib://`, not a CDN URL.
- All drawing happens in `frame(t)`, and each call draws the full state for that `t`.
- No `transition()`, `setAnimationLoop`, `requestAnimationFrame`, timers or `Date`.
- A WebGL canvas uses `preserveDrawingBuffer: true`.
- The canvas or SVG is also a sprite in the manifest if it should fade, move or exit with the beat.
