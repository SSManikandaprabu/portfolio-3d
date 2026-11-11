import { useState } from "react";
import { Check, Copy, ExternalLink, Github, Linkedin, Mail, Send } from "lucide-react";
import { PROFILE } from "../../data/profile";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState("Software Engineering Internship Inquiry");
  const [message, setMessage] = useState("");

  function copyEmail() {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailto;
  }

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6">
      <SectionHeading
        eyebrow="08 // Holographic Comms"
        title="Connect With Me"
        subtitle="Open to software engineering internships, AI/ML engineering collaborations, and full-stack builds."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <TiltCard className="p-7 lg:col-span-5" glowColor="cyan">
          <h3 className="font-display text-xl font-bold text-white">
            Direct Channels
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Reach out directly via email or inspect repositories and credentials online.
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">
              <a
                href={`mailto:${PROFILE.email}`}
                className="flex items-center gap-3 text-sm text-cyan-200 hover:underline"
              >
                <Mail className="h-4 w-4 text-cyan-400" />
                {PROFILE.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="rounded-lg border border-slate-700 p-1.5 text-slate-300 transition hover:border-cyan-400 hover:text-white"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400/50"
            >
              <span className="flex items-center gap-3">
                <Github className="h-4 w-4 text-purple-300" />
                github.com/{PROFILE.handle}
              </span>
              <ExternalLink className="h-4 w-4 text-slate-500" />
            </a>

            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400/50"
            >
              <span className="flex items-center gap-3">
                <Linkedin className="h-4 w-4 text-blue-400" />
                LinkedIn — S.S. Manikanda Prabu
              </span>
              <ExternalLink className="h-4 w-4 text-slate-500" />
            </a>
          </div>
        </TiltCard>

        <TiltCard className="p-7 lg:col-span-7" glowColor="purple">
          <form onSubmit={handleSend} className="space-y-4">
            <h3 className="font-display text-xl font-bold text-white">
              Quick Transmission
            </h3>
            <div>
              <label
                htmlFor="contact-subject"
                className="mb-1.5 block font-mono text-xs text-slate-400"
              >
                SUBJECT
              </label>
              <input
                id="contact-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/75 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block font-mono text-xs text-slate-400"
              >
                MESSAGE
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message about an internship, collaboration, or project..."
                required
                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/75 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
            >
              <Send className="h-4 w-4" />
              Launch Email Client
            </button>
          </form>
        </TiltCard>
      </div>
    </section>
  );
}
