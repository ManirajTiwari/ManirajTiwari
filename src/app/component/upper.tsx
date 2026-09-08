'use client';

import React, { useMemo } from 'react';
import { Edges, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface UpperProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  depth?: number;
}

export default function Upper({
  position = [0, 2.5, 0],
  rotation = [0, 0, 0],
  width = 2,
  height = 1,
  depth = 0.2,
}: UpperProps) {
  // Load texture from /public/sidewall.png
  const sideTexture = useTexture('/sidewall.png');

  // Configure texture wrapping and scale
  useMemo(() => {
    sideTexture.wrapS = THREE.RepeatWrapping;
    sideTexture.wrapT = THREE.RepeatWrapping;
    sideTexture.repeat.set(1, 1); // Adjust repeat counts if needed
  }, [sideTexture]);

  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const radiusX = width / 2;
    const radiusY = height;

    s.moveTo(-radiusX, 0);
    s.absellipse(0, 0, radiusX, radiusY, 0, Math.PI, false, 0);
    s.lineTo(-radiusX, 0);

    return s;
  }, [width, height]);

  const extrudeSettings: THREE.ExtrudeGeometryOptions = useMemo(
    () => ({
      steps: 1,
      depth,
      bevelEnabled: false,
    }),
    [depth]
  );

  return (
    <mesh position={position} rotation={rotation}>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshBasicMaterial
        map={sideTexture}
        color="#7B3F00" // Maintains brown tint filter over texture
        polygonOffset
        polygonOffsetFactor={1}
      />
      <Edges threshold={15} color="black" linewidth={1} />
    </mesh>
  );
}