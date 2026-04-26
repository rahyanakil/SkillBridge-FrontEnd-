/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const slides = [
  {
    img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    badge: "🎓 Expert-Led Learning",
    headline: "Find Expert",
    highlight: "Tutors",
    tail: "Near You",
    subtitle:
      "Get personalized 1-on-1 learning with top-rated instructors tailored to your pace and goals.",
    cta: "Start Learning",
    gradient: "from-violet-900/80 via-violet-800/60 to-indigo-900/80",
    blob1: "bg-violet-500/30",
    blob2: "bg-indigo-500/30",
  },
  {
    img: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    badge: "⏰ Learn On Your Terms",
    headline: "Flexible",
    highlight: "Learning",
    tail: "Your Way",
    subtitle:
      "Book sessions that fit your busy schedule. Learn from anywhere, anytime, at your own pace.",
    cta: "Browse Courses",
    gradient: "from-indigo-900/80 via-purple-800/60 to-slate-900/80",
    blob1: "bg-indigo-500/30",
    blob2: "bg-purple-500/30",
  },
  {
    img: "https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    badge: "📚 World-Class Courses",
    headline: "Professional",
    highlight: "Courses",
    tail: "For Everyone",
    subtitle:
      "Choose from dozens of professionally curated courses across technology, design, and business.",
    cta: "View Courses",
    gradient: "from-slate-900/80 via-violet-900/60 to-indigo-900/80",
    blob1: "bg-purple-500/30",
    blob2: "bg-violet-500/30",
  },
  {
    img: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    badge: "🚀 Real-World Skills",
    headline: "Expert",
    highlight: "Mentorship",
    tail: "& Guidance",
    subtitle:
      "Level up your career with hands-on mentorship and real-world guidance from industry leaders.",
    cta: "Meet Tutors",
    gradient: "from-violet-900/80 via-indigo-800/60 to-purple-900/80",
    blob1: "bg-violet-500/30",
    blob2: "bg-pink-500/30",
  },
];

const stats = [
  { value: "2,400+", label: "Students" },
  { value: "180+", label: "Tutors" },
  { value: "4.9★", label: "Rating" },
  { value: "95%", label: "Satisfaction" },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setProgress(0);
    const progressTimer = setInterval(
      () => setProgress((p) => Math.min(p + 2, 100)),
      100,
    );
    const slideTimer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }, 5000);
    return () => {
      clearInterval(slideTimer);
      clearInterval(progressTimer);
    };
  }, [current]);

  const slide = slides[current];

  return (
    <div className="relative h-[88vh] min-h-150 w-full overflow-hidden">
      {/* Background image with smooth transition */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" as const }}
          className="absolute inset-0"
        >
          <Image
            src={slide.img}
            alt=""
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay */}
      <motion.div
        key={`grad-${current}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`absolute inset-0 bg-linear-to-br ${slide.gradient}`}
      />

      {/* Floating blobs — CSS animations (off JS thread) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-32 -left-32 w-125 h-125 ${slide.blob1} rounded-full blur-3xl`}
          style={{ animation: "blob-float 8s ease-in-out infinite" }}
        />
        <div
          className={`absolute -bottom-32 -right-32 w-125 h-125 ${slide.blob2} rounded-full blur-3xl`}
          style={{ animation: "blob-float-reverse 10s ease-in-out 1s infinite" }}
        />
      </div>

      {/* Grid overlay for texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="container mx-auto px-6 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div key={`content-${current}`} className="max-w-3xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 px-5 py-2 rounded-full text-sm font-bold mb-8 shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                {slide.badge}
              </motion.div>

              {/* Headline */}
              <div className="mb-6 space-y-1">
                <motion.h1
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-5xl md:text-7xl xl:text-8xl font-black text-white leading-[0.9] tracking-tight"
                >
                  {slide.headline}
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-5xl md:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight"
                  style={{
                    WebkitTextStroke: "2px white",
                    color: "transparent",
                  }}
                >
                  {slide.highlight}
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-5xl md:text-7xl xl:text-8xl font-black text-white/70 leading-[0.9] tracking-tight"
                >
                  {slide.tail}
                </motion.h1>
              </div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-white/75 text-lg md:text-xl max-w-xl mb-10 font-medium leading-relaxed"
              >
                {slide.subtitle}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap items-center gap-4"
              >
                <button
                  onClick={() => router.push("/courses")}
                  className="group flex items-center gap-2 bg-white text-violet-700 px-8 py-4 rounded-2xl font-black text-base hover:bg-violet-50 transition-all shadow-2xl shadow-black/30 active:scale-95"
                >
                  {slide.cta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => router.push("/tutor")}
                  className="flex items-center gap-3 text-white/90 font-bold hover:text-white transition-colors group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white/25 transition-colors">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                  Browse Tutors
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom stats bar */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="container mx-auto px-6 md:px-12 pb-8">
          <div className="flex items-center gap-6 md:gap-10">
            {/* Slide dots with progress */}
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="relative overflow-hidden rounded-full transition-all duration-500"
                  style={{ width: i === current ? 40 : 8, height: 8 }}
                >
                  <div className="absolute inset-0 bg-white/30 rounded-full" />
                  {i === current && (
                    <motion.div
                      className="absolute inset-0 bg-white rounded-full origin-left"
                      style={{ scaleX: progress / 100 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="hidden md:flex items-center gap-8 ml-auto">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-white font-black text-lg leading-none">
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-[10px] uppercase tracking-widest font-bold mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
