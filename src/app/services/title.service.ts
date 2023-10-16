import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor() { }

  setTitle(title: string) {
    document.title = title;
  }
}
