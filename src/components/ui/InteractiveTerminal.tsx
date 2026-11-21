import { useEffect, useRef, useState } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from "lucide-react";
import { PROFILE, PROJECTS, EXPERIENCES, SKILL_GROUPS } from "../../data/profile";
import { sounds } from "../../utils/sound";

interface OutputLine {
  id: string;
  type: "input" | "output" | "error" | "matrix" | "banner";
  text?: string;
  items?: { label: string; value: string }[];
}

const COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "contact",
  "matrix",
  "game",
  "clear",
  "sudo",
];

export function InteractiveTerminal({
  isOpen,
  onClose,
  onSwitchTheme,
  onOpenArcade,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSwitchTheme?: (theme: string) => void;
  onOpenArcade?: () => void;
}) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [lines, setLines] = useState<OutputLine[]>([
    {
      id: "init-1",
      type: "banner",
      text: "⚡ SS.MANIKANDA INTERACTIVE TERMINAL v3.2.0 [x86_64-pc-none-elf]",
    },
    {
      id: "init-2",
      type: "output",
      text: "Type 'help' to view available system commands or click any quick pill below.",
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      sounds.warp();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, matrixActive]);

  useEffect(() => {
    if (!matrixActive) return;
    const interval = setInterval(() => {
      const chars = "010101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*+<>{}";
      let row = "";
      for (let i = 0; i < 48; i++) {
        row += chars[Math.floor(Math.random() * chars.length)];
      }
      setLines((prev) => [
        ...prev.slice(-30),
        { id: Math.random().toString(), type: "matrix", text: row },
      ]);
    }, 90);

    const timeout = setTimeout(() => {
      setMatrixActive(false);
      setLines((prev) => [
        ...prev,
        { id: Math.random().toString(), type: "output", text: "Matrix execution completed. Neural connection closed." },
      ]);
    }, 4500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [matrixActive]);

  function handleCommand(cmd: string) {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    sounds.click();
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").toLowerCase();

    const newLines: OutputLine[] = [
      ...lines,
      { id: Math.random().toString(), type: "input", text: trimmed },
    ];

    switch (command) {
      case "help":
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          text: `AVAILABLE COMMANDS:
  about        - View identity, location, and engineering bio
  skills       - View full technical matrix across languages and frameworks
  projects     - List production projects & architecture links
  experience   - Display industry career timeline & internships
  education    - Display SRM IST credentials, degree, and CGPA
  contact      - Show developer email, LinkedIn, and GitHub links
  game         - Launch Cyber Snake retro arcade mini-game
  matrix       - Trigger real-time digital rain stream
  theme <id>   - Change 3D workspace theme (neon, matrix, amber, cyber)
  clear        - Clear the terminal console
  sudo         - Root elevation request`,
        });
        break;

      case "game":
      case "snake":
      case "play":
        onOpenArcade?.();
        sounds.success();
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          text: "🎮 Cyber Snake Arcade initialized! Launching retro mini-game console...",
        });
        break;

      case "about":
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          text: `NAME:     ${PROFILE.displayName} (@${PROFILE.handle})
ROLE:     ${PROFILE.role}
LOCATION: ${PROFILE.location}
COLLEGE:  ${PROFILE.education.institution} (${PROFILE.education.period})
STATUS:   Open to Software Engineering Internships
BIO:      ${PROFILE.bio}`,
        });
        break;

      case "skills":
        {
          const skillSummary = SKILL_GROUPS.map((g) => {
            const list = g.items.map((it) => `[${it.name}]`).join(" ");
            return `• ${g.category.toUpperCase()}:\n  ${list}`;
          }).join("\n\n");
          newLines.push({
            id: Math.random().toString(),
            type: "output",
            text: skillSummary,
          });
        }
        break;

      case "projects":
        {
          const projList = PROJECTS.map(
            (p, idx) =>
              `[${idx + 1}] ${p.title} (${p.category}) — ${p.subtitle}\n    Stack: ${p.stack.slice(0, 5).join(", ")}\n    URL: ${p.liveUrl}`
          ).join("\n\n");
          newLines.push({
            id: Math.random().toString(),
            type: "output",
            text: projList,
          });
        }
        break;

      case "experience":
        {
          const expList = EXPERIENCES.map(
            (e) => `• ${e.role} @ ${e.company} (${e.period}) [${e.location}]\n  ${e.highlights.join(" ")}`
          ).join("\n\n");
          newLines.push({
            id: Math.random().toString(),
            type: "output",
            text: expList,
          });
        }
        break;

      case "education":
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          text: `INSTITUTION: ${PROFILE.education.institution}
DEGREE:      ${PROFILE.education.degree}
PERIOD:      ${PROFILE.education.period}
CGPA:        ${PROFILE.education.cgpa}
COURSEWORK:  ${PROFILE.education.coursework.join(", ")}`,
        });
        break;

      case "contact":
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          text: `EMAIL:    ${PROFILE.email}
LINKEDIN: ${PROFILE.linkedinUrl}
GITHUB:   ${PROFILE.githubUrl}
PORTFOLIO: ${PROFILE.portfolioUrl}`,
        });
        break;

      case "matrix":
        setMatrixActive(true);
        sounds.warp();
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          text: "Initializing Matrix Neural Subroutine... decoding mainframe stream:",
        });
        break;

      case "theme":
        if (["neon", "matrix", "amber", "cyber"].includes(arg)) {
          onSwitchTheme?.(arg);
          sounds.success();
          newLines.push({
            id: Math.random().toString(),
            type: "output",
            text: `Theme switched to '${arg.toUpperCase()}'. Lighting shaders updated in real-time.`,
          });
        } else {
          newLines.push({
            id: Math.random().toString(),
            type: "error",
            text: `Invalid theme. Available options: neon, matrix, amber, cyber (e.g. 'theme matrix')`,
          });
        }
        break;

      case "clear":
        setLines([]);
        setInput("");
        return;

      case "sudo":
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          text: "Permission granted: User '@SSManikandaprabu' is already superuser in this workspace. 🚀",
        });
        break;

      default:
        newLines.push({
          id: Math.random().toString(),
          type: "error",
          text: `zsh: command not found: ${command}. Type 'help' to see valid commands.`,
        });
        break;
    }

    setLines(newLines);
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    sounds.keypress();
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex + 1 < history.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInput(history[history.length - 1 - nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(history[history.length - 1 - nextIdx] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-md transition-all sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`glass-panel flex flex-col overflow-hidden rounded-2xl border border-cyan-500/40 bg-[#050816]/95 shadow-2xl shadow-cyan-500/20 transition-all ${
          isMaximized
            ? "h-[94vh] w-[96vw]"
            : "h-[580px] max-h-[88vh] w-full max-w-3xl"
        }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-4 py-3 select-none">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            <div className="ml-2 flex items-center gap-2 font-mono text-xs text-slate-300">
              <TerminalIcon className="h-3.5 w-3.5 text-cyan-400" />
              <span>guest@manikanda-workspace: ~ (interactive shell)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMaximized((v) => !v)}
              className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              {isMaximized ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1 text-slate-400 hover:bg-rose-500/20 hover:text-rose-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick Command Pills */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-800/60 bg-slate-900/40 px-4 py-2 font-mono text-[11px]">
          <span className="text-slate-500">QUICK:</span>
          {COMMANDS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => handleCommand(c)}
              className="rounded-md border border-slate-700/60 bg-slate-800/50 px-2 py-0.5 text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-500/20 hover:text-white"
            >
              {c}
            </button>
          ))}
        </div>

        {/* Terminal Output Area */}
        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="flex-1 space-y-2.5 overflow-y-auto p-4 font-mono text-xs text-slate-200 select-text"
        >
          {lines.map((l) => {
            if (l.type === "banner") {
              return (
                <div
                  key={l.id}
                  className="rounded-lg border border-cyan-500/30 bg-cyan-950/30 p-2.5 text-cyan-300 font-bold"
                >
                  {l.text}
                </div>
              );
            }
            if (l.type === "input") {
              return (
                <div key={l.id} className="flex items-center gap-2 text-cyan-400">
                  <span className="text-emerald-400 font-semibold">➜</span>
                  <span className="text-purple-300 font-semibold">~</span>
                  <span className="text-white font-medium">{l.text}</span>
                </div>
              );
            }
            if (l.type === "matrix") {
              return (
                <div
                  key={l.id}
                  className="font-mono text-[11px] text-emerald-400 tracking-widest opacity-90"
                >
                  {l.text}
                </div>
              );
            }
            if (l.type === "error") {
              return (
                <div key={l.id} className="text-rose-400">
                  {l.text}
                </div>
              );
            }
            return (
              <pre
                key={l.id}
                className="whitespace-pre-wrap font-mono leading-relaxed text-slate-300"
              >
                {l.text}
              </pre>
            );
          })}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 border-t border-slate-800/80 bg-slate-950/90 px-4 py-3 font-mono text-xs">
          <span className="text-emerald-400 font-bold">➜</span>
          <span className="text-purple-300 font-bold">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or any command..."
            className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-600"
          />
          <button
            type="button"
            onClick={() => handleCommand(input)}
            className="rounded-lg bg-cyan-500/20 px-2.5 py-1 text-cyan-300 hover:bg-cyan-500/30 hover:text-white"
          >
            <CornerDownLeft className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
