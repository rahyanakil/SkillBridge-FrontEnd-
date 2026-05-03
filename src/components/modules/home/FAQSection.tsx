"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How do I book a session with a tutor?",
    a: "Browse tutors or courses, click on a tutor profile, and select 'Book Session'. Choose your preferred time slot and complete the payment via Stripe. You'll receive a confirmation and a classroom link immediately.",
  },
  {
    q: "What subjects are available on SkillBridge?",
    a: "We cover a wide range of subjects including web development, data science, UI/UX design, digital marketing, business strategy, and many more. New categories and courses are added regularly by our growing tutor community.",
  },
  {
    q: "Can I cancel or reschedule a booking?",
    a: "Yes. You can cancel a pending booking from your student dashboard at any time before it's accepted by the tutor. Once accepted, please contact your tutor directly to discuss rescheduling.",
  },
  {
    q: "How are tutors verified on SkillBridge?",
    a: "Every tutor completes a profile with their expertise, experience, and bio. Students can view ratings and reviews from previous sessions before booking, ensuring you always choose with confidence.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all major credit and debit cards through our secure Stripe payment gateway. Payments are processed instantly, and receipts are sent to your registered email.",
  },
  {
    q: "How do I become a tutor on SkillBridge?",
    a: "Register for a free account, select 'Tutor' as your role, and complete your tutor profile with your expertise and hourly rate. You can then create courses and start accepting bookings right away.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-surface-2 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40 dark:opacity-10 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(139,92,246,0.07) 0%, transparent 60%)" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-dim text-brand rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-4">
              <span className="w-1.5 h-1.5 bg-violet-500 dark:bg-violet-400 rounded-full animate-pulse" />
              Got Questions?
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground italic leading-tight mb-4">
              Frequently{" "}
              <span className="text-brand relative">
                Asked
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-violet-200 dark:bg-violet-700/60 rounded-full block" />
              </span>
              <br />Questions
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Everything you need to know about SkillBridge. Can&apos;t find your answer?{" "}
              <a href="/contact" className="text-brand font-semibold hover:underline">
                Contact our support team.
              </a>
            </p>
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm transition-shadow hover:shadow-md"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                >
                  <span className="text-foreground font-semibold text-sm leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-brand shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                  />
                </button>
                {open === i && (
                  <div className="px-5 pb-4 text-muted-foreground text-sm leading-relaxed border-t border-border pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
