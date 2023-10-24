import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { WebsiteComponent } from './website.component';
import { HeaderComponent } from './components/header/header.component';
import { PageComponent } from './pages/page/page.component';
import { ProjectComponent } from './pages/project/project.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangeLanguageComponent } from './components/change-language/change-language.component';
import { ContentContainerComponent } from './components/content-container/content-container.component';
import { TextContentComponent } from './components/text-content/text-content.component';
import { ImageContentComponent } from './components/image-content/image-content.component';
import { HtmlContentComponent } from './components/html-content/html-content.component';
import { LinkContentComponent } from './components/link-content/link-content.component';
import { ProjectContentComponent } from './components/project-content/project-content.component';

@NgModule({
  declarations: [WebsiteComponent, HeaderComponent, PageComponent, ProjectComponent, ChangeLanguageComponent, ContentContainerComponent, TextContentComponent, ImageContentComponent, HtmlContentComponent, LinkContentComponent, ProjectContentComponent],
  imports: [CommonModule, WebsiteRoutingModule, SharedModule],
})
export class WebsiteModule {}
