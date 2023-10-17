import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectContent, ProjectContentType } from 'src/app/interfaces/project-content';
import { ProjectContentService } from 'src/app/services/project-content.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  content: ProjectContent[] = [];
  detailId: string | undefined;

  constructor(
    private projectContent: ProjectContentService,
    private ar: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ar.parent?.parent?.parent?.parent?.params.subscribe(
      (params) => {
        console.log(params);
        this.detailId = params['id'];
        this.getContent();
      }
    );
  }

  getContent() {
    if (this.detailId)
    this.projectContent.getAllContent(this.detailId).then((res) => {
      this.content = res;
    });
  }

  getTypeValue(val: ProjectContentType | null) {
    if (!val) return '';
    return ProjectContentType[val];
  }

  drop(ev: CdkDragDrop<ProjectContent>) {
    moveItemInArray(this.content, ev.previousIndex, ev.currentIndex);
    this.projectContent.saveOrder(this.content.map((c) => c.id!));
  }
}
