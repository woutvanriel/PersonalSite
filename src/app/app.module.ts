import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from './components/alert/alert.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LanguageInterceptor } from './interceptors/language.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './pages/admin/interceptors/auth.interceptor';
import { MediaPipe } from './pipes/media.pipe';
import { TranslatePipe } from './pipes/translate.pipe';

@NgModule({
  declarations: [AppComponent, AlertComponent, ConfirmComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LanguageInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideClientHydration()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
