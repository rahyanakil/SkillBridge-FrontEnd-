"use client";

import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Play,
  Star,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

const VIDEO_URL =
  "https://res.cloudinary.com/djiguwfcx/video/upload/v1777664364/hero_video_exidru.mp4";

const benefits = [
  "Live 1-on-1 sessions with verified tutors",
  "Flexible scheduling — book in minutes",
  "Progress tracking & session recordings",
  "30-day satisfaction guarantee",
];

const featureStats = [
  { icon: Users,    label: "2,400+", desc: "Students"   },
  { icon: BookOpen, label: "180+",   desc: "Courses"    },
  { icon: Star,     label: "4.9★",   desc: "Avg Rating" },
];

const bottomStats = [
  { value: "2,400+", label: "Happy Students" },
  { value: "180+",   label: "Expert Tutors"  },
  { value: "4.9★",   label: "Avg Rating"     },
  { value: "95%",    label: "Satisfaction"   },
  { value: "12K+",   label: "Sessions Held"  },
];

const avatarLetters = ["A", "B", "C", "D"];
const avatarGradients = [
  "from-violet-400 to-indigo-500",
  "from-pink-400 to-rose-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
];

export function HeroCarousel() {
  const router = useRouter();

  return (
    <section className="relative w-full min-h-[500px] h-[65vh] overflow-hidden">

      {/* ── Video background ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={VIDEO_URL}
      />

      {/* ── Overlay: white-tinted left so dark text pops, clear right so video shows ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/20 dark:from-slate-950/95 dark:via-slate-950/80 dark:to-slate-950/20" />

      {/* ── Subtle violet accent wash on the left column ── */}
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-violet-50/60 dark:from-violet-900/20 to-transparent" />

      {/* ── Ambient glow blobs ── */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-400/8 rounded-full blur-[140px]"
          style={{ animation: "blob-float 10s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-400/6 rounded-full blur-[100px]"
          style={{ animation: "blob-float-reverse 13s ease-in-out 2s infinite" }}
        />
      </div>

      {/* Content — flex-col keeps stats bar below content, never overlapping */}
      <div className="relative z-10 h-full flex flex-col">

        {/* Main grid */}
        <div className="flex-1 flex items-center min-h-0 px-5 sm:px-8 lg:px-14 xl:px-20">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-center">

              {/* LEFT — Hero copy */}
              <div style={{ animation: "hero-fade-up 0.65s ease-out both" }}>

                {/* Badge */}
                <div className="inline-flex w-fit items-center gap-2 bg-violet-600/10 border border-violet-500/25 text-violet-700 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                  Trusted by 2,400+ learners worldwide
                </div>

                {/* Headline */}
                <div className="space-y-0.5 mb-5">
                  <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black text-slate-900 dark:text-slate-100 leading-[0.88] tracking-tight">
                    Learn From
                  </h1>
                  <h1
                    className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[0.88] tracking-tight"
                    style={{ WebkitTextStroke: "2.5px rgba(109,40,217,0.85)", color: "transparent" }}
                  >
                    The Best.
                  </h1>
                  <h1
                    suppressHydrationWarning
                    className="text-5xl sm:text-6xl xl:text-7xl font-black text-slate-600 leading-[0.88] tracking-tight drop-shadow-sm"
                  >
                    Achieve More.
                  </h1>
                </div>

                {/* Subtitle */}
                <p suppressHydrationWarning className="text-slate-800 text-base md:text-lg leading-relaxed max-w-md mb-7 drop-shadow-sm">
                  Connect with verified expert tutors for live, personalized
                  1-on-1 sessions — built around your goals and schedule.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 mb-7">
                  <button
                    onClick={() => router.push("/courses")}
                    className="group inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-violet-500/30 active:scale-95"
                  >
                    Start Learning Today
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => router.push("/courses")}
                    className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-violet-500 text-violet-500" />
                    Browse Courses
                  </button>
                </div>

                {/* Social proof */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {avatarLetters.map((l, i) => (
                      <div
                        key={l}
                        className={`w-7 h-7 rounded-full bg-gradient-to-br ${avatarGradients[i]} border-2 border-white flex items-center justify-center text-[10px] font-black text-white select-none`}
                      >
                        {l}
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-500 text-xs">
                    <span className="text-slate-800 font-semibold">2,400+</span>{" "}
                    students joined this month
                  </p>
                </div>
              </div>

              {/* RIGHT — Glass info card */}
              <div
                className="hidden lg:block"
                style={{ animation: "hero-fade-right 0.7s ease-out 0.2s both" }}
              >
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-700/80 rounded-3xl p-7 xl:p-8 shadow-xl shadow-slate-200/60 dark:shadow-slate-900/60">

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center shrink-0">
                      <BookOpen className="w-[18px] h-[18px] text-white" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-sm leading-tight">Why SkillBridge?</p>
                      <p className="text-slate-500 text-xs mt-0.5">Everything you need to grow</p>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
                        <span className="text-slate-600 text-sm leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-slate-100 mb-6" />

                  <div className="grid grid-cols-3 gap-3 mb-7">
                    {featureStats.map(({ icon: Icon, label, desc }) => (
                      <div key={label} className="bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800/30 rounded-2xl p-3 text-center">
                        <Icon className="w-4 h-4 text-violet-500 mx-auto mb-1.5" />
                        <p className="text-slate-900 font-black text-sm leading-none">{label}</p>
                        <p className="text-slate-400 text-[10px] mt-1 leading-tight">{desc}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => router.push("/register")}
                    className="group w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3.5 rounded-xl font-black text-sm active:scale-[0.98] transition-all shadow-lg shadow-violet-500/30"
                  >
                    Join Free Today
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <p className="text-center text-slate-400 text-[11px] mt-3">
                    No credit card required · Cancel anytime
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div
          className="shrink-0 border-t border-slate-200/70 dark:border-slate-700/70 bg-white/60 dark:bg-slate-950/60 backdrop-blur-sm"
          style={{ animation: "hero-fade-in 0.5s ease-out 0.4s both" }}
        >
          <div className="px-5 sm:px-8 lg:px-14 xl:px-20 py-4">
            <div className="w-full max-w-[1400px] mx-auto flex flex-wrap items-center gap-x-6 gap-y-2">
              {bottomStats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-6">
                  <div>
                    <span className="block text-slate-900 font-black text-sm leading-none">{stat.value}</span>
                    <span className="block text-slate-400 text-[10px] uppercase tracking-wider font-semibold mt-0.5">{stat.label}</span>
                  </div>
                  {i < bottomStats.length - 1 && (
                    <span className="hidden sm:block w-px h-5 bg-slate-200" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
