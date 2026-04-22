'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ─────────────────────────────────────────────────────
   Luxury high-rise tower — procedural architecture
   ───────────────────────────────────────────────────── */
function Building() {
  const groupRef = useRef<THREE.Group>(null);
  const windowLightsRef = useRef<THREE.Group>(null);

  /* ── Realistic architecture material palette ── */

  // Precast concrete / podium base — warm mid-grey, visible on dark bg
  const matConcrete = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#58545a',
        metalness: 0.05,
        roughness: 0.88,
      }),
    []
  );

  // Travertine / limestone podium cladding — warmer, lighter stone tone
  const matStone = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#9e9490',
        metalness: 0.0,
        roughness: 0.92,
      }),
    []
  );

  // Dark anthracite structural frame / core panels
  const matDarkSteel = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2e2e36',
        metalness: 0.55,
        roughness: 0.55,
        envMapIntensity: 1.2,
      }),
    []
  );

  // Deep blue-green tinted curtain wall glass — emissive so Bloom picks it up
  const matGlass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#1a3d58',
        emissive: '#0a2a4a',
        emissiveIntensity: 0.4,
        metalness: 0.9,
        roughness: 0.04,
        transparent: true,
        opacity: 0.65,
        transmission: 0.35,
        thickness: 0.8,
        envMapIntensity: 4,
        reflectivity: 1,
      }),
    []
  );

  // Lighter blue-green for side / rear glass panels
  const matGlassSide = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#1e4a6e',
        emissive: '#0d2e4a',
        emissiveIntensity: 0.3,
        metalness: 0.85,
        roughness: 0.06,
        transparent: true,
        opacity: 0.55,
        transmission: 0.4,
        thickness: 0.6,
        envMapIntensity: 3.5,
        reflectivity: 0.9,
      }),
    []
  );

  // Champagne bronze / gold — emissive so fins + crown glow through Bloom
  const matGoldTrim = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#c8a96e',
        emissive: '#c8a030',
        emissiveIntensity: 0.6,
        metalness: 1.0,
        roughness: 0.12,
        envMapIntensity: 2.5,
      }),
    []
  );

  // Brushed aluminium — window frames, spandrel infill panels
  const matAluminium = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#8a8e9a',
        metalness: 0.9,
        roughness: 0.3,
        envMapIntensity: 1.6,
      }),
    []
  );

  /* Window grid: emissive quads on the tower face */
  const windowData = useMemo(() => {
    const wins: { pos: [number, number, number]; lit: boolean }[] = [];
    const cols = 6;
    const rows = 22;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        wins.push({
          pos: [
            -0.5 + (c / (cols - 1)) * 1.0,
            0.6 + r * 0.32,
            0.76,
          ] as [number, number, number],
          lit: Math.random() > 0.25,
        });
      }
    }
    return wins;
  }, []);

  /* Vertical structural fins on the main tower face */
  const finPositions = useMemo(
    () => [-0.6, -0.3, 0, 0.3, 0.6] as number[],
    []
  );

  /* Slow breathing & gentle sway */
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.08;
    groupRef.current.position.y = Math.sin(t * 0.25) * 0.06 - 0.4;

    /* Flicker a few window lights */
    if (windowLightsRef.current) {
      windowLightsRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (i % 17 === 0) {
          mat.emissiveIntensity = 0.6 + Math.sin(t * 3 + i) * 0.3;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>

      {/* ── PODIUM (wide base, 3 stepped levels) ── */}
      {/* Base slab — raw concrete */}
      <mesh position={[0, -0.25, 0]} castShadow receiveShadow material={matConcrete}>
        <boxGeometry args={[5.2, 0.5, 3.2]} />
      </mesh>
      {/* Podium level 1 — stone cladding */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow material={matStone}>
        <boxGeometry args={[4.4, 1.1, 2.8]} />
      </mesh>
      {/* Podium level 2 — stone cladding */}
      <mesh position={[0, 1.4, 0]} castShadow receiveShadow material={matStone}>
        <boxGeometry args={[3.4, 0.8, 2.4]} />
      </mesh>
      {/* Podium glass curtain wall — full front glass */}
      <mesh position={[0, 0.7, 1.41]} material={matGlass}>
        <planeGeometry args={[4.3, 1.9]} />
      </mesh>
      <mesh position={[0, 0.7, -1.41]} material={matGlassSide} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[4.3, 1.9]} />
      </mesh>
      {/* Podium aluminium column reveals */}
      {([-1.8, -0.6, 0.6, 1.8] as number[]).map((x, i) => (
        <mesh key={`pcol-${i}`} position={[x, 0.55, 1.42]} material={matAluminium}>
          <boxGeometry args={[0.08, 1.12, 0.04]} />
        </mesh>
      ))}
      {/* Podium gold trim top edge */}
      <mesh position={[0, 1.85, 0]} material={matGoldTrim}>
        <boxGeometry args={[3.42, 0.05, 2.42]} />
      </mesh>

      {/* ── TOWER SHAFT — lower (floors 1–12) ── */}
      {/* Core structure — dark anthracite */}
      <mesh position={[0, 4.55, 0]} castShadow receiveShadow material={matDarkSteel}>
        <boxGeometry args={[2.0, 5.5, 1.6]} />
      </mesh>
      {/* Full-height glass curtain — front (deep blue-green) */}
      <mesh position={[0, 4.55, 0.81]} material={matGlass}>
        <planeGeometry args={[1.96, 5.46]} />
      </mesh>
      {/* Back curtain — slightly different tint */}
      <mesh position={[0, 4.55, -0.81]} material={matGlassSide} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.96, 5.46]} />
      </mesh>
      {/* Glass curtain sides */}
      <mesh position={[1.01, 4.55, 0]} material={matGlassSide} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[1.56, 5.46]} />
      </mesh>
      <mesh position={[-1.01, 4.55, 0]} material={matGlassSide} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.56, 5.46]} />
      </mesh>
      {/* Horizontal floor spandrel bands — brushed aluminium */}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh
          key={`spandrel-low-${i}`}
          position={[0, 2.1 + i * 0.46, 0.82]}
          material={matAluminium}
        >
          <planeGeometry args={[1.98, 0.025]} />
        </mesh>
      ))}

      {/* ── SETBACK 1 — mid tower ── */}
      <mesh position={[0, 8.0, 0]} castShadow receiveShadow material={matDarkSteel}>
        <boxGeometry args={[1.6, 0.3, 1.3]} />
      </mesh>
      <mesh position={[0, 8.0, 0]} material={matGoldTrim}>
        <boxGeometry args={[1.62, 0.06, 1.32]} />
      </mesh>

      {/* ── TOWER SHAFT — upper (floors 13–24) ── */}
      <mesh position={[0, 11.0, 0]} castShadow receiveShadow material={matDarkSteel}>
        <boxGeometry args={[1.6, 5.7, 1.3]} />
      </mesh>
      <mesh position={[0, 11.0, 0.66]} material={matGlass}>
        <planeGeometry args={[1.56, 5.66]} />
      </mesh>
      <mesh position={[0, 11.0, -0.66]} material={matGlassSide} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.56, 5.66]} />
      </mesh>
      <mesh position={[0.81, 11.0, 0]} material={matGlassSide} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[1.26, 5.66]} />
      </mesh>
      <mesh position={[-0.81, 11.0, 0]} material={matGlassSide} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.26, 5.66]} />
      </mesh>
      {/* Upper spandrels — alternating gold trim / aluminium */}
      {Array.from({ length: 14 }, (_, i) => (
        <mesh
          key={`spandrel-up-${i}`}
          position={[0, 8.22 + i * 0.41, 0.67]}
          material={i % 4 === 0 ? matGoldTrim : matAluminium}
        >
          <planeGeometry args={[1.58, 0.025]} />
        </mesh>
      ))}

      {/* ── SETBACK 2 ── */}
      <mesh position={[0, 14.0, 0]} castShadow material={matDarkSteel}>
        <boxGeometry args={[1.2, 0.25, 1.0]} />
      </mesh>
      <mesh position={[0, 14.0, 0]} material={matGoldTrim}>
        <boxGeometry args={[1.22, 0.05, 1.02]} />
      </mesh>

      {/* ── CROWN — slender top shaft ── */}
      <mesh position={[0, 16.3, 0]} castShadow material={matDarkSteel}>
        <boxGeometry args={[0.9, 4.6, 0.7]} />
      </mesh>
      {/* Crown glass — brighter tint, lighter opacity at top */}
      <mesh position={[0, 16.3, 0.36]} material={matGlass}>
        <planeGeometry args={[0.86, 4.56]} />
      </mesh>
      <mesh position={[0, 16.3, -0.36]} material={matGlassSide} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.86, 4.56]} />
      </mesh>
      {/* Crown horizontal gold banding */}
      {[15.1, 17.5, 19.2].map((y, i) => (
        <mesh key={`crown-band-${i}`} position={[0, y, 0]} material={matGoldTrim}>
          <boxGeometry args={[0.92, 0.05, 0.72]} />
        </mesh>
      ))}

      {/* ── SPIRE ── */}
      <mesh position={[0, 19.5, 0]} castShadow material={matGoldTrim}>
        <cylinderGeometry args={[0.04, 0.12, 2.4, 8]} />
      </mesh>
      <mesh position={[0, 20.8, 0]} material={matGoldTrim}>
        <coneGeometry args={[0.08, 0.5, 8]} />
      </mesh>

      {/* ── VERTICAL STRUCTURAL FINS (front face) ── */}
      {finPositions.map((x, i) => (
        <mesh key={`fin-${i}`} position={[x, 8.0, 0.84]} castShadow material={matGoldTrim}>
          <boxGeometry args={[0.04, 14.0, 0.06]} />
        </mesh>
      ))}
      {/* Side fins */}
      {([-0.4, 0, 0.4] as number[]).map((z, i) => (
        <mesh key={`sfin-${i}`} position={[1.04, 6.5, z]} castShadow material={matGoldTrim}>
          <boxGeometry args={[0.06, 9.0, 0.04]} />
        </mesh>
      ))}
      {([-0.4, 0, 0.4] as number[]).map((z, i) => (
        <mesh key={`sfin2-${i}`} position={[-1.04, 6.5, z]} castShadow material={matGoldTrim}>
          <boxGeometry args={[0.06, 9.0, 0.04]} />
        </mesh>
      ))}

      {/* ── WINDOW LIGHTS (emissive quads on front face) ── */}
      <group ref={windowLightsRef}>
        {windowData.map((w, i) => (
          <mesh key={`win-${i}`} position={w.pos}>
            <planeGeometry args={[0.12, 0.14]} />
            <meshStandardMaterial
              color={w.lit ? '#d4b87a' : '#1a2a3a'}
              emissive={w.lit ? '#c8a030' : '#000000'}
              emissiveIntensity={w.lit ? 0.9 : 0}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* ── GROUND PLAZA ── */}
      {/* Dark polished granite base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.52, 0]} receiveShadow>
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial color="#1a1820" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Stone pavement strips */}
      {([-3, -1, 1, 3] as number[]).map((x, i) => (
        <mesh key={`pave-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, -0.515, 0]}>
          <planeGeometry args={[0.04, 14]} />
          <meshStandardMaterial color="#7a7268" metalness={0.0} roughness={0.95} transparent opacity={0.5} />
        </mesh>
      ))}
      {/* Plaza pattern — concentric square rings */}
      {[1.8, 3.2, 5.0, 7.5].map((r, i) => (
        <mesh key={`ring-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.51, 0]}>
          <ringGeometry args={[r, r + 0.025, 4, 1, Math.PI / 4]} />
          <meshStandardMaterial color="#c8a96e" metalness={0.9} roughness={0.1} transparent opacity={0.18 - i * 0.03} />
        </mesh>
      ))}
      {/* Gold plaza cross lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.505, 0]}>
        <planeGeometry args={[0.025, 16]} />
        <meshStandardMaterial color="#c8a96e" metalness={1} roughness={0.1} transparent opacity={0.12} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, Math.PI / 2, 0]} position={[0, -0.505, 0]}>
        <planeGeometry args={[0.025, 16]} />
        <meshStandardMaterial color="#c8a96e" metalness={1} roughness={0.1} transparent opacity={0.12} />
      </mesh>

      {/* ── COMPANION BUILDINGS (background context) ── */}
      {/* Left mid-rise — warm stone cladding */}
      <mesh position={[-4.2, 2.8, -1.5]} castShadow receiveShadow material={matStone}>
        <boxGeometry args={[1.4, 5.6, 1.2]} />
      </mesh>
      <mesh position={[-4.2, 2.8, -0.9]} material={matGlassSide}>
        <planeGeometry args={[1.36, 5.56]} />
      </mesh>
      {/* Right slim tower — dark steel + glass */}
      <mesh position={[4.0, 4.5, -1.2]} castShadow receiveShadow material={matDarkSteel}>
        <boxGeometry args={[1.0, 9.0, 1.0]} />
      </mesh>
      <mesh position={[4.0, 4.5, -0.7]} material={matGlass}>
        <planeGeometry args={[0.96, 8.96]} />
      </mesh>
      {/* Far background low-rise — concrete */}
      <mesh position={[-2.5, 1.0, -2.5]} castShadow receiveShadow material={matConcrete}>
        <boxGeometry args={[2.2, 2.0, 1.0]} />
      </mesh>
      <mesh position={[2.8, 1.5, -2.2]} castShadow receiveShadow material={matConcrete}>
        <boxGeometry args={[1.8, 3.0, 0.8]} />
      </mesh>

    </group>
  );
}

