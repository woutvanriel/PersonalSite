import { ProjectDetails } from "./project-details";

export interface ProjectContent {
  id: string | null;
  detail?: ProjectDetails | null;
  detailId?: string | null;
  type: ProjectContentType | null;
  content: string | null;
  order: number | null;
}

export function ContentFromPartial() {

}

export enum ProjectContentType {
  Text = 0,
  Image = 1,
  Html = 2,
}
