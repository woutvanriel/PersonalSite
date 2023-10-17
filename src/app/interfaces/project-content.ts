import { ProjectDetails } from "./project-details";

export interface ProjectContent {
  id: string | null;
  detail?: ProjectDetails | null;
  detailId?: string | null;
  type: ProjectContentType | null;
  content: string | null;
  order?: number | null;
}

export function ContentFromPartial(value: Partial<{
  id: string | null;
  detail: string | null;
  type: ProjectContentType | null;
  content: string | null;
}>): ProjectContent {
  return {
    id: value.id ?? null,
    detailId: value.detail ?? null,
    type: value.type ?? null,
    content: value.content ?? null,
  };
}

export enum ProjectContentType {
  Text = 0,
  Image = 1,
  Html = 2,
}
