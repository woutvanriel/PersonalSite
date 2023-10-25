import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor() {}

  setTitle(title: string | null | undefined) {
    if (title) document.title = `Wout van Riel - ${title}`;
  }
}
