"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"; // ⬅️ تأكد من الاستيراد
import ThemeToggle from "./ThemeToggle";
import logoImg from "../img/Ely-salem.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b border-sky-100/50 dark:border-slate-800/50 transition-all shadow-sm">
        {/* شريط التقدم */}
        <div className="h-1 w-full bg-sky-100 dark:bg-slate-800">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-400 to-indigo-500"
            style={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-3 group">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-sky-400 shadow-md shadow-sky-500/20"
                >
                  <Image src={logoImg} alt="Ely Salem El Missawi" fill className="object-cover" priority />
                </motion.div>
                <div className="flex flex-col text-right">
                  <span className="font-bold text-lg text-slate-800 dark:text-white tracking-wide">
                    Ely Salem
                  </span>
                  <span className="text-xs font-semibold text-sky-500">Web Developer</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <button
                onClick={() => setIsAboutOpen(true)}
                className="hover:text-sky-500 transition-colors font-semibold relative after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-sky-400 after:transition-all hover:after:w-full"
              >
                عني
              </button>
              <a href="#skills" className="hover:text-sky-500 transition-colors relative after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-sky-400 after:transition-all hover:after:w-full">
                المهارات
              </a>
              <a href="#projects" className="hover:text-sky-500 transition-colors relative after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-sky-400 after:transition-all hover:after:w-full">
                المشاريع
              </a>
              <Link href="/blog" className="hover:text-sky-500 transition-colors relative after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-sky-400 after:transition-all hover:after:w-full">
                المدونة
              </Link>
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsContactOpen(true)}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 text-white font-semibold text-sm shadow-md shadow-sky-400/25 hover:shadow-lg hover:shadow-sky-400/40 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                تواصل معي
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800 transition"
                aria-label="Toggle Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ===== Mobile Menu Dropdown with animation ===== */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="mobile-menu" // ⬅️ مهم لـ AnimatePresence
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 dark:bg-slate-900/95 border-b border-sky-100 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3 text-right overflow-hidden"
            >
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsAboutOpen(true);
                }}
                className="block w-full text-right py-2 text-slate-700 dark:text-slate-200 font-medium hover:text-sky-500"
              >
                عني
              </button>
              <a
                href="#skills"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-slate-700 dark:text-slate-200 font-medium hover:text-sky-500"
              >
                المهارات
              </a>
              <a
                href="#projects"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-slate-700 dark:text-slate-200 font-medium hover:text-sky-500"
              >
                المشاريع
              </a>
              <Link
                href="/blog"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-slate-700 dark:text-slate-200 font-medium hover:text-sky-500"
              >
                المدونة
              </Link>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsContactOpen(true);
                }}
                className="block text-center mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 text-white font-semibold shadow-md"
              >
                تواصل معي
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ===== Contact Modal ===== */}
      <AnimatePresence>
        {isContactOpen && (
          <Modal onClose={() => setIsContactOpen(false)} title="معلومات التواصل" key="contact-modal">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              يسعدني جداً تواصلك لبناء مشاريع مميزة أو مناقشة أفكار جديدة!
            </p>
            <div className="space-y-3 mt-4">
              <ContactItem
                icon="📧"
                label="البريد الإلكتروني"
                value="missawi02@gmail.com"
                href="mailto:missawi02@gmail.com"
              />
              <ContactItem icon="📍" label="الموقع" value="Vitoria-Gasteiz, España" />
              <ContactItem
                icon="💻"
                label="GitHub"
                value="github.com/elysalem"
                href="https://github.com"
              />
            </div>
            <button
              onClick={() => setIsContactOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer mt-4"
            >
              إغلاق
            </button>
          </Modal>
        )}
      </AnimatePresence>

      {/* ===== About Modal ===== */}
      <AnimatePresence>
        {isAboutOpen && (
          <Modal onClose={() => setIsAboutOpen(false)} title="نبذة عني" key="about-modal">
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              مطور ويب وشغوف بتطوير الواجهات الرقمية الحديثة والتطبيقات التفاعلية. أمتلك خبرة عمل واسعة في بناء وتصميم المواقع
              والمنصات باستخدام أحدث تقنيات الويب مثل React وNext.js وTypeScript، إلى جانب تخصيص وتطوير أنظمة إدارة المحتوى مثل
              WordPress. أسعى دائماً لتقديم حلول برمجية تجمع بين الأداء العالي، الأمان، وتجربة المستخدم السلسة.
            </p>
            <button
              onClick={() => setIsAboutOpen(false)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 text-white font-semibold text-sm shadow-md mt-4"
            >
              حسناً
            </button>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

// ===== المكونات المساعدة =====

const Modal = ({
  children,
  title,
  onClose,
}: {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" dir="rtl">
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-sky-100 dark:border-slate-800 shadow-2xl relative text-right space-y-4"
    >
      <button
        onClick={onClose}
        className="absolute top-4 left-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
      >
        ✕
      </button>
      <div className="flex items-center gap-3">
        <span className="w-3 h-8 rounded-full bg-sky-400" />
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h3>
      </div>
      {children}
    </motion.div>
  </div>
);

const ContactItem = ({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href?: string;
}) => {
  const content = (
    <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-sky-50/50 dark:bg-slate-800/50 border border-sky-100 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-400 transition group">
      <div className="w-10 h-10 rounded-xl bg-sky-400/10 text-sky-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <div className="text-xs font-semibold text-slate-400">{label}</div>
        <div className="text-sm font-bold text-slate-800 dark:text-slate-100" dir="ltr">
          {value}
        </div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
};