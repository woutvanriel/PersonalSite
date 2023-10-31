import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContentType } from 'src/app/interfaces/content';
import { ProjectContent } from 'src/app/interfaces/project-content';
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

  getTypeValue(val: ContentType | null) {
    if (!val) return '';
    return ContentType[val];
  }

  drop(ev: CdkDragDrop<ProjectContent>) {
    moveItemInArray(this.content, ev.previousIndex, ev.currentIndex);
    this.projectContent.saveOrder(this.content.map((c) => c.id!));
  }
}
