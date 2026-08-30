"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import logoImg from "../img/Ely-salem.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // تتبع التمرير
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setIsScrolled(scrollTop > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // إغلاق البحث عند الضغط على ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg shadow-sky-500/5"
            : "bg-white/60 dark:bg-slate-900/60 backdrop-blur-md"
        } border-b border-sky-100/50 dark:border-slate-800/50`}
      >
        {/* شريط التقدم المحسّن */}
        <motion.div
          className="h-1 w-full bg-gradient-to-r from-sky-100 via-indigo-100 to-sky-100 dark:from-sky-900 dark:via-indigo-900 dark:to-sky-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"
            style={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* الشعار مع تأثير hover محسّن */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href="/" className="flex items-center gap-3 group">
                <motion.div
                  whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                  className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-sky-400 shadow-lg shadow-sky-500/30 group-hover:shadow-sky-500/50 transition-shadow"
                >
                  <Image
                    src={logoImg}
                    alt="Ely Salem El Missawi"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* حلقة زخرفية حول الصورة */}
                  <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-sky-400/50 transition-all duration-500" />
                </motion.div>
                <div className="flex flex-col text-right">
                  <motion.span
                    className="font-bold text-lg text-slate-800 dark:text-white tracking-wide"
                    whileHover={{ color: "#38bdf8" }}
                    transition={{ duration: 0.2 }}
                  >
                    Ely Salem
                  </motion.span>
                  <span className="text-xs font-semibold text-sky-500 dark:text-sky-400">
                    Web Developer
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* شريط البحث (نسخة سطح المكتب) */}
            <div className="hidden md:flex items-center flex-1 max-w-xs mx-6 relative">
              <motion.div
                initial={false}
                animate={{ width: isSearchOpen ? "100%" : "40px" }}
                transition={{ duration: 0.3 }}
                className="relative w-full"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  onBlur={() => {
                    if (!searchQuery) setIsSearchOpen(false);
                  }}
                  placeholder="ابحث عن مشروع أو مهارة..."
                  className={`w-full py-2 px-4 pr-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-sky-200 dark:border-slate-700 focus:border-sky-400 dark:focus:border-sky-500 focus:ring-2 focus:ring-sky-400/20 outline-none transition-all text-sm ${
                    isSearchOpen ? "opacity-100" : "opacity-0 absolute"
                  }`}
                  dir="rtl"
                />
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-500 transition-colors"
                >
                  🔍
                </button>
              </motion.div>
            </div>

            {/* روابط التنقل مع تأثيرات hover متطورة */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
              {[
                { label: "عني", action: () => setIsAboutOpen(true) },
                { label: "المهارات", href: "#skills" },
                { label: "المشاريع", href: "#projects" },
                { label: "المدونة", href: "/blog" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="relative group transition-colors hover:text-sky-500"
                    >
                      {item.label}
                      <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-500 group-hover:w-full transition-all duration-300" />
                    </a>
                  ) : (
                    <button
                      onClick={item.action}
                      className="relative group transition-colors hover:text-sky-500"
                    >
                      {item.label}
                      <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-500 group-hover:w-full transition-all duration-300" />
                    </button>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* الأزرار الجانبية */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsContactOpen(true)}
                className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-white font-semibold text-sm shadow-md shadow-sky-400/25 hover:shadow-lg hover:shadow-sky-400/40 transition-all duration-300 overflow-hidden group"
              >
                <span className="relative z-10">تواصل معي</span>
                {/* تأثير تموج عند التحويم */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-400"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>

            {/* زر القائمة للجوال */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800 transition"
                aria-label="Toggle Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* قائمة الجوال المحسّنة */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-sky-100 dark:border-slate-800 px-4 pt-2 pb-6 space-y-2 text-right overflow-hidden"
            >
              {[
                { label: "عني", action: () => { setIsMenuOpen(false); setIsAboutOpen(true); } },
                { label: "المهارات", href: "#skills" },
                { label: "المشاريع", href: "#projects" },
                { label: "المدونة", href: "/blog" },
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3 text-slate-700 dark:text-slate-200 font-medium hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-slate-800/50 rounded-lg px-3 transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <button
                      onClick={item.action}
                      className="block w-full text-right py-3 text-slate-700 dark:text-slate-200 font-medium hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-slate-800/50 rounded-lg px-3 transition-colors"
                    >
                      {item.label}
                    </button>
                  )}
                </motion.div>
              ))}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsContactOpen(true);
                }}
                className="block text-center mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 text-white font-semibold shadow-md hover:shadow-lg transition-all"
              >
                تواصل معي
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* نوافذ منبثقة (محسّنة) */}
      <AnimatePresence>
        {isContactOpen && (
          <Modal onClose={() => setIsContactOpen(false)} title="معلومات التواصل" key="contact-modal">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              يسعدني جداً تواصلك لبناء مشاريع مميزة أو مناقشة أفكار جديدة!
            </p>
            <div className="space-y-3 mt-4">
              <ContactItem icon="📧" label="البريد الإلكتروني" value="missawi02@gmail.com" href="mailto:missawi02@gmail.com" />
              <ContactItem icon="📍" label="الموقع" value="Vitoria-Gasteiz, España" />
              <ContactItem icon="💻" label="GitHub" value="github.com/elysalem" href="https://github.com" />
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

// ====== المكونات المساعدة ======

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
      transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
      className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-sky-100 dark:border-slate-800 shadow-2xl relative text-right space-y-4"
    >
      <button
        onClick={onClose}
        className="absolute top-4 left-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
      >
        ✕
      </button>
      <div className="flex items-center gap-3">
        <motion.span
          className="w-3 h-8 rounded-full bg-gradient-to-b from-sky-400 to-indigo-500"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3 }}
        />
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
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center gap-4 p-3.5 rounded-2xl bg-sky-50/50 dark:bg-slate-800/50 border border-sky-100 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-400 transition group"
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400/20 to-indigo-400/20 text-sky-500 dark:text-sky-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <div className="text-xs font-semibold text-slate-400">{label}</div>
        <div className="text-sm font-bold text-slate-800 dark:text-slate-100" dir="ltr">
          {value}
        </div>
      </div>
    </motion.div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
};