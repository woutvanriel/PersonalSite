import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguagesRoutingModule } from './languages-routing.module';
import { LanguagesComponent } from './languages.component';


@NgModule({
  declarations: [
    LanguagesComponent
  ],
  imports: [
    CommonModule,
    LanguagesRoutingModule
  ]
})
export class LanguagesModule { }
