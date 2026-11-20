/** Illustrative city and aircraft. All motion is a pure function of stage time. */
import * as THREE from 'pandaos-lib://three'
const canvas = document.querySelector('[data-eid="dash-scene"]')
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true })
renderer.setSize(1280, 1080, false)
renderer.setPixelRatio(1)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setClearColor(0x000000, 0)
renderer.outputColorSpace = THREE.SRGBColorSpace
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(34, 1280 / 1080, 0.1, 150)
const css = getComputedStyle(document.documentElement)
const primary = css.getPropertyValue('--primary').trim() || '#3568ed'
const secondary = css.getPropertyValue('--secondary').trim() || '#dce6ed'
const accent = css.getPropertyValue('--accent').trim() || '#1a8f87'
const mat = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.65, ...extra })
const pale = mat(secondary)
const white = mat('#fcfdff')
const blue = mat(primary)
const teal = mat(accent)
const asphalt = mat('#bccdd4')
scene.add(new THREE.HemisphereLight(0xffffff, 0xb0c2d0, 2.6))
const light = new THREE.DirectionalLight(0xffffff, 3)
light.position.set(-12, 22, 8)
light.castShadow = true
light.shadow.mapSize.set(2048, 2048)
Object.assign(light.shadow.camera, { left: -20, right: 20, top: 20, bottom: -20 })
light.shadow.bias = -0.0005
scene.add(light)
function box(parent, x, y, z, w, h, d, material) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material)
  mesh.position.set(x, y, z)
  mesh.castShadow = true
  mesh.receiveShadow = true
  parent.add(mesh)
  return mesh
}
const city = new THREE.Group()
scene.add(city)
box(city, 0, -0.4, 0, 21, 0.7, 18, pale)
for (const z of [-5, 0, 5]) box(city, 0, 0.025, z, 20.7, 0.055, 0.85, asphalt)
for (const x of [-7, -1, 5]) box(city, x, 0.03, 0, 0.8, 0.06, 17.6, asphalt)
const towers = []
for (let i = 0; i < 28; i++) {
  const col = i % 7, row = Math.floor(i / 7)
  const x = -8.6 + col * 2.75, z = -6.9 + row * 4.5
  // The last row's east half is the airport apron and terminal.
  if (row === 3 && col >= 3) continue
  const height = 0.7 + ((i * 17 + 11) % 23) / 8
  const group = new THREE.Group()
  group.position.set(x, 0, z)
  city.add(group)
  box(group, 0, height / 2, 0, 1.35, height, 1.8, i % 8 === 0 ? teal : white)
  box(group, 0, height + 0.09, 0, 1.4, 0.18, 1.85, pale)
  for (let floor = 0.5; floor < height - 0.2; floor += 0.55) {
    box(group, 0, floor, 0.91, 0.93, 0.14, 0.015, blue)
    box(group, 0.68, floor, 0, 0.015, 0.14, 1.25, blue)
  }
  towers.push(group)
}
// Airport apron and terminal: illustrative, not a geographical reconstruction.
box(city, 3.1, 0.07, 7.1, 7.2, 0.14, 2.3, asphalt)
box(city, 3.1, 0.48, 5.9, 5.7, 0.9, 0.7, teal)
for (let i = 0; i < 8; i++) box(city, -0.2 + i * 0.85, 0.16, 7.1, 0.4, 0.02, 0.1, white)
const plane = new THREE.Group()
scene.add(plane)
const fuselage = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, 2.5, 8, 20), white)
fuselage.rotation.z = -Math.PI / 2
plane.add(fuselage)
box(plane, -0.15, 0, 0, 0.8, 0.12, 3.5, white)
box(plane, -1.1, 0.02, 0, 0.45, 0.1, 1.4, blue)
box(plane, -1.25, 0.38, 0, 0.65, 0.65, 0.1, blue)
box(plane, 0, -0.15, -1.0, 0.8, 0.28, 0.28, teal)
box(plane, 0, -0.15, 1.0, 0.8, 0.28, 0.28, teal)
for (let i = 0; i < 6; i++) {
  box(plane, 0.7 - i * 0.26, 0.1, 0.235, 0.11, 0.09, 0.02, blue)
  box(plane, 0.7 - i * 0.26, 0.1, -0.235, 0.11, 0.09, 0.02, blue)
}
plane.traverse((m) => { if (m.isMesh) m.castShadow = true })
const route = new THREE.CatmullRomCurve3([
  new THREE.Vector3(3.1, 0.6, 7.1), new THREE.Vector3(-3, 4.5, 4),
  new THREE.Vector3(-4, 7, -3), new THREE.Vector3(4, 8, -7), new THREE.Vector3(13, 8.5, -9),
])
const pathGeometry = new THREE.BufferGeometry().setFromPoints(route.getPoints(180))
const trail = new THREE.Line(pathGeometry, new THREE.LineBasicMaterial({ color: primary, transparent: true, opacity: 0.8 }))
scene.add(trail)
const pin = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.05, 12, 60), teal)
pin.rotation.x = -Math.PI / 2
pin.position.set(3.1, 0.22, 7.1)
scene.add(pin)
const clamp = (x) => Math.min(1, Math.max(0, x))
const ease = (x) => 1 - Math.pow(1 - clamp(x), 3)
;(window.__motionHooks = window.__motionHooks || []).push({
  frame(t) {
    towers.forEach((tower, i) => { tower.scale.y = Math.max(0.001, ease((t - 0.3 - i * 0.035) / 1.5)) })
    const progress = clamp((t - 2.4) / 8.8)
    plane.position.copy(route.getPointAt(progress))
    const tangent = route.getTangentAt(progress)
    plane.rotation.set(0, -Math.atan2(tangent.z, tangent.x), Math.atan2(tangent.y, Math.hypot(tangent.x, tangent.z)) * 0.6)
    plane.visible = t >= 2.4
    trail.geometry.setDrawRange(0, Math.max(0, Math.floor(progress * 181)))
    const orbit = -0.55 + t * 0.014
    camera.position.set(Math.sin(orbit) * 30, 22 - ease(t / 14) * 2, Math.cos(orbit) * 30)
    camera.lookAt(0, 1.1, 0)
    pin.scale.setScalar(1 + 0.12 * Math.sin(t * 2))
    renderer.render(scene, camera)
  },
})
