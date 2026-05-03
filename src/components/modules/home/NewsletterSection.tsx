"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";

const perks = [
  "Weekly curated course recommendations",
  "Exclusive tutor spotlights & tips",
  "Early access to new features",
];

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <section className="py-20 bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-700 relative overflow-hidden">
      {/* Dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Glow blob */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-5">
            <Mail className="w-3 h-3" />
            Newsletter
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white italic leading-tight mb-4">
            Stay Ahead of the{" "}
            <span className="text-violet-200 relative">
              Curve
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-white/30 rounded-full block" />
            </span>
          </h2>

          <p className="text-violet-100 text-sm leading-relaxed mb-6 max-w-md mx-auto">
            Join 2,400+ learners who get weekly insights, curated courses, and expert tips straight to their inbox.
          </p>

          <ul className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 mb-8">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-2 text-violet-100 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                {p}
              </li>
            ))}
          </ul>

          {submitted ? (
            <div className="inline-flex items-center gap-3 bg-white/15 border border-white/25 text-white px-6 py-4 rounded-2xl backdrop-blur-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <div className="text-left">
                <p className="font-bold text-sm">You&apos;re in! 🎉</p>
                <p className="text-violet-200 text-xs">Check your inbox for a confirmation.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-xl text-sm bg-white/15 border border-white/30 text-white placeholder:text-violet-200 focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-sm"
                  suppressHydrationWarning
                />
                {error && <p className="text-rose-300 text-xs mt-1 text-left">{error}</p>}
              </div>
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 bg-white text-violet-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-violet-50 transition-all whitespace-nowrap shadow-lg shadow-black/20"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          )}

          <p className="text-violet-300 text-xs mt-4">No spam. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  );
}
