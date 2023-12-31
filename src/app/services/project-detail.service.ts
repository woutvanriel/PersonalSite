import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ProjectDetails } from '../interfaces/project-details';

@Injectable({
  providedIn: 'root',
})
export class ProjectDetailService {
  constructor(private http: HttpService) {}

  getDetails(projectid: string) {
    return this.http.httpCall<ProjectDetails[]>(
      `projectdetail/getprojectdetails/${projectid}`,
      'GET',
      true,
    );
  }

  getDetail(detailid: string) {
    return this.http.httpCall<ProjectDetails>(
      `projectdetail/getprojectdetail/${detailid}`,
      'GET',
      true,
    );
  }

  addDetail(detail: ProjectDetails) {
    return this.http.httpCall<string>(
      'projectdetail/addprojectdetail',
      'POST',
      true,
      detail,
    );
  }

  editDetail(detail: ProjectDetails) {
    return this.http.httpCall<null>(
      'projectdetail/editprojectdetail',
      'PATCH',
      true,
      detail,
    );
  }

  deleteDetail(id: string) {
    return this.http.httpCall<null>(
      `projectdetail/deleteprojectdetail/${id}`,
      'DELETE',
      true,
    );
  }
}
