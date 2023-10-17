import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (this.auth.jwt !== null) {
      request = request.clone({
        setHeaders: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.auth.jwt}`,
        },
      });
    }
    return next.handle(request);
  }
}
