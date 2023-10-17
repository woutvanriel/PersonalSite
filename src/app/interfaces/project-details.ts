import { Language } from './language';
import { Project } from './project';
import { ProjectContent } from './project-content';

export interface ProjectDetails {
  id: string | null;
  project?: Project | null;
  projectId?: string | null;
  language?: Language | null;
  languageId?: string | null;
  content?: ProjectContent[] | null;
  title: string | null;
  description: string | null;
}

export function DetailFromPartial(
  input: Partial<{
    id: string | null;
    language: string | null;
    title: string | null;
    description: string | null;
    project: string | null;
  }>,
): ProjectDetails {
  return {
    id: input.id || null,
    languageId: input.language || null,
    title: input.title || null,
    description: input.description || null,
    projectId: input.project || null,
  };
}
