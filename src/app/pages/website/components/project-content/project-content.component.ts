import { Component, Input } from '@angular/core';
import { Content } from 'src/app/interfaces/content';

@Component({
  selector: 'app-project-content',
  templateUrl: './project-content.component.html',
  styleUrls: ['./project-content.component.scss']
})
export class ProjectContentComponent {
  @Input() content!: Content;

}
