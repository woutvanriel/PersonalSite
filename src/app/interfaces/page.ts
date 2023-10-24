import { PageContent } from "./page-content";
import { PageDetails } from "./page-details";

export interface Page {
  id?: string | null;
  content?: PageContent[];
  details?: PageDetails[];
  title?: string | null;
  slug?: string | null;
  order?: number | null;
}

export function PageFromPartial(
  input: Partial<{ id: string | null; slug: string | null; title: string | null }>,
): Page {
  return {
    id: input.id || null,
    slug: input.slug || null,
    title: input.title || null,
  };
}
