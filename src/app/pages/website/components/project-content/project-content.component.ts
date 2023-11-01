import { Component, Input, OnInit } from '@angular/core';
import { Content } from 'src/app/interfaces/content';
import { Project } from 'src/app/interfaces/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-content',
  templateUrl: './project-content.component.html',
  styleUrls: ['./project-content.component.scss']
})
export class ProjectContentComponent implements OnInit {
  @Input() content!: Content;

  projects: Project[] = [];
  page = 0;
  canloadmore = true;

  constructor(
    private project: ProjectService
  ) { }

  ngOnInit(): void {
    this.getProjecten();
  }

  getProjecten() {
    this.canloadmore = false;
    this.project.getProjectsDetails(this.page).then(res => {
      this.projects = this.projects.concat(res);
      this.page++;
      if (res.length >= 14) this.canloadmore = true;
    });
  }
}
