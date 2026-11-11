import { useEffect, useState } from "react";

export function CustomCursor({ disabled }: { disabled: boolean }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [pointer, setPointer] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || disabled) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    function onMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement | null;
      setPointer(
        Boolean(target?.closest("a, button, [role='button'], input, textarea"))
      );
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [disabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/70 transition-[width,height,border-color] duration-150"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
          width: pointer ? 40 : 28,
          height: pointer ? 40 : 28,
          borderColor: pointer
            ? "rgba(168, 85, 247, 0.9)"
            : "rgba(34, 211, 238, 0.7)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#22d3ee]"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </>
  );
}
