import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Language } from 'src/app/interfaces/language';
import { Page } from 'src/app/interfaces/page';
import { LanguageService } from 'src/app/services/language.service';
import { PageService } from 'src/app/services/page.service';
import { PreferredLanguageService } from 'src/app/services/preferred-language.service';
import { ChangeLanguageComponent } from '../change-language/change-language.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  pages: Page[] = [];
  languages: Language[] = [];
  subscription: Subscription | undefined;

  constructor(
    private page: PageService,
    private language: LanguageService,
    private preferredLanguage: PreferredLanguageService,
    private overlay: Overlay
  ) {}

  ngOnInit(): void {
    this.getPages();
    this.getLanguages();
    this.subscription = this.preferredLanguage.languageChanged.subscribe(() => {
      this.getPages();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getPages() {
    this.page.getPagesHeader().then(res => {
      this.pages = res;
    });
  }

  getLanguages() {
    this.language.getLanguagesHeader().then(res => {
      this.languages = res;
    });
  }

  getLanguage() {
    const flag = this.languages.find(x => x.name === this.preferredLanguage.language)?.flag;
    return flag ? flag : '';
  }

  openLanguagePopup() {
    const overlay = this.overlay.create();
    const overlayPortal = new ComponentPortal(ChangeLanguageComponent);
    const componentRef = overlay.attach(overlayPortal);
    const subscription = componentRef.instance.close.subscribe((res) => {
      subscription.unsubscribe();
      if (!!overlay) {
        overlay.detach();
      }
    });
  }
}
