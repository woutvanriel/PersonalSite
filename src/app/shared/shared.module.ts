import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MediaPipe } from '../pipes/media.pipe';

@NgModule({
  declarations: [MediaPipe],
  imports: [ReactiveFormsModule, FormsModule],
  exports: [ReactiveFormsModule, FormsModule, MediaPipe],
})
export class SharedModule {}
