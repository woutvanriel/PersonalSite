import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'media',
})
export class MediaPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value || value === '') return 'assets/placeholder.png';
    return `${environment.mediaUrl}/${value}`;
  }
}
