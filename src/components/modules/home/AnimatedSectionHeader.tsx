"use client";

import { motion } from "framer-motion";

interface Props {
  badge: string;
  headline: string;
  highlight: string;
  description: string;
  centered?: boolean;
}

export function AnimatedSectionHeader({ badge, headline, highlight, description, centered = false }: Props) {
  return (
    <div className={`flex flex-col ${centered ? "items-center text-center" : "md:flex-row md:items-end"} justify-between gap-8`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-100 text-violet-600 rounded-full text-[11px] font-black uppercase tracking-[0.2em]"
        >
          <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" />
          {badge}
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 italic leading-tight">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="block"
          >
            {headline}{" "}
            <span className="text-violet-600 relative">
              {highlight}
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-violet-200 rounded-full origin-left block"
              />
            </span>
          </motion.span>
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`text-slate-500 font-medium max-w-md text-sm ${centered ? "text-center" : "md:text-right"}`}
      >
        {description}
      </motion.p>
    </div>
  );
}