/* ─── Grid floor ─── */
function GridFloor() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    gridRef.current.position.z = (state.clock.elapsedTime * 0.2) % 1;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[40, 40, '#1e1e1e', '#141414']}
      position={[0, -0.51, 0]}
    />
  );
}

/* ─── Camera rig (mouse parallax) ─── */
function CameraRig({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 6, 18));

  useFrame(() => {
    target.current.set(
      mouse.current.x * 2.5,
      mouse.current.y * 2 + 6,
      18
    );
    camera.position.lerp(target.current, 0.035);
    camera.lookAt(0, 6, 0);
  });

  return null;
}

/* ─── Main export ─── */
export default function HeroScene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 6, 18], fov: 45 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.9 }}
      style={{ background: 'transparent' }}
    >
      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Lighting */}
      <ambientLight intensity={0.2} color="#c4bdb4" />
      {/* Key light — warm golden from upper right */}
      <directionalLight
        position={[10, 20, 8]}
        intensity={3}
        color="#f8f0e4"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={60}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={30}
        shadow-camera-bottom={-5}
      />
      {/* Fill light — cool blue from left */}
      <directionalLight position={[-8, 12, -4]} intensity={0.8} color="#4a70c0" />
      {/* Accent uplights on tower base */}
      <pointLight position={[-2, 2, 2]} intensity={2.5} color="#c8a96e" distance={14} decay={2} />
      <pointLight position={[2, 2, 2]} intensity={2.0} color="#d4b87a" distance={12} decay={2} />
      {/* Crown glow */}
      <pointLight position={[0, 14, 0]} intensity={3.5} color="#c8a030" distance={7} decay={2} />

      <CameraRig mouse={mouse} />

      {/* Building centered — scaled down so spire stays inside viewport */}
      <group position={[0, 0, 0]} scale={[0.62, 0.62, 0.62]}>
        <Float speed={0.8} rotationIntensity={0.02} floatIntensity={0.15}>
          <Building />
        </Float>
      </group>

      {/* Bloom post-processing — makes emissive surfaces glow in dark mode */}
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.6}
        />
      </EffectComposer>

      <GridFloor />

      <Stars radius={100} depth={60} count={1500} factor={3} fade speed={0.4} />

      {/* Deep near-black fog — blends into dark page background (#0a0a0a) */}
      <fog attach="fog" args={['#08080c', 20, 60]} />
    </Canvas>
  );
}
