import { Component, Input } from '@angular/core';
import { Content } from 'src/app/interfaces/content';

@Component({
  selector: 'app-image-content',
  templateUrl: './image-content.component.html',
  styleUrls: ['./image-content.component.scss']
})
export class ImageContentComponent {
  @Input() content!: Content;

}
