import { Injectable } from '@angular/core';
import { PageContent } from '../interfaces/page-content';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PageContentService {

  constructor(
    private http: HttpService
  ) { }

  getAllContent(detailid: string) {
    return this.http.httpCall<PageContent[]>(`Pagecontent/getallcontent/${detailid}`, 'GET', true);
  }

  getContent(id: string) {
    return this.http.httpCall<PageContent>(`Pagecontent/getcontent/${id}`, 'GET', true);
  }

  addContent(content: PageContent) {
    return this.http.httpCall<string>('Pagecontent/addcontent', 'POST', true, content);
  }

  editContent(content: PageContent) {
    return this.http.httpCall<null>('Pagecontent/editcontent', 'PATCH', true, content);
  }

  deleteContent(id: string) {
    return this.http.httpCall<null>(`Pagecontent/deletecontent/${id}`, 'DELETE', true);
  }

  uploadImage(data: FormData) {
    return this.http.httpCall<null>('Pagecontent/uploadimage', 'POST', true, data);
  }

  saveOrder(ids: string[]) {
    return this.http.httpCall<null>('Pagecontent/saveorder', 'POST', true, ids);
  }
}
