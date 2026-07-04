"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "next-themes";

function StartingBlocksGeometry({ isLight }: { isLight: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Subtle idle breathing rotation (slow track ambiance)
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.05 + 0.2;
    }
  });

  const railColor = isLight ? "#cbd5e1" : "#1a1a1e";
  const electricColor = isLight ? "#0077e6" : "#00d4ff";
  const amberColor = isLight ? "#d97706" : "#ff9500";
  const pedalColor = isLight ? "#f8fafc" : "#222228";
  const markerColor = isLight ? "#94a3b8" : "#555560";

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Center Lane Line Rail */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[3.2, 0.06, 0.3]} />
        <meshStandardMaterial color={railColor} roughness={0.3} metalness={isLight ? 0.4 : 0.8} />
      </mesh>

      {/* Electric Blue Center Stripe */}
      <mesh position={[0, -0.36, 0]}>
        <boxGeometry args={[3.0, 0.01, 0.04]} />
        <meshBasicMaterial color={electricColor} />
      </mesh>

      {/* Front Starting Pedal */}
      <mesh position={[-0.8, 0, 0]} rotation={[0, 0, THREE.MathUtils.degToRad(45)]}>
        <boxGeometry args={[0.5, 0.6, 0.35]} />
        <meshStandardMaterial color={pedalColor} roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Front Pedal Glow Pad */}
      <mesh position={[-0.78, 0.05, 0]} rotation={[0, 0, THREE.MathUtils.degToRad(45)]}>
        <boxGeometry args={[0.45, 0.55, 0.02]} />
        <meshBasicMaterial color={electricColor} opacity={0.7} transparent />
      </mesh>

      {/* Rear Starting Pedal */}
      <mesh position={[0.5, 0.2, 0]} rotation={[0, 0, THREE.MathUtils.degToRad(60)]}>
        <boxGeometry args={[0.5, 0.6, 0.35]} />
        <meshStandardMaterial color={pedalColor} roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Rear Pedal Glow Pad */}
      <mesh position={[0.52, 0.25, 0]} rotation={[0, 0, THREE.MathUtils.degToRad(60)]}>
        <boxGeometry args={[0.45, 0.55, 0.02]} />
        <meshBasicMaterial color={amberColor} opacity={0.6} transparent />
      </mesh>

      {/* Distance Marker Tick Posts */}
      {[-1.4, -0.7, 0, 0.7, 1.4].map((x, idx) => (
        <mesh key={idx} position={[x, -0.5, 0.4]}>
          <boxGeometry args={[0.04, 0.2, 0.04]} />
          <meshBasicMaterial color={idx === 2 ? electricColor : markerColor} />
        </mesh>
      ))}
    </group>
  );
}

export default function TrackScene() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-transparent" />;

  const isLight = resolvedTheme === "light";

  // Respect prefers-reduced-motion: render static high-fidelity SVG fallback
  if (reducedMotion) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <svg
          viewBox="0 0 400 120"
          className="w-full max-w-md opacity-80 stroke-electric fill-none stroke-[1.5]"
          aria-label="Static Starting Blocks Abstraction"
        >
          <line x1="20" y1="90" x2="380" y2="90" className="stroke-border-subtle stroke-2" />
          <line x1="40" y1="90" x2="360" y2="90" className="stroke-electric" strokeDasharray="8 4" />
          <polygon points="100,90 140,50 155,65 115,90" className="fill-surface stroke-electric" />
          <polygon points="220,90 270,35 285,50 235,90" className="fill-surface stroke-amber" />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[260px] cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 1.2, 4.2], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={isLight ? 0.9 : 0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color={isLight ? "#0077e6" : "#00d4ff"} />
        <directionalLight position={[-5, 3, -2]} intensity={0.5} color={isLight ? "#d97706" : "#ff9500"} />
        <StartingBlocksGeometry isLight={isLight} />
      </Canvas>
    </div>
  );
}
