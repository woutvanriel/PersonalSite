import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Language } from '../interfaces/language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private http: HttpService) {}

  getLanguages(page: number) {
    return this.http.httpCall<Language[]>(
      `language/getlanguages/${page}`,
      'GET',
      true,
    );
  }

  getLanguage(id: string) {
    return this.http.httpCall<Language>(
      `language/getlanguage/${id}`,
      'GET',
      true,
    );
  }

  countLanguages() {
    return this.http.httpCall<number>('language/countlanguages', 'GET', true);
  }

  addLanguage(lang: Language) {
    return this.http.httpCall<string>(
      'language/addlanguage',
      'POST',
      true,
      lang,
    );
  }

  editLanguage(lang: Language) {
    return this.http.httpCall<null>(
      'language/editlanguage',
      'PATCH',
      true,
      lang,
    );
  }

  deleteLanguage(id: string) {
    return this.http.httpCall<null>(
      `language/deletelanguage/${id}`,
      'DELETE',
      true,
    );
  }

  uploadImage(data: FormData) {
    return this.http.httpCall<string>(
      'language/uploadimage',
      'POST',
      true,
      data,
    );
  }

  deleteImage(id: string) {
    return this.http.httpCall<null>(
      `language/deleteimage/${id}`,
      'DELETE',
      true,
    );
  }
}
