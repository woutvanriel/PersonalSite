import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';
import { GeneralComponent } from './pages/general/general.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EditComponent, GeneralComponent],
  imports: [CommonModule, EditRoutingModule, SharedModule],
})
export class EditModule {}
