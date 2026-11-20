/**
 * Cinematic 3D starter: a skyline whose towers ARE the numbers of one bound chart sprite.
 * One tower per row, height proportional to the row's value, read from the bound sprite in
 * prepare, so Refresh numbers reshapes the scene too. Everything moves as a pure function of
 * the stage time t. Paste inside <script type="module"> and tune the CONFIG block only.
 */
import * as THREE from 'pandaos-lib://three'

const CONFIG = {
  canvas: '[data-eid="dash-scene"]',
  dataEid: 'dash-chart-1', // the bound chart sprite whose rows become towers
  growAt: 0.4, // towers rise from here, staggered
  heroAt: 3.2, // the tallest tower lights in the accent from here
  motif: 'aircraft', // 'aircraft' for travel topics, or null; it is illustrative, label it
  orbit: { from: -0.75, speed: 0.022, radius: 26 }, // the radius grows with the skyline
  textSide: 'left', // where the figures sit; the skyline is framed on the other side
}

const canvas = document.querySelector(CONFIG.canvas)
const W = canvas.width, H = canvas.height
const css = getComputedStyle(document.documentElement)
const color = (name, fallback) => css.getPropertyValue(name).trim() || fallback
const accent = color('--accent', '#5b8cff')
const towerColor = color('--tower', '#26304a')
const groundColor = color('--ground', '#121826')

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true })
renderer.setPixelRatio(1)
renderer.setSize(W, H, false)
renderer.shadowMap.enabled = true
renderer.outputColorSpace = THREE.SRGBColorSpace
const scene = new THREE.Scene()
scene.fog = new THREE.Fog(color('--haze', '#07090f'), 45, 120)
const camera = new THREE.PerspectiveCamera(32, W / H, 0.1, 200)
// Off-centre framing: the skyline sits in the half the text leaves free, never under it.
camera.setViewOffset(W, H, (CONFIG.textSide === 'right' ? 0.2 : -0.2) * W, 0, W, H)
scene.add(new THREE.HemisphereLight(0xdfe8ff, 0x0b0f18, 1.4))
const key = new THREE.DirectionalLight(0xffffff, 2.6)
key.position.set(-14, 24, 12)
key.castShadow = true
key.shadow.mapSize.set(2048, 2048)
Object.assign(key.shadow.camera, { left: -40, right: 40, top: 40, bottom: -40 })
scene.add(key)

const ground = new THREE.Mesh(new THREE.CircleGeometry(80, 96), new THREE.MeshStandardMaterial({ color: groundColor, roughness: 0.95 }))
ground.rotation.x = -Math.PI / 2
ground.receiveShadow = true
scene.add(ground)
const grid = new THREE.GridHelper(160, 80, accent, accent)
grid.material.transparent = true
grid.material.opacity = 0.08
grid.position.y = 0.01
scene.add(grid)

const clamp = (x) => Math.min(1, Math.max(0, x))
const easeOut = (x) => 1 - Math.pow(1 - clamp(x), 3)
const towers = []
let tallest = -1

/** Rows of the bound chart as [label, value], second column, non-numbers dropped. */
function readRows() {
  const data = window.__motionData && window.__motionData(CONFIG.dataEid)
  const rows = (data && data.chart && data.chart.rows) || []
  return rows.map((r) => [String(r[0]), Number(r[1])]).filter((r) => Number.isFinite(r[1]) && r[1] >= 0)
}

let footprint = 10
let peak = 6

