import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  projects: Project[] = [];

  constructor(private project: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.project.getAllProjects().then((res) => {
      this.projects = res;
    });
  }

  drop(ev: CdkDragDrop<Project>) {
    moveItemInArray(this.projects, ev.previousIndex, ev.currentIndex);
    this.saveOrder();
  }

  saveOrder() {
    this.project.saveOrder(this.projects.filter((x) => x.id).map((x) => x.id!));
  }
}
