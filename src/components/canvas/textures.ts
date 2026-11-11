import * as THREE from "three";

export function createMonitorCodeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  // Background
  const grad = ctx.createLinearGradient(0, 0, 1024, 512);
  grad.addColorStop(0, "#050918");
  grad.addColorStop(1, "#0b122b");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Sidebar & top bar
  ctx.fillStyle = "#080e24";
  ctx.fillRect(0, 0, 180, 512);
  ctx.fillStyle = "#0b1433";
  ctx.fillRect(0, 0, 1024, 40);

  // Traffic dots
  const dots = ["#ef4444", "#f59e0b", "#22c55e"];
  dots.forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(24 + i * 20, 20, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "#67e8f9";
  ctx.font = "bold 16px monospace";
  ctx.fillText("certchain-neural-engine.ts", 205, 25);

  // Sidebar explorer files
  ctx.fillStyle = "#64748b";
  ctx.font = "14px monospace";
  const files = [
    "SRC/",
    "  ai/mobilenet.py",
    "  web3/merkle.sol",
    "  pdf/worker.wasm",
    "  queue/socket.ts",
    "  scene/desk3d.tsx",
  ];
  files.forEach((f, idx) => {
    ctx.fillStyle = idx === 0 ? "#a855f7" : idx === 5 ? "#22d3ee" : "#94a3b8";
    ctx.fillText(f, 18, 78 + idx * 28);
  });

  // Code lines
  const lines: [string, string][] = [
    ["import { MerkleTree } from '@certchain/crypto';", "#c084fc"],
    ["import * as tf from '@tensorflow/tfjs-node';", "#c084fc"],
    ["", "#fff"],
    ["export async function verifyAndPredict(payload: Buffer) {", "#38bdf8"],
    ["  const digest = await crypto.subtle.digest('SHA-256', payload);", "#e2e8f0"],
    ["  const proof = MerkleTree.generateProof(digest);", "#67e8f9"],
    ["  const model = await tf.loadLayersModel('mobilenet_v2');", "#facc15"],
    ["  const score = model.predict(normalizeTensor(payload));", "#e2e8f0"],
    ["  return { verified: proof.valid, confidence: 0.960, score };", "#4ade80"],
    ["}", "#38bdf8"],
    ["", "#fff"],
    ["// > Build: 100% client-side · Zero server retention", "#64748b"],
    ["// > Status: Polygon Registry & Socket.io Synced", "#22d3ee"],
  ];

  ctx.font = "17px monospace";
  lines.forEach(([text, color], idx) => {
    ctx.fillStyle = "#334155";
    ctx.fillText(String(idx + 1).padStart(2, "0"), 198, 84 + idx * 30);
    ctx.fillStyle = color;
    ctx.fillText(text, 238, 84 + idx * 30);
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createHoloPanelTexture(
  title: string,
  accent: string,
  metrics: [string, string][]
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "rgba(6, 14, 34, 0.85)";
  ctx.fillRect(0, 0, 512, 320);

  ctx.strokeStyle = accent;
  ctx.lineWidth = 4;
  ctx.strokeRect(8, 8, 496, 304);

  ctx.fillStyle = accent;
  ctx.font = "bold 22px monospace";
  ctx.fillText(title, 28, 48);

  ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(28, 66);
  ctx.lineTo(484, 66);
  ctx.stroke();

  metrics.forEach(([k, v], idx) => {
    const y = 112 + idx * 48;
    ctx.fillStyle = "#94a3b8";
    ctx.font = "18px monospace";
    ctx.fillText(k, 28, y);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 20px monospace";
    ctx.fillText(v, 240, y);
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
