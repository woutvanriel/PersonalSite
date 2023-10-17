import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PreferredLanguageService } from '../services/preferred-language.service';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
  constructor(private language: PreferredLanguageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const lang = this.language.language;
    if (lang) {
      request = request.clone({
        setHeaders: {
          'Preferred-Language': lang,
        },
      });
    }
    return next.handle(request);
  }
}
