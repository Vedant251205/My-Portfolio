"use client";

import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Line, Preload, Html } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import skillsData from "@/data/skills.json";

// Map categories to colors
const categoryColors: Record<string, string> = {
  "Programming Languages": "#00D4FF", // Cyber Blue
  "Core Knowledge": "#A855F7", // Neon Purple
  "Frameworks & Tools": "#00FF41", // Matrix Green
  "Soft Skills": "#E2E8F0" // White/Gray
};

// Map categories to 3D positions (constellation centers)
const categoryPositions: Record<string, [number, number, number]> = {
  "Programming Languages": [-4, 2, 0],
  "Core Knowledge": [4, 3, -2],
  "Frameworks & Tools": [-3, -3, 1],
  "Soft Skills": [5, -2, 0]
};

function CategoryNode({
  category,
  color,
  center,
  centerPosRef
}: {
  category: string;
  color: string;
  center: [number, number, number];
  centerPosRef: React.MutableRefObject<THREE.Vector3>;
}) {
  const meshGroupRef = useRef<THREE.Group>(null);
  const targetPos = useMemo(() => new THREE.Vector3(...center), [center]);

  useFrame((state, delta) => {
    if (!meshGroupRef.current) return;
    
    const mousePos = new THREE.Vector3(
      (state.pointer.x * state.viewport.width) / 2, 
      (state.pointer.y * state.viewport.height) / 2, 
      0
    );

    const localMouse = meshGroupRef.current.parent!.worldToLocal(mousePos.clone());
    const localDist = targetPos.distanceTo(localMouse);
    
    const repelRadius = 8;
    const maxRepelForce = 10; // slightly stronger repel for the big circle
    
    if (localDist < repelRadius) {
      const localDir = targetPos.clone().sub(localMouse).normalize();
      localDir.z += 0.5;
      const localForce = (1 - localDist / repelRadius) * maxRepelForce;
      const repelPos = targetPos.clone().add(localDir.multiplyScalar(localForce));
      centerPosRef.current.lerp(repelPos, delta * 12);
    } else {
      centerPosRef.current.lerp(targetPos, delta * 2.5);
    }
    
    meshGroupRef.current.position.copy(centerPosRef.current);
  });

  return (
    <group ref={meshGroupRef} position={center}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshBasicMaterial color={color} />
          <mesh>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
          </mesh>
          <Html distanceFactor={15} position={[0, 0.7, 0]} center pointerEvents="none">
            <div className="font-display text-sm whitespace-nowrap text-text-primary text-shadow-glow select-none" style={{ textShadow: `0 0 10px ${color}` }}>
              {category.toUpperCase()}
            </div>
          </Html>
        </mesh>
      </Float>
    </group>
  );
}

