"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 800 }) {
  const pointsRef = useRef();
  
  // Track scroll parameters frame-by-frame
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);

  // Create random position coordinates and color distributions
  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const szs = new Float32Array(count);

    const creamColor = new THREE.Color("#FFFDF9");
    const redColor = new THREE.Color("#E63946");

    for (let i = 0; i < count; i++) {
      // Spread particles inside a deep 3D tunnel cylinder
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 8; // Cylinder hollow center
      
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 35; // Very deep depth span

      // Color distribution: 85% Cream, 15% Red
      const isRed = Math.random() < 0.15;
      const color = isRed ? redColor : creamColor;
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;

      // Random sizes
      szs[i] = Math.random() * 0.08 + 0.02;
    }
    return [pos, cols, szs];
  }, [count]);

  // Handle frame-by-frame mouse response and gentle rotation/drift
  useFrame((state) => {
    if (!pointsRef.current) return;

    // Track scroll changes directly from window context
    const currentScroll = typeof window !== "undefined" ? window.scrollY : 0;
    const delta = Math.abs(currentScroll - lastScrollY.current);
    lastScrollY.current = currentScroll;

    // Smoothly lerp velocity to avoid jittering
    scrollVelocity.current = THREE.MathUtils.lerp(scrollVelocity.current, delta, 0.06);

    // Dynamic Hyperspace Warp:
    // When scrolling fast, stretch the particle field along the Z-axis (making speed lines)
    const targetScaleZ = 1 + scrollVelocity.current * 0.18;
    pointsRef.current.scale.z = THREE.MathUtils.lerp(pointsRef.current.scale.z, targetScaleZ, 0.08);

    // Speed up standard rotation based on scrolling speed
    const speedMultiplier = 1 + scrollVelocity.current * 0.04;
    pointsRef.current.rotation.y += 0.0015 * speedMultiplier;
    pointsRef.current.rotation.x += 0.0005 * speedMultiplier;

    // Move camera space slightly with scroll depth
    pointsRef.current.position.z = THREE.MathUtils.lerp(pointsRef.current.position.z, -(currentScroll * 0.002) % 35, 0.05);

    // Track mouse coordinates from React Three Fiber pointer state
    const targetX = state.pointer.x * 2.0;
    const targetY = state.pointer.y * 2.0;

    // Smooth ease-out towards mouse position
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.05;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.45}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function GlobalCanvas() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <Particles />
      </Canvas>
    </div>
  );
}
