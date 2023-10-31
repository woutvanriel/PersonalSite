import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageDetails } from 'src/app/interfaces/page-details';
import { PageDetailService } from 'src/app/services/page-detail.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  details: PageDetails[] = [];
  PageId: string | undefined;

  constructor(
    private PageDetail: PageDetailService,
    private ar: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.ar.parent?.parent?.parent?.params.subscribe((params) => {
      this.PageId = params['id'];
      this.getDetails();
    });
  }

  getDetails() {
    if (this.PageId)
      this.PageDetail.getDetails(this.PageId).then((res) => {
        this.details = res;
      });
  }
}
