import { Language } from "./language";
import { Page } from "./page";
import { PageContent } from "./page-content";

export interface PageDetails {
  id: string | null;
  Page?: Page | null;
  PageId?: string | null;
  language?: Language | null;
  languageId?: string | null;
  content?: PageContent[] | null;
  title: string | null;
  description: string | null;
}

export function DetailFromPartial(
  input: Partial<{
    id: string | null;
    language: string | null;
    title: string | null;
    description: string | null;
    Page: string | null;
  }>,
): PageDetails {
  return {
    id: input.id || null,
    languageId: input.language || null,
    title: input.title || null,
    description: input.description || null,
    PageId: input.Page || null,
  };
}
