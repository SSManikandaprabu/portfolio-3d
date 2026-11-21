import { useEffect, useRef, useState } from "react";
import { Gamepad2, RotateCcw, Trophy, X, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { sounds } from "../../utils/sound";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Point = { x: number; y: number };

const GRID_SIZE = 20;

export function ArcadeGameModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem("cyber_snake_highscore") || "0", 10);
    } catch {
      return 0;
    }
  });
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const snakeRef = useRef<Point[]>([
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ]);
  const foodRef = useRef<Point>({ x: 5, y: 5 });
  const dirRef = useRef<Direction>("UP");
  const nextDirRef = useRef<Direction>("UP");

  function spawnFood(snake: Point[]): Point {
    let p: Point;
    while (true) {
      p = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!snake.some((s) => s.x === p.x && s.y === p.y)) break;
    }
    return p;
  }

  function resetGame() {
    sounds.warp();
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ];
    dirRef.current = "UP";
    nextDirRef.current = "UP";
    foodRef.current = spawnFood(snakeRef.current);
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  }

  function setDirection(d: Direction) {
    const cur = dirRef.current;
    if (d === "UP" && cur !== "DOWN") nextDirRef.current = "UP";
    if (d === "DOWN" && cur !== "UP") nextDirRef.current = "DOWN";
    if (d === "LEFT" && cur !== "RIGHT") nextDirRef.current = "LEFT";
    if (d === "RIGHT" && cur !== "LEFT") nextDirRef.current = "RIGHT";
    sounds.keypress();
  }

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (["ArrowUp", "KeyW"].includes(e.code)) {
        e.preventDefault();
        setDirection("UP");
      } else if (["ArrowDown", "KeyS"].includes(e.code)) {
        e.preventDefault();
        setDirection("DOWN");
      } else if (["ArrowLeft", "KeyA"].includes(e.code)) {
        e.preventDefault();
        setDirection("LEFT");
      } else if (["ArrowRight", "KeyD"].includes(e.code)) {
        e.preventDefault();
        setDirection("RIGHT");
      } else if (e.code === "Space") {
        e.preventDefault();
        if (gameOver) resetGame();
        else setIsPaused((p) => !p);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, gameOver]);

  // Main Game Loop
  useEffect(() => {
    if (!isOpen || gameOver || isPaused) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const interval = setInterval(() => {
      dirRef.current = nextDirRef.current;
      const head = { ...snakeRef.current[0] };

      if (dirRef.current === "UP") head.y -= 1;
      if (dirRef.current === "DOWN") head.y += 1;
      if (dirRef.current === "LEFT") head.x -= 1;
      if (dirRef.current === "RIGHT") head.x += 1;

      // Wall collision or self collision
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE ||
        snakeRef.current.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        sounds.hover();
        setGameOver(true);
        return;
      }

      const newSnake = [head, ...snakeRef.current];

      // Check food collision
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        sounds.click();
        const newScore = score + 10;
        setScore(newScore);
        if (newScore > highScore) {
          setHighScore(newScore);
          sounds.success();
          try {
            localStorage.setItem("cyber_snake_highscore", String(newScore));
          } catch {}
        }
        foodRef.current = spawnFood(newSnake);
      } else {
        newSnake.pop();
      }

      snakeRef.current = newSnake;

      // Render on Canvas
      const cellSize = canvas.width / GRID_SIZE;
      ctx.fillStyle = "#040611";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle grid
      ctx.strokeStyle = "rgba(56, 189, 248, 0.08)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
      }

      // Draw Food (Pulsing Pink/Purple Quantum Core)
      ctx.fillStyle = "#e879f9";
      ctx.shadowColor = "#c084fc";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(
        foodRef.current.x * cellSize + cellSize / 2,
        foodRef.current.y * cellSize + cellSize / 2,
        cellSize / 2.6,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Draw Snake
      snakeRef.current.forEach((seg, idx) => {
        ctx.fillStyle = idx === 0 ? "#22d3ee" : "#06b6d4";
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = idx === 0 ? 14 : 6;
        ctx.fillRect(
          seg.x * cellSize + 1.5,
          seg.y * cellSize + 1.5,
          cellSize - 3,
          cellSize - 3
        );
      });
      ctx.shadowBlur = 0;
    }, 110);

    return () => clearInterval(interval);
  }, [isOpen, gameOver, isPaused, score, highScore]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-panel flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-cyan-500/40 bg-[#070b1e]/95 p-4 shadow-2xl shadow-cyan-500/30 sm:p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/30 to-purple-500/30 ring-1 ring-cyan-400/40">
              <Gamepad2 className="h-4 w-4 text-cyan-300" />
            </span>
            <div>
              <h3 className="font-display text-sm font-bold text-white">
                CYBER SNAKE ARCADE
              </h3>
              <p className="font-mono text-[10px] text-cyan-300">
                Retro WebGL Workspace Mini-Game
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Score Stats */}
        <div className="my-3 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 font-mono text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span>SCORE:</span>
            <span className="font-bold text-cyan-300">{score}</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-300">
            <Trophy className="h-3.5 w-3.5 text-amber-400" />
            <span>BEST:</span>
            <span className="font-bold">{highScore}</span>
          </div>
        </div>

        {/* Canvas Arena */}
        <div className="relative mx-auto flex items-center justify-center rounded-xl border border-cyan-500/30 bg-[#040611] p-1 shadow-inner shadow-cyan-950">
          <canvas
            ref={canvasRef}
            width={340}
            height={340}
            className="rounded-lg"
          />

          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 p-4 text-center backdrop-blur-sm">
              <p className="font-display text-xl font-bold text-rose-400">
                SYSTEM OVERLOAD!
              </p>
              <p className="mt-1 font-mono text-xs text-slate-300">
                Final Score: <span className="text-cyan-300 font-bold">{score}</span>
              </p>
              <button
                type="button"
                onClick={resetGame}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 font-mono text-xs font-semibold text-white shadow-lg transition hover:brightness-110"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Play Again (Space)
              </button>
            </div>
          )}
        </div>

        {/* On-Screen D-Pad for Mobile & Touch */}
        <div className="mt-4 flex items-center justify-center gap-1 sm:hidden">
          <div className="grid grid-cols-3 gap-1.5">
            <div />
            <button
              type="button"
              onClick={() => setDirection("UP")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-cyan-300 active:bg-cyan-500/20"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
            <div />
            <button
              type="button"
              onClick={() => setDirection("LEFT")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-cyan-300 active:bg-cyan-500/20"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setDirection("DOWN")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-cyan-300 active:bg-cyan-500/20"
            >
              <ArrowDown className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setDirection("RIGHT")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-cyan-300 active:bg-cyan-500/20"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Instructions */}
        <p className="mt-3 text-center font-mono text-[11px] text-slate-500">
          Use <kbd className="text-slate-300">W A S D</kbd> or <kbd className="text-slate-300">Arrows</kbd> to maneuver. Space to pause.
        </p>
      </div>
    </div>
  );
}
