import { Injectable } from '@angular/core';
import { PageDetails } from '../interfaces/page-details';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PageDetailService {
  constructor(private http: HttpService) {}

  getDetails(Pageid: string) {
    return this.http.httpCall<PageDetails[]>(
      `Pagedetail/getPagedetails/${Pageid}`,
      'GET',
      true,
    );
  }

  getDetail(detailid: string) {
    return this.http.httpCall<PageDetails>(
      `Pagedetail/getPagedetail/${detailid}`,
      'GET',
      true,
    );
  }

  addDetail(detail: PageDetails) {
    return this.http.httpCall<string>(
      'Pagedetail/addPagedetail',
      'POST',
      true,
      detail,
    );
  }

  editDetail(detail: PageDetails) {
    return this.http.httpCall<null>(
      'Pagedetail/editPagedetail',
      'PATCH',
      true,
      detail,
    );
  }

  deleteDetail(id: string) {
    return this.http.httpCall<null>(
      `Pagedetail/deletePagedetail/${id}`,
      'DELETE',
      true,
    );
  }
}
