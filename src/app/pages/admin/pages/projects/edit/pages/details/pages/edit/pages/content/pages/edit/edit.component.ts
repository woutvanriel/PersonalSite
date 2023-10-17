import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentFromPartial, ProjectContentType } from 'src/app/interfaces/project-content';
import { AlertService } from 'src/app/services/alert.service';
import { ConfirmService } from 'src/app/services/confirm.service';
import { ProjectContentService } from 'src/app/services/project-content.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
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
    private confirm: ConfirmService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ar.params.subscribe((params) => {
      if (params['id'] !== 'new') {
        this.Form.controls.id.setValue(params['id']);
        this.getContent();
      }
    });
    this.ar.parent?.parent?.parent?.params.subscribe(params => {
      if (params['id']) {
        this.Form.controls.detail.setValue(params['id']);
      }
    });
  }

  getContent() {
    if (this.Form.controls.id.value) this.content.getContent(this.Form.controls.id.value).then(res => {
      this.Form.patchValue({
        type: res.type,
        content: res.content,
      });
    });
  }

  getTypeValues() {
    return Object.keys(ProjectContentType).filter(
      (type) => isNaN(type as any) && type !== 'values',
    );
  }

  change(ev: Event) {
    const target = ev.target as HTMLInputElement;
    if (target.files && target.files.length > 0 && this.Form.controls.id.value) {
      const file = target.files[0];
      const data = new FormData();
      data.append('file', file);
      data.append('id', this.Form.controls.id.value);
      this.content.uploadImage(data).then(res => {
        this.getContent();
      });
    }
  }

  save() {
    if (this.Form.valid) {
      if (!this.Form.value.id) this.content.addContent(ContentFromPartial(this.Form.value)).then(res => {
        this.router.navigate(['..', res], { relativeTo: this.ar });
      });
      else this.content.editContent(ContentFromPartial(this.Form.value)).then(res => {
        this.alert.show('Content opgeslagen.');
      });
    }
  }

  deleteContent() {
    const id = this.Form.controls.id.value;
    if (id) this.confirm.show('Weet je zeker dat je dit content item wilt verwijderen?').then(res => {
      if (res) this.content.deleteContent(id).then(() => {
        this.alert.show('Content verwijderd.');
        this.router.navigate(['..'], { relativeTo: this.ar });
      });
    });
  }
}
