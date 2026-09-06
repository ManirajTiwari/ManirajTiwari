// app/component/piller.tsx
"use client";

import React from 'react';

export default function Piller() {
  return (
    <group>
      {/* --- Existing Structure (Pillars 1 & 2) --- */}
      <mesh position={[-2.5, 0, 0]}>
        <boxGeometry args={[1, 6, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh position={[2.5, 0, 0]}>
        <boxGeometry args={[1, 6, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      
      {/* Outer lower step blocks */}
      <mesh position={[-1.7, 1.8, 0]}>
        <boxGeometry args={[0.8, 0.6, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh position={[1.7, 1.8, 0]}>
        <boxGeometry args={[0.8, 0.6, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* Mid step blocks */}
      <mesh position={[-0.9, 2.2, 0]}>
        <boxGeometry args={[0.8, 0.6, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh position={[0.9, 2.2, 0]}>
        <boxGeometry args={[0.8, 0.6, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* Center highest block */}
      <mesh position={[0, 2.7, 0]}>
        <boxGeometry args={[4, 0.6, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* --- New Structure (Between Pillars 2 & 3) --- */}
      <mesh position={[7.5, 0, 0]}>
        <boxGeometry args={[1, 6, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* Replicated Stepped Arch */}
      <mesh position={[-1.7 + 5, 1.8, 0]}>
        <boxGeometry args={[0.8, 0.6, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh position={[1.7 + 5, 1.8, 0]}>
        <boxGeometry args={[0.8, 0.6, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh position={[-0.9 + 5, 2.2, 0]}>
        <boxGeometry args={[0.8, 0.6, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh position={[0.9 + 5, 2.2, 0]}>
        <boxGeometry args={[0.8, 0.6, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh position={[0 + 5, 2.7, 0]}>
        <boxGeometry args={[4, 0.6, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </group>
  );
}