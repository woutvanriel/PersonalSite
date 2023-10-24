import { Content, ContentType } from "./content";
import { PageDetails } from "./page-details";

export interface PageContent extends Content {
  id: string | null;
  detail?: PageDetails | null;
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
}>): PageContent {
  return {
    id: value.id ?? null,
    detailId: value.detail ?? null,
    type: value.type ?? null,
    content: value.content ?? null,
    alt: value.alt ?? null,
  };
}
