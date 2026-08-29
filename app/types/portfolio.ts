export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'web' | 'wordpress' | 'security';
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Languages';
  level: string;
}