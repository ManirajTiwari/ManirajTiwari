'use client';

import React, { useMemo } from 'react';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

interface PillarProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  depth?: number;
  scale?: number | [number, number, number]; // Added scale prop
}

export default function Pillar({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  depth = 0.5,
  scale = 0.5, // Change this value to make it smaller (e.g., 0.3 for tiny, 0.5 for half size)
}: PillarProps) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();

    const stemWidth = 0.6;
    const stemHeight = 4.0;

    const step1W = 0.3;
    const step1H = 0.3;

    const step2W = 0.9;
    const step2H = 0.3;

    const topBlockW = 0.5;
    const topBlockH = 0.4;

    const halfStem = stemWidth / 2;

    s.moveTo(-halfStem, 0);
    s.lineTo(halfStem, 0);
    s.lineTo(halfStem, stemHeight);

    s.lineTo(halfStem + step1W, stemHeight);
    s.lineTo(halfStem + step1W, stemHeight + step1H);

    s.lineTo(halfStem + step1W + step2W, stemHeight + step1H);
    s.lineTo(halfStem + step1W + step2W, stemHeight + step1H + step2H);

    s.lineTo(
      halfStem + step1W + step2W + topBlockW,
      stemHeight + step1H + step2H
    );
    s.lineTo(
      halfStem + step1W + step2W + topBlockW,
      stemHeight + step1H + step2H + topBlockH
    );

    s.lineTo(
      -(halfStem + step1W + step2W + topBlockW),
      stemHeight + step1H + step2H + topBlockH
    );

    s.lineTo(
      -(halfStem + step1W + step2W + topBlockW),
      stemHeight + step1H + step2H
    );
    s.lineTo(
      -(halfStem + step1W + step2W),
      stemHeight + step1H + step2H
    );

    s.lineTo(-(halfStem + step1W + step2W), stemHeight + step1H);
    s.lineTo(-(halfStem + step1W), stemHeight + step1H);

    s.lineTo(-(halfStem + step1W), stemHeight);
    s.lineTo(-halfStem, stemHeight);

    s.lineTo(-halfStem, 0);

    return s;
  }, []);

  const extrudeSettings: THREE.ExtrudeGeometryOptions = useMemo(
    () => ({
      steps: 1,
      depth,
      bevelEnabled: false,
    }),
    [depth]
  );

  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshBasicMaterial color="#ffffff" polygonOffset polygonOffsetFactor={1} />
      <Edges threshold={15} color="black" linewidth={2} />
    </mesh>
  );
}