function SkillNode({ 
  skill, 
  position, 
  color, 
  categoryCenter,
  centerPosRef
}: { 
  skill: { name: string; icon: string; level: string }; 
  position: [number, number, number]; 
  color: string;
  categoryCenter: [number, number, number];
  centerPosRef: React.MutableRefObject<THREE.Vector3>;
}) {
  const meshGroupRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.Line>(null);
  
  const targetPos = useMemo(() => new THREE.Vector3(...position), [position]);
  const currentPos = useRef(new THREE.Vector3(...position));
  
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...categoryCenter),
      new THREE.Vector3(...position)
    ]);
    return geo;
  }, [categoryCenter, position]);

  useFrame((state, delta) => {
    if (!meshGroupRef.current) return;
    
    const mousePos = new THREE.Vector3(
      (state.pointer.x * state.viewport.width) / 2, 
      (state.pointer.y * state.viewport.height) / 2, 
      0
    );

    const localMouse = meshGroupRef.current.parent!.worldToLocal(mousePos.clone());
    const localDist = targetPos.distanceTo(localMouse);
    
    const repelRadius = 7;
    const maxRepelForce = 8;
    
    if (localDist < repelRadius) {
      const localDir = targetPos.clone().sub(localMouse).normalize();
      localDir.z += 0.5;
      const localForce = (1 - localDist / repelRadius) * maxRepelForce;
      const repelPos = targetPos.clone().add(localDir.multiplyScalar(localForce));
      currentPos.current.lerp(repelPos, delta * 12);
    } else {
      currentPos.current.lerp(targetPos, delta * 2.5);
    }
    
    meshGroupRef.current.position.copy(currentPos.current);

    if (lineRef.current) {
      const positions = lineRef.current.geometry.attributes.position.array as Float32Array;
      // Update Start point (Center Node)
      positions[0] = centerPosRef.current.x;
      positions[1] = centerPosRef.current.y;
      positions[2] = centerPosRef.current.z;
      // Update End point (Skill Node)
      positions[3] = currentPos.current.x;
      positions[4] = currentPos.current.y;
      positions[5] = currentPos.current.z;
      lineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* @ts-expect-error - R3F line conflicts with SVG line in TypeScript */}
      <line ref={lineRef as any} geometry={lineGeometry as any}>
        <lineBasicMaterial color={color} transparent opacity={0.3} />
      </line>

      <group ref={meshGroupRef} position={position}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color={color} />
            
            <mesh>
              <sphereGeometry args={[0.25, 16, 16]} />
              <meshBasicMaterial color={color} transparent opacity={0.2} blending={THREE.AdditiveBlending} />
            </mesh>

            <Html distanceFactor={10} position={[0, -0.4, 0]} center zIndexRange={[100, 0]}>
              <div className="font-mono text-[10px] text-text-primary whitespace-nowrap bg-dark-bg/80 px-2 py-0.5 rounded border border-white/10 select-none pointer-events-none flex items-center gap-2">
                <i className={skill.icon}></i>
                {skill.name}
              </div>
            </Html>
          </mesh>
        </Float>
      </group>
    </group>
  );
}

function Constellation({ category, skills, color, center }: { category: string, skills: { name: string; icon: string; level: string }[], color: string, center: [number, number, number] }) {
  // Shared ref for the center position so lines can follow it
  const centerPosRef = useRef(new THREE.Vector3(...center));

  const nodes = useMemo(() => {
    return skills.map((skill, index) => {
      const radius = 1.5 + Math.random() * 1.5;
      const angle = (index / skills.length) * Math.PI * 2;
      const x = center[0] + Math.cos(angle) * radius;
      const y = center[1] + Math.sin(angle) * radius;
      const z = center[2] + (Math.random() - 0.5) * 2;
      return { skill, position: [x, y, z] as [number, number, number] };
    });
  }, [skills, center]);

  return (
    <group>
      <CategoryNode category={category} color={color} center={center} centerPosRef={centerPosRef} />

      {nodes.map((node, i) => (
        <SkillNode 
          key={i} 
          skill={node.skill} 
          position={node.position} 
          color={color} 
          categoryCenter={center} 
          centerPosRef={centerPosRef}
        />
      ))}
    </group>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Slow overall galaxy rotation
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {skillsData.map((categoryGroup, index) => (
        <Constellation 
          key={index}
          category={categoryGroup.category}
          skills={categoryGroup.skills}
          color={categoryColors[categoryGroup.category] || "#FFFFFF"}
          center={categoryPositions[categoryGroup.category] || [0,0,0]}
        />
      ))}
    </group>
  );
}

export default function SkillsGalaxy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;

    // Entrance Animation (ScrollTrigger Reveal)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
      }
    });

    gsap.set(headerRef.current, { opacity: 0, y: -20 });
    
    tl.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    });

    // The canvas fade in is handled by CSS/Framer implicitly but we can add a class toggle if needed

  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="relative h-screen w-full bg-dark-bg overflow-hidden flex flex-col items-center justify-center border-t border-glass-border"
    >
      <div 
        ref={headerRef}
        className="absolute top-24 z-10 w-full text-center pointer-events-none"
      >
        <h2 className="font-heading text-3xl md:text-5xl text-text-primary mb-2 tracking-wider">
          CAPABILITY
        </h2>
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-neon-purple to-transparent mx-auto"></div>
        <p className="font-mono text-sm text-text-secondary mt-4 tracking-widest uppercase">
          Drag to explore the constellation
        </p>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <Scene />
          <Preload all />
        </Canvas>
      </div>
      
      {/* Gradient overlays for smooth blending with surrounding sections */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-dark-bg to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg to-transparent pointer-events-none"></div>
    </section>
  );
}