"use client";

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float, MeshReflectorMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import Piller from '@/app/component/piller';
import Padiston from '@/app/component/padiston';
import Sword from '@/app/component/sword';

function EnhancedRoom() {
  return (
    <group>
      {/* Back, Left, Right & Top walls */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[17, 10, 17]} />
        <meshStandardMaterial color="#121216" roughness={0.7} side={THREE.BackSide} />
      </mesh>

      {/* Reflective Dark Stone Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.99, 0]}>
        <planeGeometry args={[17, 17]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mirror={0.4}
          mixBlur={0.8}
          mixStrength={1.5}
          roughness={0.6}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#151518"
          metalness={0.5}
        />
      </mesh>
    </group>
  );
}

export default function First() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#0a0a0c' }}>
      <Canvas 
        shadows 
        camera={{ position: [0, 1.5, 7], fov: 45 }} 
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        {/* Low Ambient Light for Dark Mood */}
        <ambientLight intensity={0.15} />

        {/* Key Overhead Dramatic Spotlight focused on the Sword */}
        <spotLight
          position={[0, 4.8, 0]}
          target-position={[0, -1, 0]}
          intensity={120}
          angle={0.4}
          penumbra={0.8}
          castShadow
          color="#fff4e0"
          shadow-mapSize={[2048, 2048]}
        />

        {/* Cold Blue Rim Light from Behind */}
        <pointLight position={[0, 2, -5]} intensity={15} color="#38bdf8" />

        {/* Warm Fill Light from Left */}
        <pointLight position={[-5, 0, 3]} intensity={8} color="#f97316" />

        {/* Environment & Room Geometry */}
        <EnhancedRoom />

        {/* Left Wall Pillars */}
        <group position={[-7.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <Piller />
        </group>

        {/* Right Wall Pillars */}
        <group position={[7.5, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <Piller />
        </group>

        {/* Pedestal with Contact Shadow */}
        <group position={[0, -3.8, 0]}>
          <Padiston />
        </group>

        {/* Floating Hero Sword display */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <group position={[0, -1.0, 0]}>
            <Sword 
              scale={[0.0085, 0.0085, 0.0085]} 
              rotation={[-Math.PI / 2, 0, Math.PI / 2]} 
              position={[0, 0, 0]} 
            />
          </group>
        </Float>

        {/* Realistic Floor Shadowing */}
        <ContactShadows 
          position={[0, -4.98, 0]} 
          opacity={0.75} 
          scale={10} 
          blur={2} 
          far={4} 
        />

        {/* Post-Processing Effects for Glow & Focus */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.8} luminanceSmoothing={0.3} intensity={0.5} />
          <Vignette eskil={false} offset={0.2} darkness={0.9} />
        </EffectComposer>

        {/* Camera Interaction Settings */}
        <OrbitControls 
          makeDefault 
          enablePan={false}
          minDistance={3}
          maxDistance={12}
          maxPolarAngle={Math.PI / 2 - 0.05} // Prevents looking below the floor
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}