import { ReactNode, useRef, useState } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "cyan" | "purple" | "blue";
}

const GLOW_MAP = {
  cyan: "rgba(6, 182, 212, 0.22)",
  purple: "rgba(168, 85, 247, 0.22)",
  blue: "rgba(59, 130, 246, 0.22)",
};

export function TiltCard({
  children,
  className = "",
  glowColor = "cyan",
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
  );
  const [spot, setSpot] = useState({ x: 50, y: 50, active: false });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 12;
    const rotateX = (0.5 - py) * 12;
    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
        2
      )}deg) scale3d(1.015,1.015,1.015)`
    );
    setSpot({ x: px * 100, y: py * 100, active: true });
  }

  function handleMouseLeave() {
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
    );
    setSpot((s) => ({ ...s, active: false }));
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className={`glass-panel relative overflow-hidden rounded-2xl ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: spot.active ? 1 : 0,
          background: `radial-gradient(360px circle at ${spot.x}% ${spot.y}%, ${GLOW_MAP[glowColor]}, transparent 65%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
