'use client';

import React, { useMemo } from 'react';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

interface UpperProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  width?: number;
  height?: number;
  depth?: number;
}

export default function Upper({
  position = [0, 2.5, 0], // Positioned at top edge of the 2.5 height arch base
  rotation = [0, 0, 0],
  width = 2,
  height = 1,
  depth = 0.2,
}: UpperProps) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const radiusX = width / 2;
    const radiusY = height;

    // Semicircle profile path starting from bottom-left corner
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
      <meshBasicMaterial color="#ffffff" polygonOffset polygonOffsetFactor={1} />
      <Edges threshold={15} color="black" linewidth={1} />
    </mesh>
  );
}