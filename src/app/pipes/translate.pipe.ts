import { Pipe, PipeTransform } from '@angular/core';
import * as translations from '../translations/translations.json';
import { PreferredLanguageService } from '../services/preferred-language.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  constructor(
    private preferredLanguage: PreferredLanguageService
  ) { }


  transform(value: string): string {
    const currLocale =
      translations[this.preferredLanguage.language as keyof typeof translations];
    const val = currLocale[value as keyof typeof currLocale];
    return val;
  }

}
