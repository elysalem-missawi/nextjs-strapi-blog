"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import logoImg from "../img/Ely-salem.png";

const navItems = [
  { label: "عني", href: "/#about" },
  { label: "المهارات", href: "/#skills" },
  { label: "المشاريع", href: "/#projects" },
  { label: "الخبرة", href: "/#experience" },
  { label: "الخدمات", href: "/#services" },
  { label: "المدونة", href: "/blog" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  /* =========================
     Scroll state & active section
  ========================= */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // فقط في الصفحة الرئيسية نحاول تحديد القسم النشط
      if (window.location.pathname === "/") {
        const sections = navItems
          .filter((item) => item.href.startsWith("/#"))
          .map((item) => item.href.substring(2)); // استخراج الـ id

        const currentSection = sections.find((id) => {
          const element = document.getElementById(id);
          if (!element) return false;
          const rect = element.getBoundingClientRect();
          return rect.top <= 140 && rect.bottom >= 140;
        });

        if (currentSection) {
          setActiveSection(currentSection);
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================
     Close mobile menu on resize
  ========================= */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* =========================
     Prevent body scroll
     when mobile menu is open
  ========================= */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        dir="rtl"
        className={`
          sticky top-0 z-50
          border-b
          transition-all duration-300
          ${
            isScrolled
              ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-sm"
              : "bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-transparent"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[72px] flex items-center justify-between gap-6">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0 group"
              aria-label="Ely Salem - الصفحة الرئيسية"
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="
                  relative w-10 h-10
                  rounded-full overflow-hidden
                  border border-sky-400/70
                  shadow-sm
                  group-hover:shadow-md
                  group-hover:shadow-sky-500/20
                  transition-shadow
                "
              >
                <Image
                  src={logoImg}
                  alt="Ely Salem El Missawi"
                  fill
                  sizes="40px"
                  className="object-cover"
                  priority
                />
              </motion.div>

              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-bold text-base text-slate-900 dark:text-white">
                  Ely Salem
                </span>
                <span className="text-[11px] font-medium text-sky-500 dark:text-sky-400">
                  Web Developer
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="التنقل الرئيسي"
            >
              {navItems.map((item) => {
                const isAnchor = item.href.startsWith("/#");
                const sectionId = isAnchor ? item.href.substring(2) : "";

                const isActive = isAnchor && activeSection === sectionId;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`
                      relative px-3 py-2
                      rounded-lg
                      text-sm font-medium
                      transition-colors duration-200
                      ${
                        isActive
                          ? "text-sky-600 dark:text-sky-400"
                          : "text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400"
                      }
                    `}
                  >
                    {item.label}

                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="
                          absolute
                          bottom-0
                          right-3
                          left-3
                          h-0.5
                          rounded-full
                          bg-gradient-to-r
                          from-sky-400
                          to-indigo-500
                        "
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <ThemeToggle />

              {/* CTA */}
              <motion.a
                href="/#contact"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="
                  px-5 py-2.5
                  rounded-xl
                  bg-gradient-to-r
                  from-sky-500
                  to-indigo-600
                  text-white
                  text-sm
                  font-bold
                  shadow-md
                  shadow-sky-500/20
                  hover:shadow-lg
                  hover:shadow-sky-500/30
                  transition-shadow
                "
              >
                ابدأ مشروعك
              </motion.a>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />

              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="
                  w-10 h-10
                  flex items-center justify-center
                  rounded-xl
                  text-slate-700
                  dark:text-slate-200
                  border border-slate-200
                  dark:border-slate-700
                  hover:bg-slate-100
                  dark:hover:bg-slate-800
                  transition-colors
                "
                aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">
                  {isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
                </span>

                <div className="relative w-5 h-5">
                  <motion.span
                    animate={{
                      rotate: isMenuOpen ? 45 : 0,
                      y: isMenuOpen ? 8 : 2,
                    }}
                    className="
                      absolute right-0
                      w-5 h-0.5
                      bg-current
                      rounded-full
                    "
                  />

                  <motion.span
                    animate={{
                      opacity: isMenuOpen ? 0 : 1,
                    }}
                    className="
                      absolute right-0 top-1/2
                      w-5 h-0.5
                      bg-current
                      rounded-full
                    "
                  />

                  <motion.span
                    animate={{
                      rotate: isMenuOpen ? -45 : 0,
                      y: isMenuOpen ? 8 : 14,
                    }}
                    className="
                      absolute right-0
                      w-5 h-0.5
                      bg-current
                      rounded-full
                    "
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Overlay & Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.button
                type="button"
                aria-label="إغلاق القائمة"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMenu}
                className="
                  md:hidden
                  fixed inset-0
                  top-[72px]
                  bg-slate-950/30
                  backdrop-blur-[2px]
                "
              />

              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="
                  md:hidden
                  absolute
                  top-full
                  right-0
                  left-0
                  bg-white
                  dark:bg-slate-950
                  border-b
                  border-slate-200
                  dark:border-slate-800
                  shadow-xl
                "
              >
                <nav
                  className="max-w-7xl mx-auto px-4 py-5 space-y-1"
                  aria-label="قائمة الهاتف"
                >
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={closeMenu}
                      className="
                        flex items-center justify-between
                        px-4 py-3.5
                        rounded-xl
                        text-slate-700
                        dark:text-slate-200
                        font-medium
                        hover:bg-sky-50
                        dark:hover:bg-slate-900
                        hover:text-sky-600
                        dark:hover:text-sky-400
                        transition-colors
                      "
                    >
                      <span>{item.label}</span>
                      <span className="text-slate-300 dark:text-slate-600">
                        ←
                      </span>
                    </Link>
                  ))}

                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3">
                    {/* CV */}
                    <a
                      href="/cv/Ely-Salem-El-Missawi-CV.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="
                        flex items-center justify-center
                        py-3
                        rounded-xl
                        border
                        border-slate-200
                        dark:border-slate-700
                        text-slate-700
                        dark:text-slate-200
                        font-semibold
                        text-sm
                      "
                    >
                      تحميل CV
                    </a>

                    {/* Contact */}
                    <a
                      href="mailto:missawi02@gmail.com"
                      className="text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors flex items-center gap-2"
                      dir="ltr"
                    >
                      <span>📧</span> missawi02@gmail.com
                    </a>
                  </div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
