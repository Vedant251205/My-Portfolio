"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

export default function Hero3D() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y -= delta * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x -= delta * 0.15;
      ringRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      
      {/* Dynamic studio lighting to create vibrant reflections */}
      <directionalLight position={[5, 5, 5]} intensity={2} color="#00d4ff" /> {/* Cyan */}
      <directionalLight position={[-5, -5, -5]} intensity={2} color="#ff0080" /> {/* Pink */}
      <spotLight position={[0, 0, 10]} intensity={3} color="#ff8c00" angle={0.5} penumbra={1} /> {/* Orange */}
      <pointLight position={[5, -5, 5]} intensity={2} color="#7c3aed" /> {/* Violet */}

      <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        {/* Main Torus */}
        <mesh ref={meshRef}>
          <torusGeometry args={[2.2, 0.8, 64, 128]} />
          <meshPhysicalMaterial 
            roughness={0.1}
            metalness={0.9}
            clearcoat={1}
            clearcoatRoughness={0.1}
            color="#0a0a0a" // Dark base so reflections pop
            envMapIntensity={2}
          />
        </mesh>
        
        {/* Inner floating ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[1.5, 0.2, 32, 100]} />
          <meshPhysicalMaterial 
            roughness={0}
            metalness={0.5}
            transmission={0.9}
            thickness={1}
            color="#ffffff"
            envMapIntensity={1.5}
          />
        </mesh>
      </Float>
      
      {/* Studio environment for realistic reflections */}
      <Environment preset="studio" />
    </>
  );
}
