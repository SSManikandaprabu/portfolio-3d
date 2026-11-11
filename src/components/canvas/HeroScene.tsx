import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshReflectorMaterial,
  OrbitControls,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import { createHoloPanelTexture, createMonitorCodeTexture } from "./textures";

export type CameraFocus = "overview" | "monitor" | "brain" | "blockchain" | "globe";

const CAMERA_PRESETS: Record<
  CameraFocus,
  { pos: [number, number, number]; target: [number, number, number] }
> = {
  overview: { pos: [0, 2.35, 6.4], target: [0, 0.85, 0] },
  monitor: { pos: [0, 1.55, 3.0], target: [0, 1.22, -0.5] },
  brain: { pos: [-2.05, 1.95, 2.85], target: [-2.15, 1.65, -0.2] },
  blockchain: { pos: [2.15, 1.9, 2.9], target: [2.15, 1.58, -0.1] },
  globe: { pos: [2.2, 1.45, 3.1], target: [1.7, 0.92, 0.55] },
};

function CameraRig({ focus }: { focus: CameraFocus }) {
  const vecPos = useMemo(() => new THREE.Vector3(), []);
  const vecLook = useMemo(() => new THREE.Vector3(), []);
  const lookAtCurrent = useRef(new THREE.Vector3(0, 0.85, 0));

  useFrame((state, delta) => {
    const preset = CAMERA_PRESETS[focus];
    const parallaxX = state.pointer.x * 0.35;
    const parallaxY = state.pointer.y * 0.18;

    vecPos.set(
      preset.pos[0] + parallaxX,
      preset.pos[1] + parallaxY,
      preset.pos[2]
    );
    vecLook.set(preset.target[0], preset.target[1], preset.target[2]);

    const t = 1 - Math.exp(-3.2 * delta);
    state.camera.position.lerp(vecPos, t);
    lookAtCurrent.current.lerp(vecLook, t);
    state.camera.lookAt(lookAtCurrent.current);
  });

  return null;
}

function CurvedMonitor() {
  const codeTexture = useMemo(() => createMonitorCodeTexture(), []);

  return (
    <group position={[0, 1.28, -0.55]}>
      {/* Curved screen mesh (concave arc facing user) */}
      <mesh rotation={[0, Math.PI - 0.55, 0]}>
        <cylinderGeometry args={[2.1, 2.1, 1.08, 40, 1, true, 0, 1.1]} />
        <meshStandardMaterial
          map={codeTexture}
          emissiveMap={codeTexture}
          emissive="#ffffff"
          emissiveIntensity={0.85}
          side={THREE.BackSide}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Outer metallic curved frame */}
      <mesh position={[0, 0, -0.025]} rotation={[0, Math.PI - 0.57, 0]}>
        <cylinderGeometry args={[2.13, 2.13, 1.14, 40, 1, true, 0, 1.14]} />
        <meshStandardMaterial
          color="#111827"
          metalness={0.85}
          roughness={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Monitor neck & base */}
      <mesh position={[0, -0.82, -0.15]} castShadow>
        <boxGeometry args={[0.14, 0.72, 0.12]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, -1.16, 0.04]} castShadow>
        <boxGeometry args={[0.72, 0.05, 0.42]} />
        <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Subtle cyan ambient glow from screen */}
      <pointLight position={[0, 0, 0.8]} color="#38bdf8" intensity={1.8} distance={4} />
    </group>
  );
}

function KeyboardAndMouse() {
  const keysGroupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!keysGroupRef.current) return;
    const t = clock.getElapsedTime();
    keysGroupRef.current.children.forEach((child, idx) => {
      const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
      const hue = ((t * 0.12 + idx * 0.025) % 1 + 1) % 1;
      mat.emissive.setHSL(0.52 + hue * 0.28, 0.9, 0.5);
    });
  });

  const keys = useMemo(() => {
    const arr: [number, number][] = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 13; c++) {
        arr.push([-0.66 + c * 0.11, -0.13 + r * 0.085]);
      }
    }
    return arr;
  }, []);

  return (
    <group position={[0, 0.04, 0.65]}>
      {/* Desk Mat */}
      <mesh position={[0, -0.02, 0]} receiveShadow>
        <boxGeometry args={[2.5, 0.016, 1.05]} />
        <meshStandardMaterial color="#070b1a" roughness={0.85} metalness={0.1} />
      </mesh>

      {/* Keyboard chassis */}
      <mesh position={[-0.18, 0.02, 0.04]} rotation={[0.06, 0, 0]} castShadow>
        <boxGeometry args={[1.55, 0.05, 0.48]} />
        <meshStandardMaterial color="#0f172a" metalness={0.75} roughness={0.3} />
      </mesh>

      {/* RGB Keycaps */}
      <group ref={keysGroupRef} position={[-0.18, 0.055, 0.04]} rotation={[0.06, 0, 0]}>
        {keys.map(([x, z], idx) => (
          <mesh key={idx} position={[x, 0, z]} castShadow>
            <boxGeometry args={[0.082, 0.026, 0.064]} />
            <meshStandardMaterial
              color="#1e293b"
              emissive="#06b6d4"
              emissiveIntensity={0.65}
              roughness={0.35}
              metalness={0.3}
            />
          </mesh>
        ))}
      </group>

      {/* Gaming Mouse */}
      <group position={[0.88, 0.03, 0.08]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.095, 0.14, 8, 16]} />
          <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.085, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.022, 0.008, 8, 16]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#06b6d4"
            emissiveIntensity={2.2}
          />
        </mesh>
      </group>
    </group>
  );
}

