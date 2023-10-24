import { Component, Input } from '@angular/core';
import { Content } from 'src/app/interfaces/content';

@Component({
  selector: 'app-html-content',
  templateUrl: './html-content.component.html',
  styleUrls: ['./html-content.component.scss']
})
export class HtmlContentComponent {
  @Input() content!: Content;

}
