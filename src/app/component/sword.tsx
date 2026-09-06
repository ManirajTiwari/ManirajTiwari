"use client";

import React, { useMemo, useRef, useLayoutEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { SVGLoader } from 'three-stdlib';
import * as THREE from 'three';

export default function Sword(props) {
  const groupRef = useRef();
  const svgData = useLoader(SVGLoader, '/sword.svg');

  const extrudeSettings = useMemo(() => ({
    depth: 0.2,          // Depth kam karke sword thickness patli ki hai
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.05,
    bevelThickness: 0.05,
  }), []);

  // Geometry ko auto-center karne ke liye
  useLayoutEffect(() => {
    if (groupRef.current) {
      const box = new THREE.Box3().setFromObject(groupRef.current);
      const center = box.getCenter(new THREE.Vector3());
      
      // Sub-meshes ko center point par shift karna
      groupRef.current.children.forEach((child) => {
        child.position.x -= center.x;
        child.position.y -= center.y;
      });
    }
  }, [svgData]);

  return (
    // Scale yahan 0.05 pass kiya hai (scene ke size ke hisab se 0.01 se 0.1 adjust karein)
    <group {...props} scale={props.scale || 0.05}>
      <group ref={groupRef}>
        {svgData.paths.map((path, pathIdx) => {
          const shapes = path.toShapes(true);
          const color = path.color ? `#${path.color.getHexString()}` : '#1a1a1a';

          return shapes.map((shape, shapeIdx) => (
            <mesh key={`${pathIdx}-${shapeIdx}`}>
              <extrudeGeometry args={[shape, extrudeSettings]} />
              <meshStandardMaterial 
                color={color} 
                metalness={0.9} 
                roughness={0.2} 
                side={THREE.DoubleSide} 
              />
            </mesh>
          ));
        })}
      </group>
    </group>
  );
}