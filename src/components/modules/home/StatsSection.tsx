"use client";

import { motion } from "framer-motion";
import { BookOpen, Star, Users, Zap } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "2,400+",
    label: "Active Students",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-900/25",
  },
  {
    icon: BookOpen,
    value: "180+",
    label: "Expert Tutors",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-900/25",
  },
  {
    icon: Star,
    value: "4.9 / 5",
    label: "Average Rating",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/25",
  },
  {
    icon: Zap,
    value: "95%",
    label: "Satisfaction Rate",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/25",
  },
];

export function StatsSection() {
  return (
    <section className="py-12 bg-background border-b border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative overflow-hidden bg-card rounded-3xl border border-border p-6 shadow-sm hover:shadow-xl hover:shadow-violet-100/50 dark:hover:shadow-violet-900/20 transition-all duration-500"
            >
              <div className={`absolute inset-0 ${stat.bg} opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-3xl`} />
              <div className={`${stat.bg} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="relative z-10">
                <p className="text-3xl font-black text-foreground tracking-tight">{stat.value}</p>
                <p className="text-muted-foreground text-sm font-semibold mt-1">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
