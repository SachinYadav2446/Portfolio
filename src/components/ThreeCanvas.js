"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function ThreeCanvas({ children, cameraPosition = [0, 0, 5], enableControls = false, fov = 75 }) {
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 0, pointerEvents: enableControls ? "auto" : "none" }}>
      <Canvas
        camera={{ position: cameraPosition, fov: fov }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} color="#FFFDF9" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#E63946" />
          {children}
          {enableControls && (
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              maxPolarAngle={Math.PI / 1.8}
              minPolarAngle={Math.PI / 3}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
