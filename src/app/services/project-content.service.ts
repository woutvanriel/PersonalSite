import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ProjectContent } from '../interfaces/project-content';

@Injectable({
  providedIn: 'root'
})
export class ProjectContentService {

  constructor(
    private http: HttpService
  ) { }

  getAllContent(detailid: string) {
    return this.http.httpCall<ProjectContent[]>(`projectcontent/getallcontent/${detailid}`, 'GET', true);
  }

  getContent(id: string) {
    return this.http.httpCall<ProjectContent>(`projectcontent/getcontent/${id}`, 'GET', true);
  }

  addContent(content: ProjectContent) {
    return this.http.httpCall<string>('projectcontent/addcontent', 'POST', true, content);
  }

  editContent(content: ProjectContent) {
    return this.http.httpCall<null>('projectcontent/editcontent', 'PATCH', true, content);
  }

  deleteContent(id: string) {
    return this.http.httpCall<null>(`projectcontent/deletecontent/${id}`, 'DELETE', true);
  }

  uploadImage(data: FormData) {
    return this.http.httpCall<null>('projectcontent/uploadimage', 'POST', true, data);
  }
}
