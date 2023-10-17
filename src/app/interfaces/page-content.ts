import { PageDetails } from "./page-details";

export interface PageContent {
  id: string | null;
  detail?: PageDetails | null;
  detailId?: string | null;
  type: PageContentType | null;
  content: string | null;
  order?: number | null;
}

export function ContentFromPartial(value: Partial<{
  id: string | null;
  detail: string | null;
  type: PageContentType | null;
  content: string | null;
}>): PageContent {
  return {
    id: value.id ?? null,
    detailId: value.detail ?? null,
    type: value.type ?? null,
    content: value.content ?? null,
  };
}

export enum PageContentType {
  Text = 0,
  Image = 1,
  Html = 2,
}
