import { Image } from './image';
import { ProjectContent } from './project-content';
import { ProjectDetails } from './project-details';

export interface Project {
  id?: string | null;
  images?: Image[];
  content?: ProjectContent[];
  details?: ProjectDetails[];
  slug?: string | null;
  order?: number | null;
}

export function ProjectFromPartial(
  input: Partial<{ id: string | null; slug: string | null }>,
): Project {
  return {
    id: input.id || null,
    slug: input.slug || null,
  };
}
