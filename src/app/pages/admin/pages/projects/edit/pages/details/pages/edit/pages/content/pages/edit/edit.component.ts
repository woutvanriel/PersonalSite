import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectContentType } from 'src/app/interfaces/project-content';
import { AlertService } from 'src/app/services/alert.service';
import { ConfirmService } from 'src/app/services/confirm.service';
import { ProjectContentService } from 'src/app/services/project-content.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  Form = new FormGroup({
    id: new FormControl<string | null>(null),
    detail: new FormControl<string | null>(null),
    type: new FormControl<ProjectContentType | null>(null),
    content: new FormControl<string | null>(null),
  });

  constructor(
    private ar: ActivatedRoute,
    private content: ProjectContentService,
    private alert: AlertService,
    private confirm: ConfirmService
  ) {}

  getTypeValues() {
    return Object.keys(ProjectContentType).filter(
      (type) => isNaN(type as any) && type !== 'values',
    );
  }
}
