import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { OverviewComponent } from './overview/overview.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [PagesComponent, OverviewComponent],
  imports: [CommonModule, PagesRoutingModule, DragDropModule],
})
export class PagesModule {}
