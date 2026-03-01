import { Rocket, ShieldCheck, Target, Users } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative py-24 px-8 overflow-hidden bg-linear-to-br from-violet-50/50 to-white">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6">
            Bridging Potential with{" "}
            <span className="text-violet-600">Excellence.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            We are more than just a platform; we are a community dedicated to
            transforming how the world learns and grows together.
          </p>
        </div>
        {/* Decorative Circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-violet-100 rounded-full blur-3xl opacity-50" />
      </section>

      {/* 2. Stats Section */}
      <section className="max-w-7xl mx-auto px-8 -mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: "Active Students", val: "10K+" },
            { label: "Expert Tutors", val: "500+" },
            { label: "Courses", val: "1.2K+" },
            { label: "Success Rate", val: "98%" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 text-center border border-slate-50"
            >
              <h3 className="text-4xl font-black text-slate-900 mb-1">
                {stat.val}
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Our Mission (Glassmorphism) */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square bg-slate-200 rounded-[3rem] overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl">
              {/* Replace with a high-quality team image */}
              <div className="w-full h-full bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold">
                Our Culture is to grow big
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-slate-900 leading-tight">
              A Mission to Empower <br /> Every Individual.
            </h2>
            <p className="text-slate-500 leading-relaxed text-lg font-medium">
              SkillBridge was born out of a simple idea: that quality education
              should be accessible, personalized, and inspiring. We focus on
              creating meaningful connections between passionate mentors and
              ambitious learners.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-2xl bg-violet-100 flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Pure Focus</h4>
                  <p className="text-xs text-slate-400 font-medium">
                    Results-driven learning paths.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Verified Tutors</h4>
                  <p className="text-xs text-slate-400 font-medium">
                    Quality you can always trust.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values Section */}
      <section className="bg-slate-900 py-32 px-8 rounded-[4rem] mx-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-slate-400 font-medium">
              The DNA that drives our daily decisions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Rocket,
                title: "Innovation",
                desc: "Constant evolution of learning tools.",
              },
              {
                icon: Users,
                title: "Community",
                desc: "Supportive network for all members.",
              },
              {
                icon: ShieldCheck,
                title: "Integrity",
                desc: "Transparency in every interaction.",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors group"
              >
                <value.icon className="w-12 h-12 text-violet-400 mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="text-2xl font-bold text-white mb-3">
                  {value.title}
                </h4>
                <p className="text-slate-400 font-medium leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
