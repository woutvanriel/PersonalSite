import { Content, ContentType } from "./content";
import { ProjectDetails } from "./project-details";

export interface ProjectContent extends Content {
  id: string | null;
  detail?: ProjectDetails | null;
  detailId?: string | null;
  type: ContentType | null;
  content: string | null;
  alt?: string | null;
  order?: number | null;
}

export function ContentFromPartial(value: Partial<{
  id: string | null;
  detail: string | null;
  type: ContentType | null;
  content: string | null;
  alt: string | null;
}>): ProjectContent {
  return {
    id: value.id ?? null,
    detailId: value.detail ?? null,
    type: value.type ?? null,
    content: value.content ?? null,
    alt: value.alt ?? null,
  };
}
