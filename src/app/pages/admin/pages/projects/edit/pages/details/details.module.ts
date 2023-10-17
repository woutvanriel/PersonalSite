import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { OverviewComponent } from './pages/overview/overview.component';

@NgModule({
  declarations: [DetailsComponent, OverviewComponent],
  imports: [CommonModule, DetailsRoutingModule],
})
export class DetailsModule {}
