"use client";
import * as THREE from "three";
import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { BallCollider, Physics, RigidBody, CylinderCollider } from "@react-three/rapier";

/* ── Mobile detection (browser-only) ── */
function isMobile() {
  return (
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (window.innerWidth <= 1024 && "ontouchstart" in window)
  );
}

/* ── Canvas-generated text-based textures ── */
function createTextTexture(abbr, bg) {
  const s = 512;
  const canvas = document.createElement("canvas");
  canvas.width = s;
  canvas.height = s;
  const ctx = canvas.getContext("2d");

  // High-quality canvas smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Background circle
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2);
  ctx.fill();

  // Subtle border
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, s / 2 - 8, 0, Math.PI * 2);
  ctx.stroke();

  // Centered text
  const fs = abbr.length > 3 ? 100 : abbr.length > 2 ? 130 : 170;
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${fs}px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(abbr, s / 2, s / 2 + 8);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 16; // Maximum crispness when rotating
  return texture;
}

const TECH_DEFS = [
  { name: "Java", abbr: "Java", bg: "#f89820" },
  { name: "JavaScript", abbr: "JS", bg: "#f7df1e" },
  { name: "HTML5", abbr: "HTML", bg: "#e34f26" },
  { name: "CSS3", abbr: "CSS", bg: "#1572b6" },
  { name: "React.js", abbr: "Rct", bg: "#20232a" },
  { name: "Tailwind CSS", abbr: "TW", bg: "#0ea5e9" },
  { name: "Node.js", abbr: "Nd", bg: "#1e293b" },
  { name: "Express.js", abbr: "Exp", bg: "#475569" },
  { name: "REST APIs", abbr: "API", bg: "#10b981" },
  { name: "MongoDB", abbr: "Mdb", bg: "#0b1c1e" },
  { name: "MySQL", abbr: "SQL", bg: "#00758f" },
  { name: "OOP", abbr: "OOP", bg: "#7c3aed" },
  { name: "DSA", abbr: "DSA", bg: "#db2777" },
  { name: "Problem Solving", abbr: "PS", bg: "#6366f1" },
  { name: "Git", abbr: "Git", bg: "#f05032" },
  { name: "GitHub", abbr: "GH", bg: "#24292e" },
  { name: "VS Code", abbr: "VS", bg: "#007acc" },
  { name: "IntelliJ IDEA", abbr: "IDEA", bg: "#000000" },
  { name: "Eclipse", abbr: "Ecl", bg: "#2c2255" },
  { name: "Postman", abbr: "PM", bg: "#ff6c37" }
];

const BALL_COUNT = TECH_DEFS.length;

/* ── Geometry (shared) ── */
const sphereGeometry = new THREE.SphereGeometry(1, 48, 48);

/* ── Shuffle helper ── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const _impulseVec = new THREE.Vector3();

/* ── Physics ball ── */
function Ball({ scale, material, isActive }) {
  const api = useRef(null);
  const r = THREE.MathUtils.randFloatSpread;
  const vec = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    if (!api.current || !isActive) return;
    delta = Math.min(0.1, delta);
    const t = api.current.translation();
    
    // Normalize translation vector to get constant return force direction
    vec.current.set(t.x, t.y, t.z).normalize();
    
    // Pull back to center (y-force is stronger to clamp to horizontal line)
    _impulseVec.set(
      vec.current.x * -120 * delta * scale,
      vec.current.y * -340 * delta * scale,
      vec.current.z * -120 * delta * scale
    );
    api.current.applyImpulse(_impulseVec, true);
    state.invalidate();
  });

  return (
    <RigidBody
      linearDamping={1.6} /* High damping for slow-motion floaty glide */
      angularDamping={0.6}
      friction={0.2}
      position={[r(20), r(20) - 20, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.25 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

/* ── Pointer (follows mouse) ── */
const _pointerTarget = new THREE.Vector3();

function Pointer({ isActive }) {
  const ref = useRef(null);
  const vec = useRef(new THREE.Vector3());

  useFrame((state) => {
    if (!ref.current || !isActive) return;
    const { pointer, viewport } = state;
    _pointerTarget.set(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0
    );
    vec.current.lerp(_pointerTarget, 0.2); // matches reference project
    ref.current.setNextKinematicTranslation(vec.current);
    state.invalidate();
  });

  return (
    <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[2.5]} /> {/* increased radius for high touch sensitivity */}
    </RigidBody>
  );
}

/* ── Scene (rendered inside Canvas) ── */
function BallsScene({ mobile, isActive }) {
  const materials = useMemo(() => {
    return TECH_DEFS.map((tech) => {
      const tex = createTextTexture(tech.abbr, tech.bg);
      return new THREE.MeshPhysicalMaterial({
        map: tex,
        emissive: "#ffffff",
        emissiveMap: tex,
        emissiveIntensity: 0.28,
        metalness: 0.45,
        roughness: 0.85,
        clearcoat: 0.1,
      });
    });
  }, []);

  // Scaled up balls sizes so logos look beautifully prominent
  const balls = useMemo(() => {
    const sizes = [1.2, 1.45, 1.25, 1.35, 1.3];
    const indices = shuffle(Array.from({ length: BALL_COUNT }, (_, i) => i));
    return indices.map((texIdx, i) => ({
      scale: sizes[i % sizes.length],
      texIdx,
    }));
  }, []);

  return (
    <>
      <ambientLight intensity={1.1} />
      <spotLight
        position={[20, 20, 25]}
        penumbra={1}
        angle={0.2}
        color="white"
        castShadow={!mobile}
        shadow-mapSize={mobile ? [128, 128] : [256, 256]}
      />
      <directionalLight position={[0, 5, -4]} intensity={2.2} />

      <Physics gravity={[0, 0, 0]}>
        <Pointer isActive={isActive} />
        {balls.map(({ scale, texIdx }, i) => (
          <Ball
            key={i}
            scale={scale}
            material={materials[texIdx] ?? materials[0]}
            isActive={isActive}
          />
        ))}
      </Physics>

      {!mobile && (
        <Environment preset="city" environmentIntensity={0.5} />
      )}
    </>
  );
}

/* ── Exported Component (Clean Canvas wrapper) ── */
export default function TechBalls() {
  const [mounted, setMounted] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setMobile(isMobile());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div ref={sectionRef} className="w-full h-full relative min-h-[350px]">
      <Canvas
        frameloop="demand"
        dpr={mobile ? [1, 1.5] : [1, 2]}
        gl={{ alpha: true, stencil: false, depth: true, antialias: true }}
        camera={{
          position: [0, 0, 20],
          fov: mobile ? 45 : 36,
          near: 1,
          far: 100,
        }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <BallsScene mobile={mobile} isActive={isActive} />
        </Suspense>
      </Canvas>
    </div>
  );
}
