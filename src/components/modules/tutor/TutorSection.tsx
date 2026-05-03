/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllPublicTutors } from "@/services/tutor/tutor";
import { AnimatedSectionHeader } from "../home/AnimatedSectionHeader";
import { AnimatedTutorGrid } from "./AnimatedTutorGrid";

export default async function TutorSection() {
  const result = await getAllPublicTutors({ limit: 6 });
  const tutors: any[] = result.success ? result.data : [];

  return (
    <section className="py-28 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-100/40 dark:bg-violet-900/10 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-100/40 dark:bg-indigo-900/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeader
          badge="Meet The Experts"
          headline="Our Elite"
          highlight="Faculty"
          description="Real experts delivering real results. Connect with verified tutors who are leaders in their fields."
        />
        <AnimatedTutorGrid tutors={tutors} />
      </div>
    </section>
  );
}
