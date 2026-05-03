"use client";

import { BookOpen, CalendarCheck, Search, Star } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Find Your Tutor",
    description: "Browse hundreds of expert tutors across technology, design, business, and more. Filter by subject, price, and rating to find your perfect match.",
    color: "bg-violet-50 dark:bg-violet-900/25 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-700/40",
  },
  {
    step: "02",
    icon: CalendarCheck,
    title: "Book a Session",
    description: "Pick a time that suits your schedule. Sessions are fully flexible — morning, afternoon, or evening, 7 days a week.",
    color: "bg-indigo-50 dark:bg-indigo-900/25 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-700/40",
  },
  {
    step: "03",
    icon: BookOpen,
    title: "Learn & Grow",
    description: "Join your live 1-on-1 session via your personal classroom link. Get personalised guidance and hands-on practice.",
    color: "bg-violet-50 dark:bg-violet-900/25 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-700/40",
  },
  {
    step: "04",
    icon: Star,
    title: "Rate & Review",
    description: "After each completed session, leave a rating and review to help other students find the right tutor.",
    color: "bg-indigo-50 dark:bg-indigo-900/25 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-700/40",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 dark:opacity-10 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(139,92,246,0.08) 0%, transparent 60%)" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-dim text-brand rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-4">
            <span className="w-1.5 h-1.5 bg-violet-500 dark:bg-violet-400 rounded-full animate-pulse" />
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground italic leading-tight mb-4">
            How{" "}
            <span className="text-brand relative">
              It Works
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-violet-200 dark:bg-violet-700/60 rounded-full block" />
            </span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
            Get started in minutes. Four simple steps to connect with expert tutors and accelerate your learning.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-violet-200 dark:from-violet-800/40 via-indigo-200 dark:via-indigo-800/40 to-violet-200 dark:to-violet-800/40 z-0" />

          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="relative z-10 flex flex-col items-center text-center group">
                <div className="relative mb-5">
                  <div className={`w-20 h-20 rounded-2xl border-2 ${s.color} flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-[10px] font-black text-muted-foreground shadow-sm">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-foreground font-bold text-base mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
