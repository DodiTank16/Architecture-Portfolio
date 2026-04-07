'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import LoadingSpinner from './LoadingSpinner';

/* ─── Fallback procedural model (used when no GLTF is provided) ─── */
function ProceduralModel({ category }: { category: string }) {
  const groupRef = useRef<THREE.Group>(null);

  const config = {
    Residential: {
      color: '#2a2520',
      accent: '#c8a96e',
      pieces: [
        { pos: [0, 0.5, 0] as [number,number,number], size: [3, 1, 2.5] as [number,number,number] },
        { pos: [0, 1.5, 0] as [number,number,number], size: [2.4, 1, 2] as [number,number,number] },
        { pos: [0, 2.3, 0] as [number,number,number], size: [1.8, 0.6, 1.8] as [number,number,number] },
        { pos: [1.8, 0.4, 0] as [number,number,number], size: [0.8, 0.8, 1.8] as [number,number,number] },
      ],
    },
    Commercial: {
      color: '#1e2530',
      accent: '#4a8adc',
      pieces: [
        { pos: [0, 2, 0] as [number,number,number], size: [1.8, 4, 1.4] as [number,number,number] },
        { pos: [1.5, 1, 0] as [number,number,number], size: [1, 2, 1.4] as [number,number,number] },
        { pos: [-1.4, 0.6, 0] as [number,number,number], size: [1, 1.2, 1.4] as [number,number,number] },
        { pos: [0, 4.2, 0] as [number,number,number], size: [1, 0.4, 1] as [number,number,number] },
      ],
    },
    Interior: {
      color: '#201c18',
      accent: '#c8a96e',
      pieces: [
        { pos: [0, 0, 0] as [number,number,number], size: [4, 0.1, 4] as [number,number,number] },
        { pos: [-1.7, 0.8, 0] as [number,number,number], size: [0.15, 1.6, 3.5] as [number,number,number] },
        { pos: [1.7, 0.8, 0] as [number,number,number], size: [0.15, 1.6, 3.5] as [number,number,number] },
        { pos: [0, 1.6, 0] as [number,number,number], size: [3.5, 0.1, 3.5] as [number,number,number] },
        { pos: [0, 0.5, 0] as [number,number,number], size: [1.5, 0.6, 1] as [number,number,number] },
      ],
    },
  };

  const cfg = config[category as keyof typeof config] ?? config.Residential;

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <group ref={groupRef}>
      {cfg.pieces.map((p, i) => (
        <group key={i}>
          <mesh position={p.pos}>
            <boxGeometry args={p.size} />
            <meshStandardMaterial
              color={cfg.color}
              metalness={0.8}
              roughness={0.2}
              envMapIntensity={1.5}
            />
          </mesh>
          <lineSegments position={p.pos}>
            <edgesGeometry args={[new THREE.BoxGeometry(...p.size)]} />
            <lineBasicMaterial color={cfg.accent} transparent opacity={0.5} />
          </lineSegments>
        </group>
      ))}
    </group>
  );
}

/* ─── Main viewer ─── */
interface ThreeDViewerProps {
  category?: string;
  modelUrl?: string;
}

export default function ThreeDViewer({ category = 'Residential', modelUrl }: ThreeDViewerProps) {
  return (
    <div className="w-full h-full min-h-[500px] bg-dark-200">
      <Suspense fallback={<LoadingSpinner label="Loading 3D model…" />}>
        <Canvas
          shadows
          camera={{ position: [4, 3, 6], fov: 45 }}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[8, 10, 5]} intensity={2} castShadow color="#f8f7f4" />
          <pointLight position={[-5, 3, 2]} intensity={1.2} color="#c8a96e" />

          <Environment preset="city" />

          <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2}>
            <ProceduralModel category={category} />
          </Float>

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={4}
            maxDistance={14}
            autoRotate
            autoRotateSpeed={0.4}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
          />

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.7, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
          </mesh>
          <gridHelper args={[20, 20, '#1e1e1e', '#161616']} position={[0, -0.69, 0]} />

          <fog attach="fog" args={['#0a0a0a', 12, 30]} />
        </Canvas>
      </Suspense>
    </div>
  );
}
