/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { Quote, Star, User } from "lucide-react";

export const ReviewSection = ({ reviews }: { reviews: any[] }) => {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 italic">
            Student <span className="text-violet-600">Feedback</span>
          </h2>
          <p className="text-slate-500 font-medium italic">
            Real stories from our global community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews?.length > 0 ? (
            reviews.map((review, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                key={review.id}
                className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 relative group border border-transparent hover:border-violet-100 transition-all duration-500"
              >
                <Quote className="absolute top-8 right-8 w-12 h-12 text-slate-50 opacity-10 group-hover:text-violet-100 group-hover:opacity-100 transition-all" />

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-slate-600 leading-relaxed mb-8 italic font-medium">
                  {review.comment}
                </p>

                <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                  <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-violet-200">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase tracking-tight">
                      {review.Student?.name || "Student"}
                    </h4>
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                      Verified Learner
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 opacity-50 italic">
              No reviews available yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
