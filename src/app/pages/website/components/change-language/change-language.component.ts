import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Language } from 'src/app/interfaces/language';
import { LanguageService } from 'src/app/services/language.service';
import { PreferredLanguageService } from 'src/app/services/preferred-language.service';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss']
})
export class ChangeLanguageComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  languages: Language[] = [];

  constructor(
    private language: LanguageService,
    private preferredLanguage: PreferredLanguageService
  ) {}

  ngOnInit(): void {
    this.getLanguages();
  }

  getLanguages() {
    this.language.getLanguagesHeader().then(res => {
      this.languages = res;
    });
  }

  setLanguage(language: Language) {
    if (language.name) {
      this.preferredLanguage.setLanguage(language.name);
      this.closePopup();
    }
  }

  closePopup() {
    this.close.emit();
  }
}
