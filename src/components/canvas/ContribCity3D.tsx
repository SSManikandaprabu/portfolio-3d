import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

interface ContributionWeek {
  contributionDays: { date: string; contributionCount: number }[];
}

interface ContribCity3DProps {
  weeks: ContributionWeek[];
  onSelectDay: (day: { date: string; count: number } | null) => void;
}

function barStyle(count: number): { color: string; emissive: string; intensity: number } {
  if (count <= 0) return { color: "#151b33", emissive: "#000000", intensity: 0 };
  if (count <= 2) return { color: "#0e7490", emissive: "#06b6d4", intensity: 0.35 };
  if (count <= 4) return { color: "#22d3ee", emissive: "#06b6d4", intensity: 0.7 };
  if (count <= 7) return { color: "#c084fc", emissive: "#a855f7", intensity: 0.9 };
  return { color: "#f472b6", emissive: "#ec4899", intensity: 1.2 };
}

function CityGrid({ weeks, onSelectDay }: ContribCity3DProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const sliced = useMemo(() => weeks.slice(-52), [weeks]);
  const cols = sliced.length;

  const bars = useMemo(() => {
    const list: {
      key: string;
      x: number;
      z: number;
      h: number;
      date: string;
      count: number;
      color: string;
      emissive: string;
      intensity: number;
    }[] = [];

    const spacing = 0.44;
    const offsetX = -((cols - 1) * spacing) / 2;
    const offsetZ = -(6 * spacing) / 2;

    sliced.forEach((wk, cIdx) => {
      wk.contributionDays.forEach((day, rIdx) => {
        const count = day.contributionCount;
        const h = count <= 0 ? 0.08 : Math.min(2.6, 0.28 + count * 0.24);
        const st = barStyle(count);
        list.push({
          key: day.date,
          x: offsetX + cIdx * spacing,
          z: offsetZ + rIdx * spacing,
          h,
          date: day.date,
          count,
          ...st,
        });
      });
    });

    return list;
  }, [sliced, cols]);

  return (
    <group position={[0, -0.4, 0]}>
      {/* Architectural Obsidian Plinth */}
      <mesh position={[0, -0.22, 0]} receiveShadow>
        <boxGeometry args={[cols * 0.44 + 0.8, 0.4, 7 * 0.44 + 0.8]} />
        <meshStandardMaterial color="#090d20" metalness={0.75} roughness={0.35} />
      </mesh>
      {/* Neon Cyan Trim */}
      <mesh position={[0, -0.02, (7 * 0.44 + 0.8) / 2 + 0.01]}>
        <boxGeometry args={[cols * 0.44 + 0.82, 0.03, 0.03]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#06b6d4"
          emissiveIntensity={2.2}
        />
      </mesh>

      {bars.map((b) => {
        const isHovered = hoveredKey === b.key;
        return (
          <mesh
            key={b.key}
            position={[b.x, b.h / 2, b.z]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredKey(b.key);
              onSelectDay({ date: b.date, count: b.count });
            }}
            onPointerOut={() => {
              setHoveredKey(null);
            }}
          >
            <boxGeometry args={[0.34, b.h, 0.34]} />
            <meshStandardMaterial
              color={isHovered ? "#ffffff" : b.color}
              emissive={isHovered ? "#38bdf8" : b.emissive}
              emissiveIntensity={isHovered ? 1.8 : b.intensity}
              metalness={0.35}
              roughness={0.28}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export function ContribCity3D({ weeks, onSelectDay }: ContribCity3DProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [9.5, 8.2, 11.5], fov: 36 }}
      className="h-full w-full"
    >
      <color attach="background" args={["#050816"]} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[8, 14, 10]} intensity={1.4} color="#dbeafe" />
      <pointLight position={[-10, 6, -4]} intensity={1.8} color="#a855f7" />
      <pointLight position={[10, 5, 6]} intensity={1.8} color="#06b6d4" />

      <CityGrid weeks={weeks} onSelectDay={onSelectDay} />

      <OrbitControls
        enablePan={false}
        minDistance={8}
        maxDistance={24}
        maxPolarAngle={Math.PI / 2.15}
        minPolarAngle={Math.PI / 6}
      />
    </Canvas>
  );
}
