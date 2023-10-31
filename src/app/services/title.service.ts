import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  setTitle(title: string | null | undefined) {
    if (title) this.document.title = `Wout van Riel - ${title}`;
  }
}
