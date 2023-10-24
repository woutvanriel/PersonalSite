export interface Content {
  id: string | null;
  type: ContentType | null;
  content: string | null;
  alt?: string | null;
  order?: number | null;
}

export enum ContentType {
  Text = 0,
  Image = 1,
  Html = 2,
  Link = 3,
  ProjectContainer = 4
}
