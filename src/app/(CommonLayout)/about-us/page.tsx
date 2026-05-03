"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  BookOpen,
  Globe,
  GraduationCap,
  Heart,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef } from "react";

/* ── Animated counter ── */
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ── Stagger variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stats = [
  { icon: Users, label: "Active Students", value: 10000, suffix: "+" },
  { icon: GraduationCap, label: "Expert Tutors", value: 500, suffix: "+" },
  { icon: BookOpen, label: "Courses", value: 1200, suffix: "+" },
  { icon: Star, label: "Success Rate", value: 98, suffix: "%" },
];

const values = [
  {
    icon: Rocket,
    title: "Innovation",
    desc: "We constantly evolve our tools and methods to stay ahead of what learners need tomorrow.",
    color: "from-violet-500 to-indigo-600",
    bg: "bg-violet-50 dark:bg-violet-900/20",
    text: "text-violet-600",
  },
  {
    icon: Heart,
    title: "Community",
    desc: "Learning thrives in connection. We build supportive spaces where every voice is heard and valued.",
    color: "from-rose-500 to-pink-600",
    bg: "bg-rose-50 dark:bg-rose-900/20",
    text: "text-rose-500",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    desc: "Every tutor is vetted. Every review is real. Transparency is the foundation we build trust on.",
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    text: "text-emerald-600",
  },
  {
    icon: Target,
    title: "Impact",
    desc: "We measure success not in numbers but in the real change we create in people's lives.",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    text: "text-amber-600",
  },
  {
    icon: Globe,
    title: "Accessibility",
    desc: "Quality education must not be a privilege. We work to break every barrier that limits learning.",
    color: "from-sky-500 to-blue-600",
    bg: "bg-sky-50 dark:bg-sky-900/20",
    text: "text-sky-600",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    desc: "We celebrate every milestone — big or small — and keep pushing learners toward their peak.",
    color: "from-fuchsia-500 to-purple-600",
    bg: "bg-fuchsia-50 dark:bg-fuchsia-900/20",
    text: "text-fuchsia-600",
  },
];

const timeline = [
  { year: "2022", title: "The Idea", desc: "Two educators frustrated by impersonal online learning sketched SkillBridge on a whiteboard." },
  { year: "2023", title: "First 100 Tutors", desc: "We handpicked and onboarded our founding cohort of expert tutors across 12 categories." },
  { year: "2024", title: "10K Students", desc: "Word spread fast. Students loved the live, personal approach and the platform hit 10,000 learners." },
  { year: "2025", title: "AI-Enhanced Learning", desc: "Launched our AI Tutor feature — instant guidance, 24/7, powered by the latest language models." },
];

