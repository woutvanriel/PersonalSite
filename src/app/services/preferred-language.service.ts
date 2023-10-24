import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreferredLanguageService {
  @Output() languageChanged = new EventEmitter<string>();
  language = 'Nederlands';

  constructor() {
    const lang = localStorage.getItem('language');
    if (lang) {
      this.language = lang;
    }
  }

  setLanguage(lang: string) {
    this.language = lang;
    localStorage.setItem('language', lang);
    this.languageChanged.emit(lang);
  }
}
