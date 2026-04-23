/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

export const ReviewSection = ({ reviews }: { reviews: any[] }) => {
  return (
    <section
      className="py-28 overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      }}
    >
      {/* Floating orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-16 left-16 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        className="absolute bottom-16 right-16 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"
      />

      {/* Star particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
          className="absolute"
          style={{ left: `${10 + i * 11}%`, top: `${15 + (i % 4) * 20}%` }}
        >
          <Star className="w-3 h-3 fill-yellow-400/40 text-yellow-400/40" />
        </motion.div>
      ))}

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 text-white/70 rounded-full text-[11px] font-black uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
            Student Feedback
          </div>
          <h2 className="text-4xl md:text-5xl font-black italic text-white leading-tight">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-indigo-300">
              Learners
            </span>{" "}
            Say
          </h2>
          <p className="text-white/50 font-medium">
            Real stories from our global community
          </p>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews?.length > 0 ? (
            reviews.slice(0, 6).map((review, index) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 3) * 0.12, duration: 0.6 }}
                viewport={{ once: true, margin: "-30px" }}
                whileHover={{ y: -6, scale: 1.02 }}
                key={review.id}
                className="group relative bg-white/5 backdrop-blur-md border border-white/10 hover:border-violet-400/30 p-7 rounded-[2rem] transition-all duration-500 overflow-hidden"
              >
                {/* Card glow on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-violet-600/0 to-indigo-600/0 group-hover:from-violet-600/10 group-hover:to-indigo-600/10 rounded-[2rem] transition-all duration-500" />

                {/* Quote mark */}
                <Quote className="absolute top-6 right-6 w-10 h-10 text-violet-400/10 group-hover:text-violet-400/30 transition-all duration-500" />

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.05 + i * 0.06 }}
                      viewport={{ once: true }}
                    >
                      <Star
                        className={`w-4 h-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-white/10"}`}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Review text */}
                <p className="text-white/70 leading-relaxed mb-7 font-medium text-sm italic line-clamp-4">
                  &ldquo;{review.comment || "Great learning experience!"}&rdquo;
                </p>

                {/* Reviewer */}
                <div className="flex items-center gap-4 border-t border-white/10 pt-5 relative z-10">
                  <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-lg shadow-violet-900/50">
                    {(review.Student?.name || "S").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-black text-white text-sm uppercase tracking-tight">
                      {review.Student?.name || "Student"}
                    </h4>
                    <p className="text-[10px] uppercase font-black text-violet-400 tracking-widest mt-0.5">
                      Verified Learner
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 text-white/30 italic font-bold">
              No reviews yet. Be the first to share your experience!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
