"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function GoldRing({ position, rotationOffset = 0, scale = 1 }: {
  position: [number, number, number];
  rotationOffset?: number;
  scale?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4 + rotationOffset) * 0.1;
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.8 + rotationOffset) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Torus ring */}
      <mesh castShadow>
        <torusGeometry args={[0.55, 0.07, 64, 200]} />
        <meshStandardMaterial
          color="#f7d77a"
          metalness={1}
          roughness={0.18}
          emissive="#3a2a05"
          emissiveIntensity={0.4}
        />
      </mesh>
      {/* Inner subtle highlight ring */}
      <mesh>
        <torusGeometry args={[0.55, 0.071, 64, 200]} />
        <meshStandardMaterial
          color="#ffe9a8"
          metalness={1}
          roughness={0.05}
          transparent
          opacity={0.18}
        />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <spotLight position={[5, 8, 6]} angle={0.5} penumbra={1} intensity={2.4} castShadow color="#fff4e0" />
      <pointLight position={[-4, 2, -2]} intensity={0.6} color="#9ab8ff" />

      {/* Two interlocking rings */}
      <group rotation={[0.4, 0, 0]}>
        <GoldRing position={[-0.35, 0, 0]} rotationOffset={0} />
        <GoldRing position={[0.35, 0, 0]} rotationOffset={Math.PI} />
      </group>

      <ContactShadows
        position={[0, -1.1, 0]}
        opacity={0.6}
        scale={6}
        blur={2.6}
        far={4}
        color="#000"
      />
      <Suspense fallback={null}>
        <Environment preset="studio" />
      </Suspense>
    </>
  );
}

export function GoldRings({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.5, 4], fov: 38 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
