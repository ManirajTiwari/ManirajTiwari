'use client';

import React, { useMemo } from 'react';
import { Edges, useTexture } from '@react-three/drei';
import * as THREE from 'three';

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
  // Load base texture from /public/sidewall.png
  const baseTexture = useTexture('/sidewall.png');

  // Tier configuration with independent [x, y, z] offsets
  const tiers = [
    { width: 12.0, height: 0.4, depth: 4.0, x: 0.0, y: 0.2, z: 0.0 }, // Bottom wide platform
    { width: 10.0, height: 0.8, depth: 3.5, x: 0.0, y: 0.8, z: -0.2 }, // Tier 1
    { width: 8.0,  height: 0.8, depth: 3.0, x: 0.0, y: 1.6, z: -0.4 }, // Tier 2
    { width: 6.0,  height: 0.8, depth: 2.5, x: 0.0, y: 2.4, z: -0.6 }, // Tier 3
    { width: 4.0,  height: 0.8, depth: 2.0, x: 0.0, y: 3.2, z: -0.8 }, // Top main stage
  ];

  // Generate an independent, properly scaled material for each tier
  const tierMaterials = useMemo(() => {
    // Defines world units per single texture repeat (Lower = smaller pattern, Higher = larger pattern)
    const textureUnitScale = 2.0;

    return tiers.map((tier) => {
      const clonedTexture = baseTexture.clone();
      clonedTexture.wrapS = THREE.RepeatWrapping;
      clonedTexture.wrapT = THREE.RepeatWrapping;

      // Scale repeat relative to tier dimensions to keep image size uniform across tiers
      clonedTexture.repeat.set(
        tier.width / textureUnitScale,
        tier.depth / textureUnitScale
      );
      clonedTexture.needsUpdate = true;

      return new THREE.MeshBasicMaterial({
        map: clonedTexture,
        color: '#7B3F00',
        polygonOffset: true,
        polygonOffsetFactor: 1,
      });
    });
  }, [baseTexture]);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {tiers.map((tier, idx) => (
        <mesh
          key={idx}
          position={[tier.x, tier.y, tier.z]}
          material={tierMaterials[idx]}
        >
          <boxGeometry args={[tier.width, tier.height, tier.depth]} />
          <Edges threshold={15} color="black" linewidth={2} />
        </mesh>
      ))}
    </group>
  );
}