function NeuralBrain() {
  const groupRef = useRef<THREE.Group>(null);

  const { nodes, lineGeo } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    const count = 42;
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const r = 0.42 + (i % 3) * 0.06;
      pts.push(
        new THREE.Vector3(
          Math.cos(theta) * radius * r,
          y * r * 0.82,
          Math.sin(theta) * radius * r
        )
      );
    }

    const linePositions: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < 0.44) {
          linePositions.push(pts[i].x, pts[i].y, pts[i].z);
          linePositions.push(pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    return { nodes: pts, lineGeo: geo };
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.38;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.35}>
      <group ref={groupRef} position={[-2.15, 1.65, -0.2]}>
        <lineSegments geometry={lineGeo}>
          <lineBasicMaterial color="#38bdf8" transparent opacity={0.5} />
        </lineSegments>
        {nodes.map((p, idx) => (
          <mesh key={idx} position={[p.x, p.y, p.z]}>
            <sphereGeometry args={[0.028, 12, 12]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? "#22d3ee" : "#c084fc"}
              emissive={idx % 2 === 0 ? "#06b6d4" : "#a855f7"}
              emissiveIntensity={2.2}
            />
          </mesh>
        ))}
        <pointLight color="#a855f7" intensity={1.4} distance={2.8} />
      </group>
    </Float>
  );
}

function BlockchainCubes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, idx) => {
      if (idx < 3) {
        child.rotation.x = t * 0.45 + idx;
        child.rotation.y = t * 0.55 + idx;
      }
    });
  });

  const positions: [number, number, number][] = [
    [-0.38, 0.25, 0],
    [0.05, 0.0, 0.18],
    [0.45, -0.22, -0.05],
  ];

  return (
    <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={groupRef} position={[2.15, 1.65, -0.1]}>
        {positions.map((pos, idx) => (
          <group key={idx} position={pos}>
            <mesh>
              <boxGeometry args={[0.26, 0.26, 0.26]} />
              <meshPhysicalMaterial
                color={idx === 1 ? "#a855f7" : "#06b6d4"}
                transparent
                opacity={0.42}
                roughness={0.1}
                metalness={0.4}
                transmission={0.3}
              />
            </mesh>
            <mesh>
              <boxGeometry args={[0.27, 0.27, 0.27]} />
              <meshBasicMaterial
                color={idx === 1 ? "#e879f9" : "#67e8f9"}
                wireframe
              />
            </mesh>
          </group>
        ))}

        {/* Connecting cryptographic chain links */}
        <mesh position={[-0.16, 0.12, 0.09]} rotation={[0.2, 0.4, -0.55]}>
          <cylinderGeometry args={[0.012, 0.012, 0.52, 8]} />
          <meshStandardMaterial
            color="#67e8f9"
            emissive="#06b6d4"
            emissiveIntensity={2}
          />
        </mesh>
        <mesh position={[0.25, -0.11, 0.06]} rotation={[-0.25, 0.3, -0.5]}>
          <cylinderGeometry args={[0.012, 0.012, 0.52, 8]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#a855f7"
            emissiveIntensity={2}
          />
        </mesh>
      </group>
    </Float>
  );
}

function DigitalGlobe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.28;
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.45;
  });

  return (
    <group position={[1.72, 0.62, 0.42]}>
      {/* Pedestal */}
      <mesh position={[0, -0.55, 0]} castShadow>
        <cylinderGeometry args={[0.24, 0.3, 0.08, 24]} />
        <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh ref={globeRef}>
        <sphereGeometry args={[0.32, 20, 20]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0284c7"
          emissiveIntensity={0.85}
          wireframe
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.24, 16, 16]} />
        <meshStandardMaterial
          color="#1e1b4b"
          emissive="#3b82f6"
          emissiveIntensity={0.35}
          transparent
          opacity={0.75}
        />
      </mesh>
      <mesh ref={ringRef} rotation={[1.2, 0.35, 0]}>
        <torusGeometry args={[0.45, 0.01, 10, 48]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={1.8}
        />
      </mesh>
    </group>
  );
}

