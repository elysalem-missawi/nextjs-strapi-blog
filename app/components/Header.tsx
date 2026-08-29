"use client";
import { useState } from "react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import logoImg from "../img/Ely-salem.png";
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/75 dark:bg-slate-900/80 border-b border-sky-100 dark:border-slate-800 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo / Brand Image & Name */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-sky-400 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
                  <Image
                    src={logoImg}
                    alt="Ely Salem El Missawi"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col text-right">
                  <span className="font-bold text-lg text-slate-800 dark:text-white tracking-wide">
                    Ely Salem
                  </span>
                  <span className="text-xs font-semibold text-sky-500">
                    Web Developer
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <button
                onClick={() => setIsAboutOpen(true)}
                className="hover:text-sky-500 transition-colors font-semibold"
              >
                عني
              </button>
              <a
                href="#skills"
                className="hover:text-sky-500 transition-colors"
              >
                المهارات
              </a>
              <a
                href="#projects"
                className="hover:text-sky-500 transition-colors"
              >
                المشاريع
              </a>
              {/* رابط المدونة لشاشات الكمبيوتر */}
              <Link
                href="/blog"
                className="hover:text-sky-500 transition-colors"
              >
                المدونة
              </Link>
            </nav>

            {/* Action Button & Theme Toggle */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setIsContactOpen(true)}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 text-white font-semibold text-sm shadow-md shadow-sky-400/25 hover:shadow-lg hover:shadow-sky-400/40 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                تواصل معي
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-800 transition"
                aria-label="Toggle Menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-slate-900/95 border-b border-sky-100 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3 text-right">
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
            {/* رابط المدونة للجوال */}
            <Link
              href="/blog"
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-slate-700 dark:text-slate-200 font-medium hover:text-sky-500"
            >
              المدونة
            </Link>

            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsContactOpen(true);
              }}
              className="block text-center mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 text-white font-semibold shadow-md"
            >
              تواصل معي
            </button>
          </div>
        )}
      </header>

      {/* Modal نافذة التواصل المنبثقة */}
      {isContactOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          dir="rtl"
        >
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-sky-100 dark:border-slate-800 shadow-2xl relative text-right space-y-6">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 left-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              ✕
            </button>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-sky-400 inline-block"></span>
                معلومات التواصل
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                يسعدني جداً تواصلك لبناء مشاريع مميزة أو مناقشة أفكار جديدة!
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="mailto:missawi02@gmail.com"
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-sky-50/50 dark:bg-slate-800/50 border border-sky-100 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-400 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-400/10 text-sky-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  📧
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400">
                    البريد الإلكتروني
                  </div>
                  <div
                    className="text-sm font-bold text-slate-800 dark:text-slate-100"
                    dir="ltr"
                  >
                    missawi02@gmail.com
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-sky-50/50 dark:bg-slate-800/50 border border-sky-100 dark:border-slate-700">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center text-xl">
                  📍
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400">
                    الموقع
                  </div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Vitoria-Gasteiz, España
                  </div>
                </div>
              </div>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-sky-50/50 dark:bg-slate-800/50 border border-sky-100 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-400 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  💻
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400">
                    معرض الأكواد (GitHub)
                  </div>
                  <div
                    className="text-sm font-bold text-slate-800 dark:text-slate-100"
                    dir="ltr"
                  >
                    github.com/elysalem
                  </div>
                </div>
              </a>
            </div>

            <button
              onClick={() => setIsContactOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* Modal نافذة "عني" المنبثقة */}
      {isAboutOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          dir="rtl"
        >
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-sky-100 dark:border-slate-800 shadow-2xl relative text-right space-y-5">
            <button
              onClick={() => setIsAboutOpen(false)}
              className="absolute top-4 left-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <span className="w-3 h-8 rounded-full bg-sky-400"></span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                نبذة عني
              </h3>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              مطور ويب وشغوف بتطوير الواجهات الرقمية الحديثة والتطبيقات
              التفاعلية. أمتلك خبرة عمل واسعة في بناء وتصميم المواقع والمنصات
              باستخدام أحدث تقنيات الويب مثل React وNext.js وTypeScript، إلى
              جانب تخصيص وتطوير أنظمة إدارة المحتوى مثل WordPress. أسعى دائماً
              لتقديم حلول برمجية تجمع بين الأداء العالي، الأمان، وتجربة المستخدم
              السلسة.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setIsAboutOpen(false)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 text-white font-semibold text-sm shadow-md"
              >
                حسناً
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}