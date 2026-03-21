import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Environment } from "@react-three/drei";
import * as THREE from "three";

const standMaterial = new THREE.MeshStandardMaterial({
  color: "#8B7536",
  metalness: 0.9,
  roughness: 0.25,
});

const standAccentMaterial = new THREE.MeshStandardMaterial({
  color: "#C9A84C",
  metalness: 0.95,
  roughness: 0.15,
});

function Stand() {
  return (
    <group position={[0, -2.2, 0]}>
      {/* Base plate */}
      <mesh position={[0, 0, 0]} material={standMaterial}>
        <cylinderGeometry args={[1.5, 1.7, 0.16, 32]} />
      </mesh>
      {/* Central pillar */}
      <mesh position={[0, 0.45, 0]} material={standMaterial}>
        <cylinderGeometry args={[0.3, 0.55, 0.7, 16]} />
      </mesh>
      {/* Cradle — wider cup shape that holds the ball */}
      <mesh position={[0, 0.85, 0]} material={standAccentMaterial}>
        <cylinderGeometry args={[1.1, 0.4, 0.15, 32]} />
      </mesh>
    </group>
  );
}

function CrystalBall() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={[0, 0.5, 0]}>
        {/* Outer glass sphere */}
        <mesh ref={meshRef} renderOrder={2}>
          <sphereGeometry args={[1.8, 64, 64]} />
          <meshPhysicalMaterial
            color="#5B21B6"
            transmission={0.8}
            roughness={0.08}
            thickness={0.6}
            envMapIntensity={1.2}
            clearcoat={1}
            clearcoatRoughness={0.08}
            ior={1.5}
            transparent
            opacity={0.35}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* Point light inside */}
        <pointLight color="#D97706" intensity={2} distance={5} />
        <pointLight color="#7C3AED" intensity={1} distance={8} position={[0, 2, 0]} />

        {/* Stand */}
        <Stand />
      </group>
    </Float>
  );
}

function OrbitalParticles() {
  const groupRef = useRef<THREE.Group>(null);
  const particles = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => {
        const theta = (i / 60) * Math.PI * 2;
        const radius = 2.5 + Math.random() * 1;
        return {
          position: [
            Math.cos(theta) * radius,
            (Math.random() - 0.5) * 2,
            Math.sin(theta) * radius,
          ] as [number, number, number],
          speed: 0.3 + Math.random() * 0.5,
          offset: Math.random() * Math.PI * 2,
        };
      }),
    [],
  );

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#D97706" : "#7C3AED"}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function CrystalBallScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <Stars radius={50} depth={50} count={1000} factor={3} saturation={0.5} fade speed={1} />
        <CrystalBall />
        <OrbitalParticles />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
