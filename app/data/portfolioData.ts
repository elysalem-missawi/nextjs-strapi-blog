import { Project, Skill } from "../types/portfolio";

export const projectsData: Project[] = [
  {
    id: "1",
    title: "FC Nouadhibou - المنصة الرسمية",
    description:
      "منصة ويب متكاملة لنادي إف سي نواذيبو تشمل عرض الأخبار، البث المباشر، وتفاصيل المباريات.",
    category: "web",
    technologies: ["Next.js", "TypeScript", "PHP", "Tailwind CSS"],
    liveUrl: "https://fc-nouadhibou.page.gd/?i=1",
  },
  {
    id: "2",
    title: "Dr. Fatimetou - العيادة الطبية الإلكترونية",
    description:
      "موقع إلكتروني مخصص لاستشارات العيادة الطبية وحجز المواعيد والتعريف بالخدمات الصحية.",
    category: "web",
    technologies: ["WordPress", "PHP", "CSS3", "JavaScript"],
    liveUrl: "https://dr-fatimetou.page.gd/?i=1",
  },
  {
    id: "3",
    title: "Aoun Market - متجر عون الإلكتروني",
    description:
      "منصة تجارة إلكترونية متكاملة لعرض المنتجات وإدارة الطلبات وتسهيل عملية الشراء.",
    category: "web",
    technologies: ["WooCommerce", "WordPress", "PHP", "CSS3"],
    liveUrl: "https://aounmarke.infy.uk/?i=1",
  },
  {
    id: "4",
    title: "English Plan - منصة تعلم الإنجليزية",
    description:
      "موقع تعليمي لتوفير الخطط والدروس والموارد لتعلم اللغة الإنجليزية بطريقة مبسطة.",
    category: "web",
    technologies: ["WordPress", "HTML5", "CSS3", "JavaScript"],
    liveUrl: "https://englishplan.page.gd/?i=1",
  },
  {
    id: "5",
    title: "Toufan El Aksa - منصة إعلامية",
    description: "موقع ويب إخباري وإعلامي لتغطية ومتابعة الأحداث والمستجدات.",
    category: "web",
    technologies: ["WordPress", "PHP", "CSS3"],
    liveUrl: "https://toufanelaksa.page.gd/?i=1",
  },
  {
    id: "6",
    title: "Tabaroat - منصة تبرعات",
    description:
      "منصة إلكترونية مخصصة لإدارة وتسهيل التبرعات ودعم المبادرات والأنشطة الخيرية.",
    category: "web",
    technologies: ["WordPress", "WooCommerce", "PHP", "CSS3"],
    liveUrl: "https://tabaroat.com/",
  },
  {
    id: "7",
    title: "Portafolio Personal V2",
    description:
      "نسخة سابقة لمعرض الأعمال الشخصي مصممة باستجابة عالية لعرض المهارات والمشاريع.",
    category: "web",
    technologies: ["JavaScript", "HTML5", "CSS3", "GitHub Pages"],
    liveUrl: "https://elysalem-missawi.github.io/portafolio-2/",
  },
];

export const skillsData: Skill[] = [
  { name: "TypeScript / JavaScript", category: "Frontend", level: "80%" },
  { name: "React / Next.js", category: "Frontend", level: "85%" },
  { name: "WordPress / WooCommerce", category: "Backend", level: "90%" },
  { name: "PHP & Web Scripts", category: "Backend", level: "80%" },
  { name: "HTML5 & Tailwind CSS", category: "Frontend", level: "90%" },
  { name: "Cybersecurity Fundamentals", category: "Tools", level: "70%" },
];
