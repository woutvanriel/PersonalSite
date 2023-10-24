import { Component, Input } from '@angular/core';
import { Content } from 'src/app/interfaces/content';

@Component({
  selector: 'app-text-content',
  templateUrl: './text-content.component.html',
  styleUrls: ['./text-content.component.scss']
})
export class TextContentComponent {
  @Input() content!: Content;

}
