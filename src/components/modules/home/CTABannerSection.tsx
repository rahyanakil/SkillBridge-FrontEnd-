import { ArrowRight, GraduationCap, Users } from "lucide-react";
import Link from "next/link";

export default function CTABannerSection() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Student CTA */}
          <div className="relative bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-8 overflow-hidden group">
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-black text-2xl mb-2 leading-tight">
                Start Learning Today
              </h3>
              <p className="text-violet-200 text-sm leading-relaxed mb-6 max-w-xs">
                Join 2,400+ students already learning with expert tutors. Browse courses and book your first session — it takes less than 2 minutes.
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 bg-white text-violet-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-violet-50 transition-all shadow-lg"
              >
                Browse Courses
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Tutor CTA */}
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 overflow-hidden group">
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-violet-500/20 rounded-full blur-2xl pointer-events-none" />
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-black text-2xl mb-2 leading-tight">
                Become a Tutor
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
                Share your expertise with eager learners worldwide. Set your own schedule, hourly rate, and subjects. Join 180+ tutors already earning on SkillBridge.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg"
              >
                Become a Tutor
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
