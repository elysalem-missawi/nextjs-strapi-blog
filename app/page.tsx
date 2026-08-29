import ProjectCard from './components/ProjectCard';
import { projectsData, skillsData } from './data/portfolioData';

export default function Home() {
  return (
    <main className="min-h-screen p-6 md:p-12 max-w-6xl mx-auto space-y-20" dir="rtl">
      {/* Hero Section */}
      <section id="about" className="text-center py-16 space-y-6 relative">
        <div className="inline-block px-4 py-1.5 rounded-full bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-300 text-sm font-semibold mb-2">
          ✨ مرحباً بك في معراضي الرقمي
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600">
          Ely Salem El Missawi
        </h1>
        <h2 className="text-2xl sm:text-3xl text-slate-700 dark:text-slate-300 font-bold">
          مطور ويب ومصمم منصات تفاعلية
        </h2>
        <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
          متخصص في بناء الواجهات الحديثة والتطبيقات التفاعلية باستخدام{' '}
          <span dir="ltr" className="inline-block font-bold text-sky-500">TypeScript</span>،{' '}
          <span dir="ltr" className="inline-block font-bold text-blue-500">Next.js</span>، و{' '}
          <span dir="ltr" className="inline-block font-bold text-indigo-500">WordPress</span>.
        </p>
      </section>

      {/* Skills Section */}
      <section id="skills" className="space-y-8">
        <div className="flex items-center gap-3 border-b border-sky-100 dark:border-slate-800 pb-4">
          <span className="w-3 h-8 rounded-full bg-sky-400"></span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            المهارات التقنية
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {skillsData.map((skill) => (
            <div
              key={skill.name}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-sky-300 transition-all text-center flex flex-col justify-between"
            >
              <span className="font-bold block text-slate-800 dark:text-slate-100 text-lg" dir="ltr">
                {skill.name}
              </span>
              <span className="text-xs font-medium text-sky-500 dark:text-sky-400 mt-3 inline-block bg-sky-50 dark:bg-sky-950/50 py-1 px-3 rounded-full mx-auto">
                {skill.category}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="space-y-8">
        <div className="flex items-center gap-3 border-b border-sky-100 dark:border-slate-800 pb-4">
          <span className="w-3 h-8 rounded-full bg-blue-500"></span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            المشاريع المتميزة
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
      {/* Contact Section */}
<section id="contact" className="space-y-8 py-10">
  <div className="flex items-center gap-3 border-b border-sky-100 dark:border-slate-800 pb-4">
    <span className="w-3 h-8 rounded-full bg-indigo-500"></span>
    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
      تواصل معي
    </h2>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <a
      href="mailto:contact@elysalem.dev"
      className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 shadow-sm hover:border-sky-400 transition text-center space-y-3 group"
    >
      <div className="w-12 h-12 mx-auto rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
        📧
      </div>
      <h4 className="font-bold text-slate-800 dark:text-white">البريد الإلكتروني</h4>
      <p className="text-sm text-sky-500 font-medium" dir="ltr">contact@elysalem.dev</p>
    </a>

    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 shadow-sm text-center space-y-3">
      <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-500 flex items-center justify-center text-2xl">
        📍
      </div>
      <h4 className="font-bold text-slate-800 dark:text-white">المكان</h4>
      <p className="text-sm text-slate-500 dark:text-slate-400">Vitoria-Gasteiz, España</p>
    </div>

    <a
      href="https://github.com"
      target="_blank"
      rel="noopener noreferrer"
      className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-800 shadow-sm hover:border-sky-400 transition text-center space-y-3 group"
    >
      <div className="w-12 h-12 mx-auto rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
        💻
      </div>
      <h4 className="font-bold text-slate-800 dark:text-white">GitHub</h4>
      <p className="text-sm text-indigo-500 font-medium" dir="ltr">github.com/elysalem</p>
    </a>
  </div>
</section>
    </main>
  );
}