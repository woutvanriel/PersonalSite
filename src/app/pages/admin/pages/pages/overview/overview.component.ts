import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/interfaces/page';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  Pages: Page[] = [];

  constructor(private Page: PageService) {}

  ngOnInit(): void {
    this.getPages();
  }

  getPages() {
    this.Page.getAllPages().then((res) => {
      this.Pages = res;
    });
  }

  drop(ev: CdkDragDrop<Page>) {
    moveItemInArray(this.Pages, ev.previousIndex, ev.currentIndex);
    this.saveOrder();
  }

  saveOrder() {
    this.Page.saveOrder(this.Pages.filter((x) => x.id).map((x) => x.id!));
  }
}
