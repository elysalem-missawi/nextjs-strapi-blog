"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { testimonialsData } from "../data/portfolioData";

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // تكرار البطاقات لتعطي انطباعاً بالاستمرارية
  const duplicated = [...testimonialsData, ...testimonialsData];

  return (
    <section
      ref={ref}
      className="py-16 relative overflow-hidden bg-gradient-to-b from-sky-50/40 to-indigo-50/40 dark:from-slate-900/30 dark:to-indigo-950/30 rounded-3xl"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* العنوان */}
        <div className="flex items-center gap-3 border-b border-sky-100 dark:border-slate-800 pb-4 mb-10">
          <span className="w-3 h-8 rounded-full bg-amber-400" />
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            آراء العملاء
          </h2>
        </div>

        {/* شريط البطاقات */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory hide-scrollbar">
            {duplicated.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: (idx % testimonialsData.length) * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="snap-center min-w-[280px] md:min-w-[320px] flex-shrink-0 p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-sky-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-slate-700 dark:text-white bg-sky-100 dark:bg-slate-800">
                        {item.name.charAt(0)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.role}
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-3">
                  "{item.content}"
                </p>
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>
                      {i < item.rating ? "⭐" : "☆"}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* خلفية زخرفية */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-sky-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}