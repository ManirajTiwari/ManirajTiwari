'use client';

import React from 'react';
import { Edges } from '@react-three/drei';

interface StageProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}

export default function Stage({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: StageProps) {
  // Tier configuration with independent [x, y, z] offsets
  const tiers = [
    { width: 12.0, height: 0.4, depth: 4.0, x: 0.0, y: 0.2, z: 0.0 }, // Bottom wide platform
    { width: 10.0, height: 0.8, depth: 3.5, x: 0.0, y: 0.8, z: -0.2 }, // Tier 1 (shifted forward on Z)
    { width: 8.0,  height: 0.8, depth: 3.0, x: 0.0, y: 1.6, z: -0.4 }, // Tier 2
    { width: 6.0,  height: 0.8, depth: 2.5, x: 0.0, y: 2.4, z: -0.6 }, // Tier 3
    { width: 4.0,  height: 0.8, depth: 2.0, x: 0.0, y: 3.2, z: -0.8 }, // Top main stage
  ];

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {tiers.map((tier, idx) => (
        <mesh key={idx} position={[tier.x, tier.y, tier.z]}>
          <boxGeometry args={[tier.width, tier.height, tier.depth]} />
          <meshBasicMaterial color="#ffffff" polygonOffset polygonOffsetFactor={1} />
          <Edges threshold={15} color="black" linewidth={2} />
        </mesh>
      ))}
    </group>
  );
}