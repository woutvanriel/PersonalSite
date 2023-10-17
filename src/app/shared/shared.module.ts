import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { MediaPipe } from '../pipes/media.pipe';

@NgModule({
  declarations: [MediaPipe],
  imports: [ReactiveFormsModule, FormsModule, QuillModule.forRoot()],
  exports: [ReactiveFormsModule, FormsModule, QuillModule, MediaPipe],
})
export class SharedModule {}
