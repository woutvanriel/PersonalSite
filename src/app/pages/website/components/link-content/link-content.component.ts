import { Component, Input } from '@angular/core';
import { Content } from 'src/app/interfaces/content';

@Component({
  selector: 'app-link-content',
  templateUrl: './link-content.component.html',
  styleUrls: ['./link-content.component.scss']
})
export class LinkContentComponent {
  @Input() content!: Content;

  externalLink(url: string | undefined | null) {
    return url?.startsWith('http');
  }
}
