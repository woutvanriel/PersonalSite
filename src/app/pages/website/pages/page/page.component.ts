import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Page } from 'src/app/interfaces/page';
import { PageService } from 'src/app/services/page.service';
import { PreferredLanguageService } from 'src/app/services/preferred-language.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  page: Page | undefined;
  subscription: Subscription | undefined;

  constructor(
    private pages: PageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: TitleService,
    private preferredLanguage: PreferredLanguageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getPage(params['slug']);
    });
    this.subscription = this.preferredLanguage.languageChanged.subscribe(() => {
      this.activatedRoute.params.subscribe(params => {
        this.getPage(params['slug']);
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getPage(slug: string) {
    this.pages.getPageSlug(slug).then(res => {
      this.page = res;
      this.title.setTitle(res.details?.[0]?.title)
    });
  }
}
