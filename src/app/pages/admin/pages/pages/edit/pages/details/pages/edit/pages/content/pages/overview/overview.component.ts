import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContentType } from 'src/app/interfaces/content';
import { PageContent } from 'src/app/interfaces/page-content';
import { PageContentService } from 'src/app/services/page-content.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  content: PageContent[] = [];
  detailId: string | undefined;

  constructor(
    private PageContent: PageContentService,
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
    this.PageContent.getAllContent(this.detailId).then((res) => {
      this.content = res;
    });
  }

  getTypeValue(val: ContentType | null) {
    if (!val) return '';
    return ContentType[val];
  }

  drop(ev: CdkDragDrop<PageContent>) {
    moveItemInArray(this.content, ev.previousIndex, ev.currentIndex);
    this.PageContent.saveOrder(this.content.map((c) => c.id!));
  }
}
