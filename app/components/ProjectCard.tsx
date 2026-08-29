import { Project } from '../types/portfolio';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="border border-sky-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all bg-white dark:bg-slate-900 flex flex-col justify-between text-right">
      <div>
        <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
          {project.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-2 mb-4 justify-start" dir="ltr">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-300 text-xs px-2.5 py-1 rounded-md font-medium border border-sky-100 dark:border-sky-900/40"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline font-semibold text-sm"
          >
            <span>معاينة المشروع</span>
            <span>←</span>
          </a>
        )}
      </div>
    </div>
  );
}