import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectDetails } from 'src/app/interfaces/project-details';
import { ProjectDetailService } from 'src/app/services/project-detail.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  details: ProjectDetails[] = [];
  projectId: string | undefined;

  constructor(
    private projectDetail: ProjectDetailService,
    private ar: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.ar.parent?.parent?.parent?.params.subscribe((params) => {
      console.log(params);
      this.projectId = params['id'];
      this.getDetails();
    });
  }

  getDetails() {
    if (this.projectId)
      this.projectDetail.getDetails(this.projectId).then((res) => {
        this.details = res;
      });
  }
}
