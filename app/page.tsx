"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

import ProjectCard from "./components/ProjectCard";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import { projectsData, skillsData } from "./data/portfolioData";

/* =========================================================
   Counter
========================================================= */

const useCounter = (target: number, duration = 1600, enabled = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setCount(0);
      return;
    }

    let start = 0;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const current = Math.floor(easedProgress * target);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    const frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [target, duration, enabled]);

  return count;
};

/* =========================================================
   Section Heading
========================================================= */

const SectionHeading = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) => {
  return (
    <div className="max-w-3xl mb-10">
      <span className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 dark:text-sky-400 mb-3">
        <span className="w-8 h-px bg-sky-500" />
        {eyebrow}
      </span>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-950 dark:text-white">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base md:text-lg leading-8 text-slate-600 dark:text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
};

/* =========================================================
   Stats
========================================================= */

const Stats = () => {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const projects = useCounter(24, 1400, isInView);
  const experience = useCounter(7, 1200, isInView);
  const clients = useCounter(38, 1400, isInView);
  const satisfaction = useCounter(98, 1600, isInView);

  const stats = [
    {
      value: projects,
      suffix: "+",
      label: "مشروعًا منجزًا",
    },
    {
      value: experience,
      suffix: "",
      label: "سنوات من الخبرة",
    },
    {
      value: clients,
      suffix: "+",
      label: "عميلًا",
    },
    {
      value: satisfaction,
      suffix: "%",
      label: "رضا العملاء",
    },
  ];

  return (
    <section ref={ref} aria-label="إحصائيات مهنية" className="py-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-200 dark:bg-slate-800">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
            }}
            className="
              bg-white
              dark:bg-slate-950
              px-5 py-7
              text-center
            "
          >
            <div className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white">
              {stat.value}
              <span className="text-sky-500">{stat.suffix}</span>
            </div>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* =========================================================
   Skill Card
========================================================= */

const SkillCard = ({ name, category }: { name: string; category: string }) => {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="
        group
        rounded-2xl
        border border-slate-200
        dark:border-slate-800
        bg-white
        dark:bg-slate-950
        p-5
        transition-colors
        hover:border-sky-300
        dark:hover:border-sky-700
      "
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">{name}</h3>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {category}
          </p>
        </div>

        <span
          className="
            flex h-9 w-9 shrink-0
            items-center justify-center
            rounded-xl
            bg-sky-50
            dark:bg-sky-950/40
            text-sky-500
            transition-transform
            group-hover:scale-110
          "
          aria-hidden="true"
        >
          ✓
        </span>
      </div>
    </motion.div>
  );
};

/* =========================================================
   Back To Top
========================================================= */

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.button
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      whileHover={{
        y: -3,
      }}
      whileTap={{
        scale: 0.95,
      }}
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      aria-label="العودة إلى أعلى الصفحة"
      className="
        fixed
        bottom-6
        left-6
        z-40
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        bg-slate-950
        dark:bg-white
        text-white
        dark:text-slate-950
        shadow-xl
        transition
      "
    >
      ↑
    </motion.button>
  );
};

