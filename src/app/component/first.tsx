'use client';

import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, Edges, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import Upper from './upper';
import Pillar from './piller';
import Stage from './stage';

interface ArchProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

// Dedicated Inner Wall Mesh to strictly hold the inside texture
function InnerWallTexture({ depth = 8.2 }: { depth: number }) {
  const sideTexture = useTexture('/sidewall.png');

  useMemo(() => {
    // Enable repeating horizontally and vertically
    sideTexture.wrapS = THREE.RepeatWrapping;
    sideTexture.wrapT = THREE.RepeatWrapping;

    // Increase repetition:
    // First number = tile count around the arc curve (U-axis)
    // Second number = tile count along the tunnel depth (V-axis)
    sideTexture.repeat.set(2, 2); 
  }, [sideTexture]);

  const innerWallGeometry = useMemo(() => {
    const path = new THREE.Path();
    const width = 2;
    const height = 2.5;
    const radius = width / 2;

    path.moveTo(-radius, 0);
    path.lineTo(-radius, height);
    path.absarc(0, height, radius, Math.PI, 0, true);
    path.lineTo(radius, 0);

    return new THREE.ExtrudeGeometry(
      new THREE.Shape(path.getPoints()),
      {
        steps: 1,
        depth: depth,
        bevelEnabled: false,
      }
    );
  }, [depth]);

  return (
    <mesh geometry={innerWallGeometry}>
      <meshBasicMaterial
        map={sideTexture}
        color="#7B3F00"
        side={THREE.DoubleSide}
        polygonOffset
        polygonOffsetFactor={-1}
      />
    </mesh>
  );
}

function ArchWithOutline({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: ArchProps) {
  // Base outer arch shape (Plain white)
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
      {/* 1. Outer Solid White Geometry */}
      <mesh>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshBasicMaterial color="#ffffff" polygonOffset polygonOffsetFactor={1} />
        <Edges threshold={15} color="black" linewidth={2} />
      </mesh>

      {/* 2. Inner Wall Surface (Only texturing the inside) */}
      <InnerWallTexture depth={8.2} />

      {/* Stage, Roof, and Pillars */}
      <Stage position={[0, 0, 0.53]} scale={0.166} />

      <Upper position={[0, 2.5, 0]} width={2} height={1} depth={0.2} />
      <Pillar position={[0, 0, 0]} scale={[0.5, 0.5, 0.4]} />

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
        <React.Suspense fallback={null}>
          <Center>
            <SingleArch />
          </Center>
        </React.Suspense>
        <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
      </Canvas>
    </div>
  );
}