/** Rows in reading order: left to right, then front to back. Few rows make one street. */
function buildTowers(rows) {
  if (rows.length === 0) throw new Error(`No numbers on ${CONFIG.dataEid}: bind a chart sprite with that eid first`)
  const max = Math.max(1, ...rows.map((r) => r[1]))
  const n = rows.length
  const cols = n <= 8 ? n : Math.ceil(Math.sqrt(n * 2))
  const lines = Math.ceil(n / cols)
  const width = 1.3, pitch = 2.2
  footprint = Math.max(cols, lines) * pitch
  peak = Math.max(4, footprint * 0.42)
  rows.forEach(([label, value], i) => {
    const col = i % cols, line = Math.floor(i / cols)
    const height = 0.2 + (value / max) * peak
    const material = new THREE.MeshStandardMaterial({ color: towerColor, roughness: 0.35, metalness: 0.2, emissive: accent, emissiveIntensity: 0.06 })
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, 1, width), material)
    // A lit cap on every tower: reads as a skyline at night and marks each value's top.
    const cap = new THREE.Mesh(new THREE.BoxGeometry(width * 1.02, 0.12, width * 1.02), new THREE.MeshBasicMaterial({ color: accent }))
    scene.add(cap)
    mesh.position.set((col - (cols - 1) / 2) * pitch, 0, (line - (lines - 1) / 2) * pitch)
    mesh.castShadow = true
    mesh.receiveShadow = true
    scene.add(mesh)
    towers.push({ mesh, cap, height, label, value })
    if (tallest < 0 || value > towers[tallest].value) tallest = towers.length - 1
  })
}

function buildAircraft() {
  const plane = new THREE.Group()
  const white = new THREE.MeshStandardMaterial({ color: 0xf6f8fc, roughness: 0.4 })
  const tint = new THREE.MeshStandardMaterial({ color: accent, roughness: 0.4 })
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 2.6, 8, 20), white)
  body.rotation.z = -Math.PI / 2
  plane.add(body)
  const part = (w, h, d, x, y, z, m) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y, z); plane.add(b) }
  part(0.8, 0.1, 3.8, -0.1, 0, 0, white)
  part(0.6, 0.7, 0.1, -1.3, 0.4, 0, tint)
  part(0.45, 0.08, 1.4, -1.2, 0.05, 0, tint)
  plane.traverse((m) => { if (m.isMesh) m.castShadow = true })
  scene.add(plane)
  // Sized off the skyline and kept behind it, so the aircraft never fills the lens.
  const S = footprint
  const route = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-S * 0.9, 1.5, -S * 0.1), new THREE.Vector3(-S * 0.2, S * 0.35, -S * 0.45),
    new THREE.Vector3(S * 0.5, S * 0.6, -S * 0.7), new THREE.Vector3(S * 1.3, S * 0.8, -S * 0.9),
  ])
  const trail = new THREE.Line(new THREE.BufferGeometry().setFromPoints(route.getPoints(200)), new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.7 }))
  scene.add(trail)
  return (t) => {
    const p = clamp((t - 1.6) / 10)
    plane.visible = t >= 1.6 && p < 1
    plane.position.copy(route.getPointAt(p))
    const d = route.getTangentAt(p)
    plane.rotation.set(0, -Math.atan2(d.z, d.x), Math.atan2(d.y, Math.hypot(d.x, d.z)) * 0.6)
    trail.geometry.setDrawRange(0, Math.floor(p * 201))
  }
}

let motifFrame = null
;(window.__motionHooks = window.__motionHooks || []).push({
  prepare() {
    buildTowers(readRows())
    if (CONFIG.motif === 'aircraft') motifFrame = buildAircraft()
  },
  frame(t) {
    towers.forEach((tower, i) => {
      const grown = easeOut((t - CONFIG.growAt - i * 0.05) / 1.4)
      const h = Math.max(0.001, tower.height * grown)
      tower.mesh.scale.y = h
      tower.mesh.position.y = h / 2
      tower.cap.position.set(tower.mesh.position.x, h + 0.06, tower.mesh.position.z)
      tower.cap.visible = grown > 0.02
      tower.mesh.material.emissiveIntensity = i === tallest ? 0.06 + 0.8 * easeOut((t - CONFIG.heroAt) / 0.8) : 0.06
    })
    if (motifFrame) motifFrame(t)
    const o = CONFIG.orbit
    const a = o.from + t * o.speed
    const r = Math.max(o.radius, footprint * 2.3)
    camera.position.set(Math.sin(a) * r, r * 0.42 - easeOut(t / 14) * r * 0.08, Math.cos(a) * r)
    camera.lookAt(0, peak * 0.3, 0)
    renderer.render(scene, camera)
  },
})
