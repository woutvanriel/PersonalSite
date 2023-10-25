import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpService) {}

  getProjects() {
    return this.http.httpCall<Project[]>('project/getprojects', 'GET', true);
  }

  getProject(id: string) {
    return this.http.httpCall<Project>(`project/getproject/${id}`, 'GET', true);
  }

  getProjectSlug(slug: string) {
    return this.http.httpCall<Project>(`project/getprojectbyslug/${slug}`, 'GET', true);
  }

  getAllProjects() {
    return this.http.httpCall<Project[]>('project/getallprojects', 'GET', true);
  }

  addProject(project: Project) {
    return this.http.httpCall<string>(
      'project/addproject',
      'POST',
      true,
      project,
    );
  }

  editProject(project: Project) {
    return this.http.httpCall<null>(
      'project/editproject',
      'PATCH',
      true,
      project,
    );
  }

  deleteProject(id: string) {
    return this.http.httpCall<null>(
      `project/deleteproject/${id}`,
      'DELETE',
      true,
    );
  }

  uploadImages(data: FormData) {
    return this.http.httpCall<null>('project/uploadimages', 'POST', true, data);
  }

  deleteImage(projectid: string, imageid: string) {
    return this.http.httpCall<null>(
      `project/deleteimage/${projectid}/${imageid}`,
      'DELETE',
      true,
    );
  }

  saveOrder(ids: string[]) {
    return this.http.httpCall<null>('project/saveorder', 'POST', true, ids);
  }

  getProjectsDetails(page: number) {
    return this.http.httpCall<Project[]>(
      `project/getprojectsdetails/${page}`,
      'GET',
      true,
    );
  }
}
