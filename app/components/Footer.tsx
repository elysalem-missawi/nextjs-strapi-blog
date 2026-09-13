"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-sky-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-right">
          {/* العمود الأول: الاسم والوصف */}
          <div className="md:col-span-1 space-y-3">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">
              Ely Salem
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              مطور ويب ومصمم منصات تفاعلية، شغوف ببناء تجارب رقمية متميزة.
            </p>
          </div>

          {/* العمود الثاني: روابط سريعة */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-800 dark:text-white uppercase tracking-wider">
              روابط سريعة
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#about"
                  className="text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors"
                >
                  عني
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors"
                >
                  المهارات
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors"
                >
                  المشاريع
                </a>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors"
                >
                  المدونة
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الثالث: معلومات التواصل */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-800 dark:text-white uppercase tracking-wider">
              تواصل معي
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:missawi02@gmail.com"
                  className="text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors flex items-center gap-2"
                  dir="ltr"
                >
                  <span>📧</span> missawi02@gmail.com
                </a>
              </li>
              <li className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <span>📍</span> Vitoria-Gasteiz, España
              </li>
              <li>
                <a
                  href="https://github.com/elysalem-missawi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors flex items-center gap-2"
                  dir="ltr"
                >
                  <span>💻</span> github.com/elysalem
                </a>
              </li>
            </ul>
          </div>

          {/* العمود الرابع: وسائل التواصل الاجتماعي (أيقونات) */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-800 dark:text-white uppercase tracking-wider">
              تابعني
            </h4>
            <div className="flex gap-4 justify-start">
              {[
                { icon: "🐦", label: "Twitter", url: "https://twitter.com" },
                { icon: "📘", label: "Facebook", url: "https://facebook.com" },
                { icon: "📸", label: "Instagram", url: "https://instagram.com" },
                { icon: "🔗", label: "LinkedIn", url: "https://linkedin.com" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-sky-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-lg hover:bg-sky-200 dark:hover:bg-sky-900 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* حقوق النشر */}
        <div className="mt-10 pt-6 border-t border-sky-100 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
          &copy; {currentYear} Ely Salem El Missawi. جميع الحقوق محفوظة.
          <span className="block mt-1 text-xs">
            صُنع بـ ❤️ باستخدام Next.js & Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  );
}