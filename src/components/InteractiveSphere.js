"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function InteractiveSphere() {
  const meshRef = useRef();
  const wireframeRef = useRef();
  const particlesRef = useRef();
  const groupRef = useRef();

  // Create particles
  const particleCount = 150;
  const positions = React.useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Create random points inside a sphere of radius 3
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.8 + Math.random() * 1.0; // shell thickness
      
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    
    // Normalized mouse coordinates (-1 to 1)
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    // Calculate distance of cursor from screen center
    const mouseDistance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);

    if (groupRef.current) {
      // Magnetic pull: The entire 3D group pulls towards the mouse slightly
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mouseX * 0.4, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mouseY * 0.4, 0.05);
    }

    if (meshRef.current) {
      // Smoothly tilt core towards cursor
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mouseY * 0.8 + elapsed * 0.12, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouseX * 0.8 + elapsed * 0.18, 0.05);
      
      // Floating offset animation
      const floatOffset = Math.sin(elapsed * 1.5) * 0.12;
      meshRef.current.position.y = floatOffset;

      // Dynamically alter WebGL vertex distortion based on cursor distance
      if (meshRef.current.material) {
        meshRef.current.material.distort = THREE.MathUtils.lerp(
          meshRef.current.material.distort,
          0.35 + mouseDistance * 0.35,
          0.05
        );
        meshRef.current.material.speed = THREE.MathUtils.lerp(
          meshRef.current.material.speed,
          2.0 + mouseDistance * 2.5,
          0.05
        );
      }
    }

    if (wireframeRef.current) {
      // Counter-rotate the wireframe for dimensional contrast
      wireframeRef.current.rotation.x = THREE.MathUtils.lerp(wireframeRef.current.rotation.x, mouseY * 0.5 - elapsed * 0.06, 0.05);
      wireframeRef.current.rotation.y = THREE.MathUtils.lerp(wireframeRef.current.rotation.y, -mouseX * 0.5 - elapsed * 0.1, 0.05);
      
      // Expand wireframe scale slightly when mouse is active
      const targetScale = 1.6 + mouseDistance * 0.25;
      wireframeRef.current.scale.x = THREE.MathUtils.lerp(wireframeRef.current.scale.x, targetScale, 0.05);
      wireframeRef.current.scale.y = THREE.MathUtils.lerp(wireframeRef.current.scale.y, targetScale, 0.05);
      wireframeRef.current.scale.z = THREE.MathUtils.lerp(wireframeRef.current.scale.z, targetScale, 0.05);
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = elapsed * 0.05 + mouseX * 0.2;
      particlesRef.current.rotation.x = elapsed * 0.03 + mouseY * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dense glowing core */}
      <mesh ref={meshRef} scale={1.2}>
        <icosahedronGeometry args={[1, 5]} />
        <MeshDistortMaterial
          color="#E63946"
          roughness={0.15}
          metalness={0.9}
          distort={0.4}
          speed={2.2}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Wireframe outer shell */}
      <mesh ref={wireframeRef} scale={1.6}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial
          color="#FFFDF9"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Orbiting particle shell */}
      <Points ref={particlesRef} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#E63946"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}
