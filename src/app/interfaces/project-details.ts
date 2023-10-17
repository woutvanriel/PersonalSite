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
