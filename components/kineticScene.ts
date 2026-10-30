import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { gsap } from 'gsap';

/** One draw call for the orbiting pieces; all assets are generated locally. */
export function createKineticScene(host: HTMLDivElement, still: boolean, onLost: () => void) {
  let renderer: THREE.WebGLRenderer;
  try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: devicePixelRatio < 2, powerPreference: 'high-performance' }); }
  catch { return null; }
  const stage = host.closest<HTMLElement>('.hero') || host.parentElement!;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(39, 1, 0.1, 80);
  camera.position.z = 8.4;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.035);
  scene.environment = environment.texture;
  scene.fog = new THREE.FogExp2(0x08090a, 0.018);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
  renderer.setClearColor(0x08090a, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.appendChild(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);
  const metal = new THREE.MeshPhysicalMaterial({ color: '#d4d4d4', metalness: 1, roughness: 0.16, clearcoat: 1, envMapIntensity: 1.65 });
  const coreMaterial = metal.clone();
  const uniforms = { uTime: { value: 0 }, uEnergy: { value: 0 }, uPointer: { value: new THREE.Vector3(0, 0, 1) } };
  coreMaterial.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = `
      uniform float uTime;
      uniform float uEnergy;
      uniform vec3 uPointer;
      vec3 fieldShape(vec3 p) {
        vec3 n = normalize(p);
        float wave = sin(n.x * 3.6 + uTime * .6) * cos(n.y * 4.2 - uTime * .4) * sin(n.z * 3.8 + uTime * .35);
        float ripples = sin(length(n - uPointer) * 13. - uTime * 5.5) * uEnergy * .11;
        return p * (1. + wave * .16 + ripples);
      }
      ${shader.vertexShader}`
      .replace('#include <beginnormal_vertex>', `
        vec3 n = normalize(position);
        vec3 tangent = normalize(cross(n, abs(n.y) > .9 ? vec3(1.,0.,0.) : vec3(0.,1.,0.)));
        vec3 bitangent = normalize(cross(n, tangent));
        vec3 a = fieldShape(position);
        vec3 b = fieldShape(position + tangent * .012);
        vec3 c = fieldShape(position + bitangent * .012);
        vec3 objectNormal = normalize(cross(b-a,c-a));
        #ifdef USE_TANGENT
          vec3 objectTangent = vec3(tangent.xyz);
        #endif
      `)
      .replace('#include <begin_vertex>', 'vec3 transformed = fieldShape(position);');
  };
  const coreGeometry = new THREE.IcosahedronGeometry(1.06, 5);
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  group.add(core);

  const count = 336;
  const pieceGeometry = new THREE.CapsuleGeometry(0.075, 0.2, 4, 8);
  const pieces = new THREE.InstancedMesh(pieceGeometry, metal, count);
  pieces.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  pieces.frustumCulled = false;
  group.add(pieces);
  const helper = new THREE.Object3D();
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  const seed = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const filaments: THREE.LineLoop[] = [];
  const lineMaterial = new THREE.LineBasicMaterial({ color: '#a5a5a5', transparent: true, opacity: 0.13 });
  for (let band = 0; band < 5; band++) {
    const points = Array.from({ length: 140 }, (_, i) => {
      const t = i / 140 * Math.PI * 2;
      return new THREE.Vector3(Math.cos(t) * 2.12, Math.sin(t) * 2.12, 0);
    });
    const line = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points), lineMaterial);
    line.rotation.set(band * 0.67, band * 0.9, 0.3);
    group.add(line); filaments.push(line);
  }
  const dustPositions = new Float32Array(540 * 3);
  for (let i = 0; i < 540; i++) {
    dustPositions[i * 3] = (seed(i + 20) - 0.5) * 30;
    dustPositions[i * 3 + 1] = (seed(i + 1300) - 0.5) * 20;
    dustPositions[i * 3 + 2] = (seed(i + 8000) - 0.5) * 35 - 8;
  }
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  const dustMaterial = new THREE.PointsMaterial({ color: '#ffffff', size: 0.018, transparent: true, opacity: 0.48, depthWrite: false });
  const dust = new THREE.Points(dustGeometry, dustMaterial);
  scene.add(dust);

  const state = { progress: Number(stage.dataset.fieldProgress || 0), intro: still ? 1 : 0, energy: 0 };
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, influence: 0 };
  const introduction = gsap.to(state, { intro: 1, duration: 2.3, ease: 'power3.out' });
  let energy: gsap.core.Timeline | undefined;
  const pulse = () => {
    energy?.kill();
    energy = gsap.timeline().to(state, { energy: 1, duration: 0.18, ease: 'power2.out' }).to(state, { energy: 0, duration: 2.1, ease: 'power2.out' });
  };
  const move = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    const r = stage.getBoundingClientRect();
    pointer.targetX = (event.clientX - r.left) / r.width * 2 - 1;
    pointer.targetY = -((event.clientY - r.top) / r.height * 2 - 1);
    pointer.influence = 1;
  };
  const leave = () => { pointer.targetX = 0; pointer.targetY = 0; pointer.influence = 0; };
  const click = (event: PointerEvent) => { if (event.target === renderer.domElement) pulse(); };
  const progress = (event: Event) => { state.progress = (event as CustomEvent<number>).detail; };
  stage.addEventListener('pointermove', move, { passive: true });
  stage.addEventListener('pointerleave', leave);
  stage.addEventListener('pointerdown', click);
  stage.addEventListener('field:progress', progress);
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  const resizer = new ResizeObserver(resize);
  resizer.observe(host); resize();
  let visible = true;
  let broken = false;
  let elapsed = 0;
  let lastFrame = 0;
  let slowFrames = 0;
  let targetFps = 45;
  const v = new THREE.Vector3();
  const rotation = new THREE.Euler();
  let frames = 0;
  const draw = (clock: number, delta: number) => {
    if (broken || !visible || document.hidden || clock - lastFrame < 1 / targetFps) return;
    const dt = lastFrame ? Math.min(clock - lastFrame, 0.06) : 1 / 45;
    lastFrame = clock;
    if (!still) elapsed += dt;
    if (delta > 40) slowFrames++; else slowFrames = Math.max(0, slowFrames - 1);
    if (slowFrames > 18 && targetFps !== 24) { targetFps = 24; renderer.setPixelRatio(1); resize(); }
    const p = state.progress;
    const morph = THREE.MathUtils.smoothstep(p, 0.12, 0.82);
    const dissolve = THREE.MathUtils.smoothstep(p, 0.08, 0.54);
    const spring = Math.min(dt * 55, 2.5);
    pointer.x += (pointer.targetX - pointer.x) * 0.055;
    pointer.y += (pointer.targetY - pointer.y) * 0.055;
    group.position.set(THREE.MathUtils.lerp(still ? 0 : 1.48, 0, THREE.MathUtils.smoothstep(p, 0, 0.5)), 0, 0);
    const openingScale = still ? 1 : THREE.MathUtils.lerp(0.66, 1, THREE.MathUtils.smoothstep(camera.aspect, 1.1, 1.65));
    group.scale.setScalar(THREE.MathUtils.lerp(openingScale, 1, THREE.MathUtils.smoothstep(p, 0, 0.4)));
    group.rotation.set(pointer.y * 0.1, pointer.x * 0.16, 0);
    camera.position.z = 8.4 - THREE.MathUtils.smoothstep(p, 0.1, 1) * 5.5;
    camera.rotation.z = p * 0.12;
    core.rotation.set(elapsed * 0.12, elapsed * 0.17, -0.2);
    core.scale.setScalar(Math.max(0.001, (1 - dissolve) * (0.88 + state.intro * 0.12 + state.energy * 0.1)));
    uniforms.uTime.value = elapsed;
    uniforms.uEnergy.value = state.energy + pointer.influence * 0.18;
    uniforms.uPointer.value.set(pointer.x, pointer.y, 1).normalize();
    for (let i = 0; i < count; i++) {
      const band = Math.floor(i / 56);
      const t = (i % 56) / 56 * Math.PI * 2 + elapsed * (0.08 + band * 0.012);
      const r = 1.68 + Math.sin(t * 3 + band) * 0.08;
      v.set(Math.cos(t) * r, Math.sin(t) * r, Math.sin(t * 2 + band) * 0.09);
      rotation.set(band * 0.67, band * 0.87, 0.25);
      v.applyEuler(rotation);
      const tunnelRadius = 1.48 + band * 0.22;
      const tx = Math.cos(t + p * 2.4) * tunnelRadius;
      const ty = Math.sin(t + p * 2.4) * tunnelRadius;
      const tz = -band * 1.8 + p * 5;
      const assemble = 1 + (1 - state.intro) * 3;
      const influenceX = pointer.x * 3 - group.position.x;
      const influenceY = pointer.y * 2;
      const dx = v.x - influenceX, dy = v.y - influenceY;
      const repulsion = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 1.25) * pointer.influence * 0.42;
      const expand = 1 + state.energy * (0.5 + seed(i) * 0.7);
      const target = [THREE.MathUtils.lerp(v.x * assemble, tx, morph) * expand + dx * repulsion,
        THREE.MathUtils.lerp(v.y * assemble, ty, morph) * expand + dy * repulsion,
        THREE.MathUtils.lerp(v.z * assemble, tz, morph) * expand];
      for (let axis = 0; axis < 3; axis++) {
        const index = i * 3 + axis;
        if (frames === 0) positions[index] = target[axis];
        velocities[index] = (velocities[index] + (target[axis] - positions[index]) * 0.026 * spring) * Math.pow(0.8, spring);
        positions[index] += velocities[index] * spring;
      }
      helper.position.fromArray(positions, i * 3);
      helper.rotation.set(t + band, t * 0.7, elapsed * 0.15 + band);
      const size = 0.68 + seed(i + 100) * 0.55;
      helper.scale.setScalar(size * (0.72 + state.intro * 0.28));
      helper.updateMatrix(); pieces.setMatrixAt(i, helper.matrix);
    }
    pieces.instanceMatrix.needsUpdate = true;
    filaments.forEach((line, i) => {
      line.visible = p < 0.68;
      line.rotation.x = i * 0.67 + elapsed * 0.035;
      line.rotation.y = i * 0.9 + elapsed * 0.045;
      line.scale.setScalar(1 + state.energy * 0.38 + p * 1.7);
    });
    lineMaterial.opacity = (1 - dissolve) * 0.13;
    dust.rotation.z = elapsed * 0.008 + p * 0.15;
    dust.position.z = p * 4;
    renderer.render(scene, camera);
    frames++;
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    introduction.paused(!visible || document.hidden);
    energy?.paused(!visible || document.hidden);
  }, { rootMargin: '80px' });
  observer.observe(stage);
  const visibility = () => { introduction.paused(document.hidden || !visible); energy?.paused(document.hidden || !visible); };
  document.addEventListener('visibilitychange', visibility);
  const lost = (event: Event) => { event.preventDefault(); broken = true; gsap.ticker.remove(draw); onLost(); };
  renderer.domElement.addEventListener('webglcontextlost', lost);
  draw(0, 16);
  gsap.ticker.add(draw);
  return {
    pulse,
    dispose: () => {
      gsap.ticker.remove(draw); introduction.kill(); energy?.kill();
      observer.disconnect(); resizer.disconnect();
      stage.removeEventListener('pointermove', move); stage.removeEventListener('pointerleave', leave);
      stage.removeEventListener('pointerdown', click); stage.removeEventListener('field:progress', progress);
      document.removeEventListener('visibilitychange', visibility);
      renderer.domElement.removeEventListener('webglcontextlost', lost);
      coreGeometry.dispose(); coreMaterial.dispose(); metal.dispose(); pieceGeometry.dispose();
      filaments.forEach(line => line.geometry.dispose()); lineMaterial.dispose();
      dustGeometry.dispose(); dustMaterial.dispose(); environment.dispose(); room.dispose(); pmrem.dispose();
      renderer.dispose(); renderer.domElement.remove();
    },
  };
}
