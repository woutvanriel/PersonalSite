import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Language } from 'src/app/interfaces/language';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  page = 0;
  languages: Language[] = [];
  totalLanguages = 0;

  constructor(
    private language: LanguageService
  ) { }

  ngOnInit(): void {
    this.getLanguages();
    this.countLanguages();
  }

  getLanguages() {
    this.language.getLanguages(this.page).then(res => {
      this.languages = res;
    });
  }

  pageChange(ev: PageEvent) {
    this.page = ev.pageIndex;
    this.getLanguages();
  }

  countLanguages() {
    this.language.countLanguages().then(res => {
      this.totalLanguages = res;
    });
  }
}
