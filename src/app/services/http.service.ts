import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SpinnerService } from './spinner.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  @Output('getRequestMade') getRequestMade = new BehaviorSubject<string>('');
  Promises: Promise<any>[] = [];
  SpinnerPromises: Promise<any>[] = [];
  AllSettledPromise: Promise<PromiseSettledResult<any>[]> | undefined;

  constructor(
    private http: HttpClient,
    private spinner: SpinnerService,
    private router: Router,
    private alert: AlertService
  ) {}

  httpCallArraybuffer(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    showSpinner: boolean,
    body: any
  ) {
    if (showSpinner) {
      this.spinner.show();
    }
    const promise = firstValueFrom(
      this.getObservableArraybuffer(url, method, body)
    );
    promise.catch((err: HttpErrorResponse) => this.errorHandler(err));
    if (showSpinner) {
      this.Promises.push(promise);
      this.SpinnerPromises.push(promise);
    }
    Promise.allSettled(this.SpinnerPromises).then(() => this.promiseCallback());
    return promise;
  }

  private getObservableArraybuffer(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    body?: object,
    headers?: any
  ) {
    switch (method) {
      case 'GET':
        return this.httpGetArraybuffer(url, headers);
      case 'POST':
        return this.httpPostArraybuffer(url, body, headers);
      case 'PUT':
        return this.httpPutArraybuffer(url, body, headers);
      case 'DELETE':
        return this.httpDeleteArraybuffer(url, body, headers);
      default:
        return throwError(() => new Error('Invalid method.'));
    }
  }

  private httpGetArraybuffer(url: string, headers?: any) {
    this.getRequestMade.next(url);
    return this.http.get(`${environment.apiUrl}/${url}`, {
      headers,
      responseType: 'arraybuffer',
      observe: 'response',
    });
  }

  private httpPostArraybuffer(url: string, body?: object, headers?: any) {
    return this.http.post(`${environment.apiUrl}/${url}`, body, {
      headers,
      responseType: 'arraybuffer',
      observe: 'response',
    });
  }

  private httpPutArraybuffer(url: string, body?: object, headers?: any) {
    return this.http.put(`${environment.apiUrl}/${url}`, body, {
      headers,
      responseType: 'arraybuffer',
      observe: 'response',
    });
  }

  private httpDeleteArraybuffer(url: string, body?: object, headers?: any) {
    return this.http.delete(`${environment.apiUrl}/${url}`, {
      headers,
      body,
      responseType: 'arraybuffer',
      observe: 'response',
    });
  }

  httpCall<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    showSpinner: boolean,
    body?: any,
    headers?: any
  ): Promise<T> {
    if (showSpinner) {
      this.spinner.show();
    }
    const promise = firstValueFrom(this.getObservable<T>(url, method, body));
    promise.catch((err: HttpErrorResponse) => this.errorHandler(err));
    if (showSpinner) {
      this.Promises.push(promise);
      this.SpinnerPromises.push(promise);
    }
    Promise.allSettled(this.SpinnerPromises).then(() => this.promiseCallback());
    return promise;
  }

  private promiseCallback() {
    Promise.allSettled(this.SpinnerPromises).then(() => {
      this.spinner.hide();
    });
  }

  private getObservable<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    body?: object,
    headers?: any
  ) {
    switch (method) {
      case 'GET':
        return this.httpGet<T>(url, headers);
      case 'POST':
        return this.httpPost<T>(url, body, headers);
      case 'PUT':
        return this.httpPut<T>(url, body, headers);
      case 'DELETE':
        return this.httpDelete<T>(url, body, headers);
      case 'PATCH':
        return this.httpPatch<T>(url, body, headers);
      default:
        return throwError(() => new Error('Invalid method.'));
    }
  }

  private httpGet<T>(url: string, headers?: any): Observable<T> {
    this.getRequestMade.next(url);
    return this.http.get<T>(`${environment.apiUrl}/${url}`, { headers });
  }

  private httpPost<T>(
    url: string,
    body?: object,
    headers?: any
  ): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}/${url}`, body, { headers });
  }

  private httpPut<T>(url: string, body?: object, headers?: any): Observable<T> {
    return this.http.put<T>(`${environment.apiUrl}/${url}`, body, { headers });
  }

  private httpPatch<T>(url: string, body?: object, headers?: any): Observable<T> {
    return this.http.patch<T>(`${environment.apiUrl}/${url}`, body, { headers });
  }

  private httpDelete<T>(
    url: string,
    body?: object,
    headers?: any
  ): Observable<T> {
    return this.http.delete<T>(`${environment.apiUrl}/${url}`, {
      headers,
      body,
    });
  }

  private errorHandler(err: HttpErrorResponse) {
    if (!environment.production) {
      console.error(err);
    }
    if (err.status === 401) {
      if (this.router.url !== '/') {
        localStorage.removeItem('jwt');
        this.router.navigate(['/admin/login']);
      }
    } else if (err.status === 403) {
      this.alert.show(err.error.Message).then(() => {
        window.location = '/' as Location | (string & Location);
      });
    }
  }
}
