// app/component/padiston.tsx
"use client";

import React from 'react';

export default function Padiston() {
  const newDepth = 1.4;
  const oldDepth = 1.0;
  const depthDifference = newDepth - oldDepth;
  const adjustedZ = 1.8 + (depthDifference / 2);

  return (
    <group position={[-3, -2, -0.5]}>
      {/* Stage Base */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[17, 0.8, 6]} />
        <meshStandardMaterial color="#d47a00" />
      </mesh>

      {/* Main Elevated Stage Platform */}
      <mesh position={[0, 1.8, -0.5]}>
        <boxGeometry args={[17, 2, 3.5]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* Step 1 */}
      <mesh position={[0, 1.0, adjustedZ]}>
        <boxGeometry args={[12, 0.4, newDepth]} />
        <meshStandardMaterial color="#ff8c00" />
      </mesh>

      {/* Step 2 */}
      <mesh position={[0, 1.4, 1.8]}>
        <boxGeometry args={[9, 0.4, 1.0]} />
        <meshStandardMaterial color="#ffa500" />
      </mesh>
    </group>
  );
}