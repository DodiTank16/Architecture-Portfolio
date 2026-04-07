'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Procedural building geometry ─── */
function Building() {
  const groupRef = useRef<THREE.Group>(null);
  const edgesGroupRef = useRef<THREE.Group>(null);

  const meshes = useMemo(() => [
    // Main tower
    { pos: [0, 2.5, 0] as [number, number, number], size: [2, 5, 1.6] as [number, number, number], metal: 0.85, rough: 0.15 },
    // Left wing (lower)
    { pos: [-1.8, 0.6, 0] as [number, number, number], size: [1.6, 1.2, 1.6] as [number, number, number], metal: 0.9, rough: 0.2 },
    // Right wing (mid)
    { pos: [1.9, 1.2, 0] as [number, number, number], size: [1.8, 2.4, 1.6] as [number, number, number], metal: 0.8, rough: 0.25 },
    // Penthouse
    { pos: [0, 5.4, 0] as [number, number, number], size: [1.2, 0.8, 1.2] as [number, number, number], metal: 0.95, rough: 0.1 },
    // Podium
    { pos: [0, -0.3, 0] as [number, number, number], size: [4.8, 0.6, 2.4] as [number, number, number], metal: 0.6, rough: 0.4 },
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.12;
    groupRef.current.position.y = Math.sin(t * 0.3) * 0.08 - 0.5;
  });

  return (
    <group ref={groupRef}>
      {meshes.map((m, i) => (
        <group key={i}>
          <mesh position={m.pos} castShadow receiveShadow>
            <boxGeometry args={m.size} />
            <meshStandardMaterial
              color="#1a1a1a"
              metalness={m.metal}
              roughness={m.rough}
              envMapIntensity={1.2}
            />
          </mesh>
          {/* Accent edges */}
          <lineSegments position={m.pos}>
            <edgesGeometry args={[new THREE.BoxGeometry(...m.size)]} />
            <lineBasicMaterial color="#c8a96e" transparent opacity={0.25} />
          </lineSegments>
        </group>
      ))}

      {/* Glass façade panels on main tower */}
      <mesh position={[0, 2.5, 0.82]} castShadow>
        <planeGeometry args={[1.8, 4.8]} />
        <meshStandardMaterial
          color="#3a5a80"
          transparent
          opacity={0.12}
          metalness={0.9}
          roughness={0.05}
        />
      </mesh>

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.62, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Ground reflection ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.61, 0]}>
        <ringGeometry args={[3, 3.02, 64]} />
        <meshBasicMaterial color="#c8a96e" transparent opacity={0.15} />
      </mesh>

      {/* Floating ref group for edges */}
      <group ref={edgesGroupRef} />
    </group>
  );
}

/* ─── Grid floor ─── */
function GridFloor() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    gridRef.current.position.z = (state.clock.elapsedTime * 0.3) % 1;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[30, 30, '#2a2a2a', '#1a1a1a']}
      position={[0, -0.6, 0]}
    />
  );
}

/* ─── Camera rig (mouse parallax) ─── */
function CameraRig({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();

  useFrame(() => {
    const target = new THREE.Vector3(
      mouse.current.x * 3,
      mouse.current.y * 1.5 + 2,
      8
    );
    camera.position.lerp(target, 0.04);
    camera.lookAt(0, 1.5, 0);
  });

  return null;
}

/* ─── Main export ─── */
export default function HeroScene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.3} color="#c4bdb4" />
      <directionalLight
        position={[8, 12, 6]}
        intensity={2.5}
        color="#f8f7f4"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-6, 4, 3]} intensity={1.5} color="#c8a96e" />
      <pointLight position={[6, 2, -2]} intensity={0.8} color="#4a6aaa" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={0.8}
        intensity={1.5}
        color="#f8f7f4"
        castShadow
      />

      <CameraRig mouse={mouse} />

      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.3}>
        <Building />
      </Float>

      <GridFloor />

      <Stars radius={80} depth={50} count={2000} factor={3} fade speed={0.5} />

      <fog attach="fog" args={['#0a0a0a', 15, 40]} />
    </Canvas>
  );
}