export default function AboutUs() {
  return (
    <div className="bg-white dark:bg-slate-950 overflow-x-hidden">

      {/* ── 1. HERO ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-32 overflow-hidden">
        {/* Background gradient orbs */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-violet-400 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[120px] pointer-events-none"
        />

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #6d28d9 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-700 text-violet-700 dark:text-violet-300 text-sm font-bold mb-8"
          >
            <Sparkles className="w-4 h-4" />
            About SkillBridge
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.95] mb-8"
          >
            Bridging Potential{" "}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600">
              with Excellence.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            We are more than a platform. We are a movement — dedicated to making
            world-class education personal, accessible, and transformative.
          </motion.p>

          {/* Floating badges */}
          <div className="mt-16 relative h-16">
            {[
              { icon: Zap, label: "Live Sessions", x: "-20%", delay: 0.4 },
              { icon: ShieldCheck, label: "Verified Tutors", x: "20%", delay: 0.55 },
              { icon: Star, label: "Top Rated", x: "55%", delay: 0.7 },
            ].map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [0, -8, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: b.delay },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 },
                }}
                style={{ left: b.x }}
                className="absolute -translate-x-1/2 inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-lg text-sm font-bold text-slate-700 dark:text-slate-200"
              >
                <b.icon className="w-4 h-4 text-violet-500" />
                {b.label}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. STATS ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-800"
            >
              <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center mx-auto mb-4">
                <s.icon className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-1">
                <AnimatedNumber value={s.value} suffix={s.suffix} />
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3. MISSION ── */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Visual — no image, pure design */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-violet-200 dark:border-violet-800"
              />
              {/* Inner ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full border-2 border-dashed border-indigo-200 dark:border-indigo-800"
              />

              {/* Center card */}
              <div className="absolute inset-16 rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 flex flex-col items-center justify-center shadow-2xl shadow-violet-500/30 p-6">
                <Lightbulb className="w-14 h-14 text-white mb-3" />
                <p className="text-white font-black text-xl text-center leading-tight">
                  Learning Reimagined
                </p>
                <p className="text-violet-200 text-xs font-medium text-center mt-2">
                  Live · Personal · Impactful
                </p>
              </div>

              {/* Orbiting icons */}
              {[
                { icon: BookOpen, angle: 0, color: "bg-white dark:bg-slate-800", text: "text-violet-600" },
                { icon: Users, angle: 90, color: "bg-white dark:bg-slate-800", text: "text-indigo-600" },
                { icon: Star, angle: 180, color: "bg-white dark:bg-slate-800", text: "text-amber-500" },
                { icon: Rocket, angle: 270, color: "bg-white dark:bg-slate-800", text: "text-emerald-600" },
              ].map((orb, i) => {
                const rad = (orb.angle * Math.PI) / 180;
                const r = 47;
                const x = 50 + r * Math.cos(rad - Math.PI / 2);
                const y = 50 + r * Math.sin(rad - Math.PI / 2);
                return (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6 }}
                    style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}
                    className={`absolute w-12 h-12 rounded-2xl ${orb.color} shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center`}
                  >
                    <orb.icon className={`w-5 h-5 ${orb.text}`} />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="space-y-8"
          >
            <div>
              <p className="text-violet-600 font-bold text-sm uppercase tracking-widest mb-3">Our Mission</p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                Empower Every <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-500">
                  Individual to Thrive.
                </span>
              </h2>
            </div>

            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg font-medium">
              SkillBridge was born from a simple but powerful belief — that quality
              education should be personal, accessible, and inspiring. We connect
              ambitious learners with passionate experts who genuinely care about
              their growth.
            </p>

            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Every session on SkillBridge is a step toward a better future. Our
              tutors don't just teach — they mentor, motivate, and transform how
              students see their own potential.
            </p>

            <div className="grid sm:grid-cols-2 gap-5 pt-2">
              {[
                { icon: Target, label: "Pure Focus", desc: "Results-driven paths tailored for you.", color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-900/20" },
                { icon: ShieldCheck, label: "Verified Tutors", desc: "Every expert is thoroughly vetted.", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                { icon: Zap, label: "Live Learning", desc: "Real-time sessions, real breakthroughs.", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
                { icon: Globe, label: "Global Reach", desc: "Learn from anywhere, with anyone.", color: "text-sky-600", bg: "bg-sky-50 dark:bg-sky-900/20" },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.5}
                  className="flex gap-4 items-start"
                >
                  <div className={`w-11 h-11 rounded-2xl ${f.bg} flex items-center justify-center shrink-0`}>
                    <f.icon className={`w-5 h-5 ${f.color}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{f.label}</h4>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. TIMELINE ── */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-violet-600 font-bold text-sm uppercase tracking-widest mb-3">Our Journey</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
              How We Got Here
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-400 via-indigo-400 to-transparent -translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className={`relative flex items-start gap-8 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Content */}
                  <div className={`md:w-[45%] pl-10 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-black bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 mb-3`}>
                      {item.year}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-[10px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/40 ring-4 ring-white dark:ring-slate-950 shrink-0 mt-1" />

                  {/* Spacer */}
                  <div className="hidden md:block md:w-[45%]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. VALUES ── */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-violet-600 font-bold text-sm uppercase tracking-widest mb-3">What Drives Us</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto">
              These aren't just words on a wall — they are the principles behind every decision we make.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-lg shadow-slate-200/40 dark:shadow-none transition-all duration-300 hover:shadow-xl"
              >
                <div className={`w-14 h-14 rounded-2xl ${v.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <v.icon className={`w-7 h-7 ${v.text}`} />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">{v.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-sm">{v.desc}</p>
                <div className={`mt-6 h-1 w-12 rounded-full bg-gradient-to-r ${v.color} group-hover:w-full transition-all duration-500`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA ── */}
      <section className="py-28 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative max-w-5xl mx-auto rounded-[3rem] overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700" />
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-80 h-80 bg-white rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1.3, 1, 1.3], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-300 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative z-10 text-center py-20 px-8">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <Sparkles className="w-12 h-12 text-yellow-300" />
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              Ready to Start <br /> Your Journey?
            </h2>
            <p className="text-violet-200 text-lg font-medium max-w-xl mx-auto mb-10">
              Join thousands of students already learning with the world's best tutors on SkillBridge.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="/courses"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-white text-violet-700 font-black rounded-2xl shadow-xl shadow-black/20 hover:shadow-2xl transition-all text-sm"
              >
                Browse Courses →
              </motion.a>
              <motion.a
                href="/register"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-white/10 border border-white/20 text-white font-black rounded-2xl hover:bg-white/20 transition-all text-sm"
              >
                Join for Free
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
