import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { MediaPipe } from '../pipes/media.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MediaPipe],
  imports: [ReactiveFormsModule, FormsModule, QuillModule.forRoot(), NgbModule],
  exports: [ReactiveFormsModule, FormsModule, QuillModule, MediaPipe, NgbModule],
})
export class SharedModule {}