/* =========================================================
   Main Page
========================================================= */

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  const heroInView = useInView(heroRef, {
    once: true,
  });

  /* Group skills by category */
  const groupedSkills = useMemo(() => {
    const groups: Record<string, typeof skillsData> = {};

    skillsData.forEach((skill) => {
      if (!groups[skill.category]) {
        groups[skill.category] = [];
      }

      groups[skill.category].push(skill);
    });

    return groups;
  }, []);

  return (
    <main
      dir="rtl"
      className="
        min-h-screen
        bg-white
        dark:bg-slate-950
        text-slate-900
        dark:text-slate-100
      "
    >
      {/* =====================================================
          Background
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          fixed
          inset-0
          -z-10
          overflow-hidden
          pointer-events-none
        "
      >
        <div
          className="
            absolute
            -top-48
            -right-48
            h-[500px]
            w-[500px]
            rounded-full
            bg-sky-400/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            top-[40%]
            -left-64
            h-[450px]
            w-[450px]
            rounded-full
            bg-indigo-400/10
            blur-3xl
          "
        />
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section
        ref={heroRef}
        id="about"
        className="
    max-w-7xl
    mx-auto
    px-4
    sm:px-6
    lg:px-8
    pt-10
    md:pt-16
  "
      >
        <div
          className="
      relative
      overflow-hidden
      rounded-[2rem]
      border
      border-slate-200
      dark:border-slate-800
      bg-slate-50/80
      dark:bg-slate-900/50
    "
        >
          {/* Decorative element */}
          <div
            aria-hidden="true"
            className="
        absolute
        top-0
        left-0
        h-40
        w-40
        rounded-full
        bg-sky-400/10
        blur-3xl
      "
          />

          <div
            className="
        relative
        grid
        lg:grid-cols-[1.1fr_.9fr]
        items-center
        gap-10
        p-6
        sm:p-10
        lg:p-14
      "
          >
            {/* Hero text */}
            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={
                heroInView
                  ? {
                      opacity: 1,
                      x: 0,
                    }
                  : {}
              }
              transition={{
                duration: 0.7,
              }}
              className="order-2 lg:order-1"
            >
              <div
                className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-emerald-200
            dark:border-emerald-900
            bg-emerald-50
            dark:bg-emerald-950/30
            px-3
            py-1.5
            text-sm
            font-bold
            text-emerald-700
            dark:text-emerald-400
          "
              >
                <span
                  className="
              h-2
              w-2
              rounded-full
              bg-emerald-500
              animate-pulse
            "
                />
                متاح لفرص العمل ومشاريع Freelance
              </div>

              <p className="mt-7 text-sm font-bold uppercase tracking-[0.25em] text-sky-500">
                Web Developer
              </p>

              <h1
                className="
            mt-3
            text-4xl
            sm:text-5xl
            lg:text-6xl
            xl:text-7xl
            font-black
            leading-[1.05]
            tracking-tight
            text-slate-950
            dark:text-white
          "
              >
                Ely Salem
                <br />
                <span className="text-sky-500">El Missawi</span>
              </h1>

              <h2
                className="
            mt-6
            max-w-2xl
            text-xl
            sm:text-2xl
            font-bold
            leading-relaxed
            text-slate-700
            dark:text-slate-300
          "
              >
                أبني مواقع ومنصات ويب حديثة تجمع بين الأداء، التصميم وتجربة
                المستخدم.
              </h2>

              <p
                className="
            mt-5
            max-w-2xl
            text-base
            leading-8
            text-slate-600
            dark:text-slate-400
          "
              >
                متخصص في تطوير الواجهات والمواقع باستخدام تقنيات الويب الحديثة،
                مع خبرة في WordPress وWooCommerce وتطوير حلول رقمية عملية
                للشركات والأفراد.
              </p>

              {/* Tech badges */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "WordPress",
                  "WooCommerce",
                ].map((tech) => (
                  <span
                    key={tech}
                    dir="ltr"
                    className="
                rounded-lg
                border
                border-slate-200
                dark:border-slate-700
                bg-white
                dark:bg-slate-900
                px-3
                py-1.5
                text-xs
                font-bold
                text-slate-600
                dark:text-slate-300
              "
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#projects"
                  className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-slate-950
              dark:bg-white
              px-6
              py-3.5
              font-bold
              text-white
              dark:text-slate-950
              transition
              hover:-translate-y-0.5
              shadow-lg
            "
                >
                  مشاهدة مشاريعي
                  <span aria-hidden="true">←</span>
                </a>

                <a
                  href="#contact"
                  className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-sky-300
              dark:border-sky-700
              bg-white
              dark:bg-slate-900
              px-6
              py-3.5
              font-bold
              text-sky-600
              dark:text-sky-400
              transition
              hover:-translate-y-0.5
              hover:bg-sky-50
              dark:hover:bg-sky-950/30
            "
                >
                  ابدأ مشروعًا
                </a>
              </div>

              {/* ====== REPLACED CV LINK WITH EXPLORE PROJECTS ====== */}
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                <a
                  href="#projects"
                  className="
              text-sm
              font-bold
              text-slate-600
              dark:text-slate-300
              underline
              underline-offset-4
              hover:text-sky-500
            "
                >
                  استكشف مشاريعي ←
                </a>

                <span className="text-slate-300 dark:text-slate-700">|</span>

                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Vitoria-Gasteiz, España
                </span>
              </div>
            </motion.div>

            {/* Hero image - Enhanced UI */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={
                heroInView
                  ? {
                      opacity: 1,
                      scale: 1,
                    }
                  : {}
              }
              transition={{
                duration: 0.8,
                delay: 0.15,
              }}
              className="
          order-1
          lg:order-2
          flex
          justify-center
          relative
        "
            >
              <div className="relative group">
                {/* خلفية توهج مضيئة ناعمة */}
                <div
                  aria-hidden="true"
                  className="
              absolute
              -inset-2
              rounded-full
              bg-gradient-to-r
              from-sky-500/20
              via-emerald-500/20
              to-sky-400/20
              blur-2xl
              opacity-70
              group-hover:opacity-100
              transition
              duration-500
            "
                />

                {/* الصورة بحجم أكبر وبدون إطار قاسي */}
                <div
                  className="
              relative
              w-[280px]
              sm:w-[360px]
              lg:w-[420px]
              xl:w-[460px]
              overflow-hidden
              rounded-3xl
              shadow-2xl
              shadow-sky-900/10
              dark:shadow-black/40
            "
                >
                  <Image
                    src="/img/Ely-salem-4.png"
                    alt="Ely Salem El Missawi - Web Developer"
                    width={500}
                    height={650}
                    priority
                    className="
                h-auto
                w-full
                object-cover
                scale-100
                group-hover:scale-105
                transition
                duration-500
                ease-out
              "
                  />
                </div>

                {/* شارة حالة تفاعلية محسّنة */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={
                    heroInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {}
                  }
                  transition={{
                    delay: 0.7,
                  }}
                  className="
              absolute
              -bottom-4
              -right-2
              sm:-right-6
              rounded-2xl
              border
              border-slate-200/80
              dark:border-slate-700/80
              bg-white/90
              dark:bg-slate-900/90
              backdrop-blur-md
              px-4
              py-2.5
              shadow-lg
            "
                >
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>

                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      Open to opportunities
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <Stats />
      </section>
      {/* =====================================================
          ABOUT / VALUE
      ===================================================== */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-20
        "
      >
        <SectionHeading
          eyebrow="نبذة عني"
          title="مطور يهتم بالنتيجة، وليس بالكود فقط."
          description="أجمع بين تطوير الويب، تجربة المستخدم وفهم احتياجات المشروع لبناء حلول رقمية عملية وقابلة للاستخدام."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* For employers */}

          <motion.div
            whileHover={{ y: -4 }}
            className="
              rounded-3xl
              border
              border-slate-200
              dark:border-slate-800
              bg-white
              dark:bg-slate-950
              p-7
              sm:p-8
            "
          >
            <span className="text-3xl">💼</span>

            <h3 className="mt-5 text-xl font-black text-slate-950 dark:text-white">
              للفرق والشركات
            </h3>

            <p className="mt-3 leading-8 text-slate-600 dark:text-slate-400">
              مهتم بالانضمام إلى فريق يعمل على منتجات ويب حقيقية، والمساهمة في
              تطوير واجهات حديثة وتجارب رقمية موثوقة.
            </p>

            {/* ====== REPLACED CV LINK WITH CONTACT ====== */}
            <a
              href="#contact"
              className="
                mt-6
                inline-flex
                text-sm
                font-bold
                text-sky-600
                dark:text-sky-400
              "
            >
              تحدث معي عن التعاون ←
            </a>
          </motion.div>

          {/* For clients */}

          <motion.div
            whileHover={{ y: -4 }}
            className="
              rounded-3xl
              border
              border-slate-200
              dark:border-slate-800
              bg-white
              dark:bg-slate-950
              p-7
              sm:p-8
            "
          >
            <span className="text-3xl">🚀</span>

            <h3 className="mt-5 text-xl font-black text-slate-950 dark:text-white">
              لأصحاب المشاريع
            </h3>

            <p className="mt-3 leading-8 text-slate-600 dark:text-slate-400">
              أساعد الشركات والأفراد على بناء أو تطوير مواقع ومنصات ويب تركز على
              الأداء، سهولة الاستخدام والتوافق مع مختلف الأجهزة.
            </p>

            <a
              href="#contact"
              className="
                mt-6
                inline-flex
                text-sm
                font-bold
                text-sky-600
                dark:text-sky-400
              "
            >
              تحدث معي عن مشروعك ←
            </a>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          PROJECTS
      ===================================================== */}

      <section
        id="projects"
        className="
          scroll-mt-24
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-20
        "
      >
        <SectionHeading
          eyebrow="Portfolio"
          title="مشاريع مختارة"
          description="مجموعة من المشاريع التي تعكس مهاراتي في تطوير الويب، الواجهات وتجارب التجارة الإلكترونية."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-80px",
              }}
              transition={{
                duration: 0.5,
                delay: Math.min(index * 0.07, 0.3),
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section
        id="services"
        className="
          scroll-mt-24
          bg-slate-50
          dark:bg-slate-900/40
          border-y
          border-slate-200
          dark:border-slate-800
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            py-20
          "
        >
          <SectionHeading
            eyebrow="Freelance"
            title="كيف يمكنني مساعدتك؟"
            description="خدمات تطوير ويب عملية وموجهة نحو احتياجات المشروع، دون تعقيد غير ضروري."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: "⌘",
                title: "تطوير مواقع الويب",
                text: "مواقع حديثة ومتجاوبة تركز على الأداء وتجربة المستخدم.",
              },
              {
                icon: "W",
                title: "WordPress",
                text: "تطوير وتخصيص مواقع WordPress بما يناسب احتياجات المشروع.",
              },
              {
                icon: "🛒",
                title: "WooCommerce",
                text: "حلول ومواقع تجارة إلكترونية وتجارب شراء سهلة الاستخدام.",
              },
              {
                icon: "⚡",
                title: "تحسين المواقع",
                text: "تحسين الواجهة، التوافق مع الأجهزة وتجربة الاستخدام.",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -5,
                }}
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  dark:border-slate-800
                  bg-white
                  dark:bg-slate-950
                  p-6
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-sky-50
                    dark:bg-sky-950/40
                    text-lg
                    font-black
                    text-sky-500
                  "
                >
                  {service.icon}
                </div>

                <h3 className="mt-5 font-black text-slate-950 dark:text-white">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {service.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          SKILLS
      ===================================================== */}

      <section
        id="skills"
        className="
          scroll-mt-24
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-20
        "
      >
        <SectionHeading
          eyebrow="Technical Skills"
          title="التقنيات والأدوات"
          description="مجموعة التقنيات التي أستخدمها في تطوير المواقع والتطبيقات وتجارب الويب."
        />

        <div className="space-y-10">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category}>
              <h3 className="mb-4 text-lg font-black text-slate-900 dark:text-white">
                {category}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {skills.map((skill) => (
                  <SkillCard
                    key={skill.name}
                    name={skill.name}
                    category={skill.category}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          EXPERIENCE
      ===================================================== */}

      <section
        id="experience"
        className="
          scroll-mt-24
          bg-slate-50
          dark:bg-slate-900/40
          border-y
          border-slate-200
          dark:border-slate-800
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            py-20
          "
        >
          <SectionHeading
            eyebrow="Experience"
            title="الخبرة المهنية"
            description="مسار مهني يجمع بين تطوير الويب، التكوين والعمل على مشاريع ومبادرات مختلفة."
          />

          <div className="relative max-w-4xl">
            {/* Timeline line */}

            <div
              aria-hidden="true"
              className="
                absolute
                right-[11px]
                top-2
                bottom-2
                w-px
                bg-slate-200
                dark:bg-slate-700
              "
            />

            <div className="space-y-10">
              {[
                {
                  year: "2025",
                  title: "تطوير الويب — Vitoria-Gasteiz",
                  text: "تجربة مهنية مرتبطة بتطوير الويب والعمل على بيئة احترافية.",
                },

                {
                  year: "2015–2026",
                  title: "التكوين والتدريب",
                  text: 'خبرة في التكوين ضمن برنامج "Éxito en un Mundo Cambiante" إلى جانب أنشطة مهنية وتعليمية مختلفة.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="
                    relative
                    pr-10
                  "
                >
                  <span
                    className="
                      absolute
                      right-0
                      top-1
                      h-6
                      w-6
                      rounded-full
                      border-4
                      border-slate-50
                      dark:border-slate-900
                      bg-sky-500
                    "
                  />

                  <span className="text-sm font-black text-sky-500">
                    {item.year}
                  </span>

                  <h3 className="mt-2 text-xl font-black text-slate-950 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 max-w-2xl leading-8 text-slate-600 dark:text-slate-400">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          EDUCATION
      ===================================================== */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-20
        "
      >
        <SectionHeading
          eyebrow="Education"
          title="التكوين والشهادات"
          description="تكوين مستمر في تطوير الويب، التجارة الإلكترونية والأمن السيبراني."
        />

        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              year: "2025",
              title: "Confección y Publicación de Páginas Web",
              place: "Centro de Estudios Álava — Vitoria-Gasteiz",
            },
            {
              year: "2024",
              title: "Curso de Ciberseguridad — 60h",
              place: "Instituto Europa — Vitoria-Gasteiz",
            },
            {
              year: "2023–2024",
              title: "Bootcamp de diseño web orientado al comercio electrónico",
              place: "Instituto Europa",
            },
            {
              year: "2022",
              title: "Curso Avanzado de Diseño Web con JavaScript, HTML y CSS",
              place: "CETIC — Vitoria-Gasteiz",
            },
          ].map((item) => (
            <div
              key={`${item.year}-${item.title}`}
              className="
                rounded-2xl
                border
                border-slate-200
                dark:border-slate-800
                bg-white
                dark:bg-slate-950
                p-6
              "
            >
              <span className="text-sm font-black text-sky-500">
                {item.year}
              </span>

              <h3 className="mt-2 font-black text-slate-950 dark:text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {item.place}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          LANGUAGES
      ===================================================== */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          pb-20
        "
      >
        <SectionHeading eyebrow="Languages" title="اللغات" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              name: "العربية",
              level: "Native",
            },
            {
              name: "Español",
              level: "Intermediate",
            },
            {
              name: "Français",
              level: "Intermediate / B1",
            },
            {
              name: "English",
              level: "Intermediate",
            },
          ].map((language) => (
            <div
              key={language.name}
              className="
                rounded-2xl
                border
                border-slate-200
                dark:border-slate-800
                bg-white
                dark:bg-slate-950
                p-5
              "
            >
              <h3 className="font-black text-slate-950 dark:text-white">
                {language.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {language.level}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}

      <section
        className="
          bg-slate-50
          dark:bg-slate-900/40
          border-y
          border-slate-200
          dark:border-slate-800
          py-20
        "
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Testimonials"
            title="ماذا يقول العملاء؟"
            description="تجارب وآراء من الأشخاص الذين عملت معهم."
          />

          <Testimonials />
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section
        id="contact"
        className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="overflow-hidden rounded-[2rem] bg-slate-950 dark:bg-white px-6 py-12 sm:p-14 text-center">
          <span className="text-sm font-bold text-sky-400 dark:text-sky-600">
            LET'S WORK TOGETHER
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-white dark:text-slate-950">
            تبحث عن Web Developer؟
            <br />
            أو لديك مشروع؟
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300 dark:text-slate-600">
            سواء كنت تبحث عن مطور للانضمام إلى فريقك أو تحتاج إلى تطوير موقع أو
            منصة، يسعدني أن أسمع منك.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="mailto:missawi02@gmail.com"
              className="inline-flex items-center justify-center rounded-xl bg-white dark:bg-slate-950 px-7 py-3.5 font-black text-slate-950 dark:text-white transition hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              تواصل عبر البريد
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm">
            <a
              href="https://github.com/elysalem"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white dark:text-slate-500 dark:hover:text-slate-950 transition"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white dark:text-slate-500 dark:hover:text-slate-950 transition"
            >
              LinkedIn
            </a>
            <span className="text-slate-600 dark:text-slate-400">
              Vitoria-Gasteiz, España
            </span>
          </div>
        </div>
      </section>
      {/* =====================================================
          Footer
      ===================================================== */}

      <Footer />

      <ScrollToTop />
    </main>
  );
}
