'use client';

import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, Edges } from '@react-three/drei';
import * as THREE from 'three';
import Upper from './upper';
import Pillar from './piller';
import Stage from './stage';

interface ArchProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

function ArchWithOutline({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: ArchProps) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const width = 2;
    const height = 2.5;
    const radius = width / 2;

    s.moveTo(-radius, 0);
    s.lineTo(-radius, height);
    s.absarc(0, height, radius, Math.PI, 0, true);
    s.lineTo(radius, 0);
    s.lineTo(-radius, 0);

    return s;
  }, []);

  const extrudeSettings: THREE.ExtrudeGeometryOptions = useMemo(
    () => ({
      steps: 1,
      depth: 8.2,
      bevelEnabled: false,
    }),
    []
  );

  return (
    <group position={position} rotation={rotation}>
      {/* Base Arch Body */}
      <mesh>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshBasicMaterial color="#ffffff" polygonOffset polygonOffsetFactor={1} />
        <Edges threshold={15} color="black" linewidth={2} />
      </mesh>

      <Stage position={[0, 0, .53]} scale={0.166} />
      {/* Upper Roof Section (Positioned directly at top arc height) */}

      <Upper position={[0, 2.5, 0]} width={2} height={1} depth={0.2} />
      <Pillar position={[0, 0, 0]} scale={[0.5, 0.5, 0.4]}/>

      <Upper position={[0, 2.5, 2]} width={2} height={1} depth={0.2} />
      <Pillar position={[0.6, 0, 2]} scale={[0.2, 0.5, 0.4]} />
      <Pillar position={[-0.6, 0, 2]} scale={[0.2, 0.5, 0.4]} />

      <Upper position={[0, 2.5, 4]} width={2} height={1} depth={0.2} />
      <Pillar position={[0.6, 0, 4]} scale={[0.2, 0.5, 0.4]} />
      <Pillar position={[-0.6, 0, 4]} scale={[0.2, 0.5, 0.4]} />

      <Upper position={[0, 2.5, 6]} width={2} height={1} depth={0.2} />
      <Pillar position={[0.6, 0, 6]} scale={[0.2, 0.5, 0.4]} />
      <Pillar position={[-0.6, 0, 6]} scale={[0.2, 0.5, 0.4]} />

      <Upper position={[0, 2.5, 8]} width={2} height={1} depth={0.2} />
      <Pillar position={[0.6, 0, 8]} scale={[0.2, 0.5, 0.4]} />
      <Pillar position={[-0.6, 0, 8]} scale={[0.2, 0.5, 0.4]} />
      
    </group>
  );
}

function SingleArch() {
  return (
    <group>
      <ArchWithOutline position={[0, 0, -1.5]} rotation={[0, 0, 0]} />
    </group>
  );
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#ffffff' }}>
      <Canvas camera={{ position: [5, 4, 7], fov: 45 }}>
        <Center>
          <SingleArch />
        </Center>
        <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
      </Canvas>
    </div>
  );
}