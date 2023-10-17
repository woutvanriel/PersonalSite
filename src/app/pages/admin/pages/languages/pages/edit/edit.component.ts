import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageFromPartial } from 'src/app/interfaces/language';
import { AlertService } from 'src/app/services/alert.service';
import { ConfirmService } from 'src/app/services/confirm.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  Form = new FormGroup({
    id: new FormControl<string | null>(null),
    name: new FormControl<string>('', Validators.required),
  });

  imageUrl: string | null = null;

  constructor(
    private language: LanguageService,
    private ar: ActivatedRoute,
    private router: Router,
    private confirm: ConfirmService,
    private alert: AlertService,
  ) {}

  ngOnInit(): void {
    this.ar.params.subscribe((params) => {
      if (params['id'] !== 'new') {
        this.Form.controls.id.setValue(params['id']);
        this.getLanguage();
      }
    });
  }

  getLanguage() {
    if (this.Form.value.id)
      this.language.getLanguage(this.Form.value.id).then((res) => {
        this.Form.patchValue(res);
        this.imageUrl = res.flag || null;
      });
  }

  uploadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length && input.files.length > 0) {
      const file = input.files[0];
      const data = new FormData();
      data.append('file', file);
      if (this.Form.value.id) data.append('id', this.Form.value.id);
      this.language.uploadImage(data).then((res) => {
        this.imageUrl = res;
      });
    }
  }

  deleteFile() {
    if (this.Form.value.id)
      this.language.deleteImage(this.Form.value.id).then(() => {
        this.imageUrl = null;
      });
  }

  save() {
    this.Form.markAllAsTouched();
    if (this.Form.valid) {
      if (this.Form.value.id) {
        this.language
          .editLanguage(LanguageFromPartial(this.Form.value))
          .then(() => {
            this.alert.show('De taal is opgeslagen');
          });
      } else {
        this.language
          .addLanguage(LanguageFromPartial(this.Form.value))
          .then((res) => {
            this.router.navigate(['..', res], { relativeTo: this.ar });
          });
      }
    }
  }

  remove() {
    if (this.Form.value.id) {
      const id = this.Form.value.id;
      this.confirm
        .show('Weet je zeker dat je de taal wilt verwijderen?')
        .then((cont) => {
          if (cont)
            this.language.deleteLanguage(id).then(() => {
              this.router.navigate(['..'], { relativeTo: this.ar });
            });
        });
    }
  }
}
