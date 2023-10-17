import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { EditComponent } from './pages/edit/edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [ContentComponent, OverviewComponent, EditComponent],
  imports: [CommonModule, ContentRoutingModule, SharedModule, DragDropModule],
})
export class ContentModule {}
