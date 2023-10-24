import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/interfaces/image';
import { AlertService } from 'src/app/services/alert.service';
import { ConfirmService } from 'src/app/services/confirm.service';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {
  Form = new FormGroup({
    id: new FormControl<string | null>(null),
    slug: new FormControl<string | null>('', Validators.required),
    title: new FormControl<string | null>(null, Validators.required),
  });

  constructor(
    private Page: PageService,
    private ar: ActivatedRoute,
    private router: Router,
    private alert: AlertService,
    private confirm: ConfirmService,
  ) {}

  ngOnInit(): void {
    this.ar.params.subscribe((params) => {
      if (params['id'] !== 'new') {
        this.Form.controls.id.setValue(params['id']);
        this.getPage();
      }
    });
  }

  getPage() {
    if (this.Form.value.id)
      this.Page.getPage(this.Form.value.id).then((res) => {
        this.Form.patchValue({
          slug: res.slug,
        });
      });
  }

  save() {
    this.Form.markAllAsTouched();
    if (this.Form.valid) {
      if (!this.Form.value.id)
        this.Page
          .addPage(this.Form.value)
          .then((res) => {
            this.router.navigate(['..', res], { relativeTo: this.ar });
          })
          .catch((err: HttpErrorResponse) => {
            this.alert.show(err.error);
          });
      else
        this.Page
          .editPage(this.Form.value)
          .then((res) => {
            this.alert.show('Page is opgeslagen.');
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
      this.Page.uploadImages(data).then(() => {
        this.getPage();
      });
    }
  }

  deleteImage(imageid: string) {
    if (this.Form.value.id)
      this.Page.deleteImage(this.Form.value.id, imageid).then(() => {
        this.getPage();
      });
  }

  deletePage() {
    const id = this.Form.value.id;
    if (id)
      this.confirm
        .show('Weet je zeker dat je dit Page wilt verwijderen?')
        .then((res) => {
          if (res)
            this.Page.deletePage(id).then(() => {
              this.router.navigate(['..'], { relativeTo: this.ar });
            });
        });
  }
}