function DeveloperAstronaut() {
  return (
    <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.14}>
      <group position={[-1.68, 0.45, 0.56]} rotation={[0, 0.42, 0]}>
        {/* Backpack */}
        <mesh position={[0, 0.16, -0.14]} castShadow>
          <boxGeometry args={[0.24, 0.3, 0.12]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Torso */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <capsuleGeometry args={[0.14, 0.2, 8, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.25} metalness={0.2} />
        </mesh>
        {/* Helmet */}
        <mesh position={[0, 0.42, 0]} castShadow>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.3} />
        </mesh>
        {/* Gold Reflective Visor */}
        <mesh position={[0, 0.43, 0.08]}>
          <sphereGeometry args={[0.12, 20, 20]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#b45309"
            emissiveIntensity={0.4}
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
        {/* Legs */}
        <mesh position={[-0.08, -0.12, 0.08]} rotation={[1.2, 0, 0.08]}>
          <capsuleGeometry args={[0.055, 0.16, 6, 12]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
        </mesh>
        <mesh position={[0.08, -0.12, 0.08]} rotation={[1.2, 0, -0.08]}>
          <capsuleGeometry args={[0.055, 0.16, 6, 12]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
        </mesh>
        {/* Mini Glowing Laptop */}
        <group position={[0, 0.04, 0.26]}>
          <mesh>
            <boxGeometry args={[0.26, 0.018, 0.18]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.09, -0.08]} rotation={[-0.3, 0, 0]}>
            <boxGeometry args={[0.26, 0.18, 0.015]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive="#22d3ee"
              emissiveIntensity={1.2}
            />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

function HoloPanels() {
  const leftTex = useMemo(
    () =>
      createHoloPanelTexture("NEURAL_ENGINE.AI", "#22d3ee", [
        ["MODEL", "MobileNetV2"],
        ["ACCURACY", "96.0% (F1 0.959)"],
        ["RUNTIME", "Flask + TensorFlow"],
      ]),
    []
  );

  const rightTex = useMemo(
    () =>
      createHoloPanelTexture("CERTCHAIN.SOL", "#c084fc", [
        ["NETWORK", "Polygon L2"],
        ["HASHING", "SHA-256 + Merkle"],
        ["PRIVACY", "Client WebCrypto"],
      ]),
    []
  );

  return (
    <>
      <Float speed={2.2} floatIntensity={0.18}>
        <mesh position={[-1.42, 1.38, -0.28]} rotation={[0, 0.36, 0]}>
          <planeGeometry args={[0.92, 0.56]} />
          <meshBasicMaterial
            map={leftTex}
            transparent
            opacity={0.82}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>
      <Float speed={2.0} floatIntensity={0.18}>
        <mesh position={[1.42, 1.38, -0.28]} rotation={[0, -0.36, 0]}>
          <planeGeometry args={[0.92, 0.56]} />
          <meshBasicMaterial
            map={rightTex}
            transparent
            opacity={0.82}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>
    </>
  );
}

function DeskSurface() {
  return (
    <group position={[0, 0, 0]}>
      {/* Reflective obsidian desk top */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 9]} />
        <MeshReflectorMaterial
          blur={[280, 90]}
          resolution={512}
          mixBlur={0.9}
          mixStrength={32}
          roughness={0.35}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#060917"
          metalness={0.7}
          mirror={0.45}
        />
      </mesh>

      {/* Neon LED edge bar along back of desk */}
      <mesh position={[0, 0.02, -1.25]}>
        <boxGeometry args={[6.4, 0.025, 0.04]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#06b6d4"
          emissiveIntensity={2.6}
        />
      </mesh>
    </group>
  );
}

export function HeroScene({
  focus,
  reducedMotion,
}: {
  focus: CameraFocus;
  reducedMotion: boolean;
}) {
  return (
    <Canvas
      shadows
      dpr={reducedMotion ? [1, 1] : [1, 1.75]}
      camera={{ position: [0, 2.35, 6.4], fov: 44 }}
      className="h-full w-full"
    >
      <color attach="background" args={["#040611"]} />
      <fog attach="fog" args={["#040611", 6, 16]} />

      <ambientLight intensity={0.45} />
      <directionalLight
        position={[3.5, 5.5, 4]}
        intensity={1.3}
        color="#dbeafe"
        castShadow
      />
      <pointLight position={[-3.5, 2.4, 1.5]} color="#a855f7" intensity={2.4} />
      <pointLight position={[3.5, 2.2, 1.5]} color="#06b6d4" intensity={2.4} />

      <Suspense fallback={null}>
        <DeskSurface />
        <CurvedMonitor />
        <KeyboardAndMouse />
        <HoloPanels />
        <NeuralBrain />
        <BlockchainCubes />
        <DigitalGlobe />
        <DeveloperAstronaut />
        {!reducedMotion && (
          <Sparkles
            count={65}
            scale={[9, 4.5, 6]}
            size={2}
            speed={0.35}
            color="#67e8f9"
          />
        )}
        <CameraRig focus={focus} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.05}
          minPolarAngle={Math.PI / 4}
        />
      </Suspense>
    </Canvas>
  );
}
