"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";
import ProjectCard from "./components/ProjectCard";
import { projectsData, skillsData } from "./data/portfolioData";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

// ====== عداد متحرك ======
const useCounter = (target: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
};

// ====== مكون الإحصائيات ======
const Stats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const projectsCount = useCounter(isInView ? 24 : 0);
  const experienceYears = useCounter(isInView ? 7 : 0);
  const clientsCount = useCounter(isInView ? 38 : 0);
  const satisfaction = useCounter(isInView ? 98 : 0);

  const stats = [
    { label: "مشاريع منجزة", value: projectsCount, suffix: "+" },
    { label: "سنوات الخبرة", value: experienceYears, suffix: "" },
    { label: "عميل سعيد", value: clientsCount, suffix: "+" },
    { label: "رضا العملاء", value: satisfaction, suffix: "%" },
  ];

  return (
    <section
      ref={ref}
      className="py-16 bg-gradient-to-b from-sky-50/30 to-transparent dark:from-slate-900/20"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-sky-100 dark:border-slate-800 shadow-lg"
          >
            <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">
              {stat.value}
              {stat.suffix}
            </div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ====== مكون المهارات الدائرية ======
const SkillCircle = ({
  name,
  category,
}: {
  name: string;
  category: string;
}) => {
  const percentage =
    category === "لغات برمجة"
      ? 90
      : category === "أطر عمل"
        ? 85
        : category === "أدوات"
          ? 75
          : 80;

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView) setIsVisible(true);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-sky-100 dark:border-slate-800 hover:shadow-xl transition-shadow"
    >
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="url(#skillGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 42}
            strokeDashoffset={
              2 * Math.PI * 42 * (1 - (isVisible ? percentage : 0) / 100)
            }
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <defs>
            <linearGradient
              id="skillGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-800 dark:text-white">
          {isVisible ? percentage : 0}%
        </div>
      </div>
      <span className="mt-2 font-bold text-slate-800 dark:text-slate-100 text-sm text-center">
        {name}
      </span>
      <span className="text-xs text-sky-500 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 px-3 py-0.5 rounded-full mt-1">
        {category}
      </span>
    </motion.div>
  );
};

// ====== زر العودة للأعلى ======
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.5 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 left-8 z-50 p-3 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 text-white shadow-lg shadow-sky-400/30 hover:shadow-xl transition-all"
      aria-label="العودة للأعلى"
    >
      ↑
    </motion.button>
  );
};

// ====== الصفحة الرئيسية ======
export default function Home() {
  const controls = useAnimation();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    if (heroInView) controls.start("visible");
  }, [heroInView, controls]);

  return (
    <main
      className="min-h-screen p-6 md:p-12 max-w-6xl mx-auto space-y-20"
      dir="rtl"
    >
      {/* خلفية متحركة */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* ====== هيرو ====== */}
      <section
        ref={heroRef}
        id="about"
        className="py-12 relative rounded-3xl bg-gradient-to-br from-sky-50/30 via-white/50 to-indigo-50/30 dark:from-slate-900/40 dark:via-slate-900/20 dark:to-indigo-950/30 backdrop-blur-sm border border-white/20 dark:border-slate-800/50 shadow-2xl p-6 md:p-10"
      >
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-right"
        >
          {/* النصوص */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0 },
            }}
            className="space-y-4 max-w-xl"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-300 text-sm font-semibold mb-2">
              ✨ مرحباً بك في معرضي الرقمي
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600">
              Ely Salem El Missawi
            </h1>
            <h2 className="text-2xl sm:text-3xl text-slate-700 dark:text-slate-300 font-bold">
              مطور ويب ومصمم منصات تفاعلية
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
              متخصص في بناء الواجهات الحديثة والتطبيقات التفاعلية باستخدام{" "}
              <span dir="ltr" className="inline-block font-bold text-sky-500">
                TypeScript
              </span>
              ،{" "}
              <span dir="ltr" className="inline-block font-bold text-blue-500">
                Next.js
              </span>
              ، و{" "}
              <span
                dir="ltr"
                className="inline-block font-bold text-indigo-500"
              >
                WordPress
              </span>
              .
            </p>
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <a
                href="#contact"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 text-white font-bold shadow-lg shadow-sky-400/30 hover:shadow-xl transition-all inline-block"
              >
                تواصل معي الآن
              </a>
            </motion.div>
          </motion.div>

          {/* الصورة الشخصية */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative shrink-0 w-full max-w-[320px] md:max-w-[400px]"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-sky-400/30 group">
              <Image
                src="/img/Ely-salem.png"
                alt="Ely Salem El Missawi"
                width={400}
                height={500}
                priority
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ====== الإحصائيات ====== */}
      <Stats />

      {/* ====== المهارات ====== */}
      <section id="skills" className="space-y-8">
        <div className="flex items-center gap-3 border-b border-sky-100 dark:border-slate-800 pb-4">
          <span className="w-3 h-8 rounded-full bg-sky-400" />
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            المهارات التقنية
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {skillsData.map((skill) => (
            <SkillCircle
              key={skill.name}
              name={skill.name}
              category={skill.category}
            />
          ))}
        </div>
      </section>

      {/* ====== المشاريع ====== */}
      <section id="projects" className="space-y-8">
        <div className="flex items-center gap-3 border-b border-sky-100 dark:border-slate-800 pb-4">
          <span className="w-3 h-8 rounded-full bg-blue-500" />
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            المشاريع المتميزة
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ====== آراء العملاء (جديد) ====== */}
      <Testimonials />

      {/* ====== التواصل ====== */}
      <section id="contact" className="space-y-8 py-10">
        <div className="flex items-center gap-3 border-b border-sky-100 dark:border-slate-800 pb-4">
          <span className="w-3 h-8 rounded-full bg-indigo-500" />
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            تواصل معي
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "📧",
              title: "البريد الإلكتروني",
              value: "contact@elysalem.dev",
              href: "mailto:contact@elysalem.dev",
            },
            {
              icon: "📍",
              title: "المكان",
              value: "Vitoria-Gasteiz, España",
              href: null,
            },
            {
              icon: "💻",
              title: "GitHub",
              value: "github.com/elysalem",
              href: "https://github.com",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 rounded-2xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 shadow-sm hover:border-sky-400 transition text-center space-y-3 group"
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-sm text-sky-500 font-medium" dir="ltr">
                    {item.value}
                  </p>
                </a>
              ) : (
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 shadow-sm text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-500 flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {item.value}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* زر العودة للأعلى */}
      <ScrollToTop />
      <Footer />
    </main>
  );
}
