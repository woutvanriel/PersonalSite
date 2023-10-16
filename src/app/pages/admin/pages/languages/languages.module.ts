import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguagesRoutingModule } from './languages-routing.module';
import { LanguagesComponent } from './languages.component';
import { EditComponent } from './pages/edit/edit.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LanguagesComponent,
    EditComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    LanguagesRoutingModule,
    MatPaginatorModule,
    SharedModule
  ]
})
export class LanguagesModule { }
