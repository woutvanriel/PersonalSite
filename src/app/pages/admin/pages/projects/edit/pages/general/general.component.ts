import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/interfaces/image';
import { ProjectService } from 'src/app/services/project.service';
import { AlertService } from 'src/app/services/alert.service';
import { ConfirmService } from 'src/app/services/confirm.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {
  Form = new FormGroup({
    id: new FormControl<string | null>(null),
    slug: new FormControl<string | null>('', Validators.required),
    title: new FormControl<string | null>('', Validators.required),
  });

  Images: Image[] = [];

  constructor(
    private project: ProjectService,
    private ar: ActivatedRoute,
    private router: Router,
    private alert: AlertService,
    private confirm: ConfirmService,
  ) {}

  ngOnInit(): void {
    this.ar.params.subscribe((params) => {
      if (params['id'] !== 'new') {
        this.Form.controls.id.setValue(params['id']);
        this.getProject();
      }
    });
  }

  getProject() {
    if (this.Form.value.id)
      this.project.getProject(this.Form.value.id).then((res) => {
        this.Form.patchValue({
          slug: res.slug,
          title: res.title,
        });
        this.Images = res.images || [];
      });
  }

  save() {
    this.Form.markAllAsTouched();
    if (this.Form.valid) {
      if (!this.Form.value.id)
        this.project
          .addProject(this.Form.value)
          .then((res) => {
            this.router.navigate(['..', res], { relativeTo: this.ar });
          })
          .catch((err: HttpErrorResponse) => {
            this.alert.show(err.error);
          });
      else
        this.project
          .editProject(this.Form.value)
          .then((res) => {
            this.alert.show('Project is opgeslagen.');
          })
          .catch((err: HttpErrorResponse) => {
            this.alert.show(err.error);
          });
    }
  }

  validateUrl() {
    if (this.Form.controls.slug.value)
      this.Form.controls.slug.setValue(
        encodeURIComponent(
          this.Form.controls.slug.value.trim().replaceAll(' ', '-'),
        ),
      );
  }

  change(ev: Event) {
    const target = ev.target as HTMLInputElement;
    if (this.Form.value.id) {
      if (!target.files || target.files.length < 1) return;
      const data = new FormData();
      data.append('id', this.Form.value.id);
      for (let index = 0; index < target.files.length; index++) {
        const file = target.files[index];
        data.append('file', file);
      }
      this.project.uploadImages(data).then(() => {
        this.getProject();
      });
    }
  }

  deleteImage(imageid: string) {
    if (this.Form.value.id)
      this.project.deleteImage(this.Form.value.id, imageid).then(() => {
        this.getProject();
      });
  }

  deleteProject() {
    const id = this.Form.value.id;
    if (id)
      this.confirm
        .show('Weet je zeker dat je dit project wilt verwijderen?')
        .then((res) => {
          if (res)
            this.project.deleteProject(id).then(() => {
              this.router.navigate(['..'], { relativeTo: this.ar });
            });
        });
  }
}
