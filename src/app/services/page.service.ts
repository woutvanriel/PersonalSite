import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Page } from '../interfaces/page';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  constructor(private http: HttpService) {}

  getPages() {
    return this.http.httpCall<Page[]>('Page/getPages', 'GET', true);
  }

  getPagesHeader() {
    return this.http.httpCall<Page[]>('Page/getPagesheader', 'GET', true);
  }

  getPage(id: string) {
    return this.http.httpCall<Page>(`Page/getPage/${id}`, 'GET', true);
  }

  getPageSlug(id: string) {
    return this.http.httpCall<Page>(`Page/getPagebyslug/${id}`, 'GET', true);
  }

  getAllPages() {
    return this.http.httpCall<Page[]>('Page/getallPages', 'GET', true);
  }

  addPage(Page: Page) {
    return this.http.httpCall<string>(
      'Page/addPage',
      'POST',
      true,
      Page,
    );
  }

  editPage(Page: Page) {
    return this.http.httpCall<null>(
      'Page/editPage',
      'PATCH',
      true,
      Page,
    );
  }

  deletePage(id: string) {
    return this.http.httpCall<null>(
      `Page/deletePage/${id}`,
      'DELETE',
      true,
    );
  }

  uploadImages(data: FormData) {
    return this.http.httpCall<null>('Page/uploadimages', 'POST', true, data);
  }

  deleteImage(Pageid: string, imageid: string) {
    return this.http.httpCall<null>(
      `Page/deleteimage/${Pageid}/${imageid}`,
      'DELETE',
      true,
    );
  }

  saveOrder(ids: string[]) {
    return this.http.httpCall<null>('Page/saveorder', 'POST', true, ids);
  }
}
