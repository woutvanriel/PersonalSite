import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Language } from 'src/app/interfaces/language';
import { AlertService } from 'src/app/services/alert.service';
import { ConfirmService } from 'src/app/services/confirm.service';
import { LanguageService } from 'src/app/services/language.service';
import {
  DetailFromPartial,
  ProjectDetailService,
} from 'src/app/services/project-detail.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {
  Form = new FormGroup({
    id: new FormControl<string | null>(null),
    language: new FormControl<string | null>(null, Validators.required),
    title: new FormControl<string | null>('', Validators.required),
    description: new FormControl<string | null>(''),
    project: new FormControl<string | null>(null),
  });

  languages: Language[] = [];

  constructor(
    private language: LanguageService,
    private detail: ProjectDetailService,
    private ar: ActivatedRoute,
    private router: Router,
    private alert: AlertService,
    private confirm: ConfirmService,
  ) {}

  ngOnInit(): void {
    this.getLanguages();
    this.ar.parent?.params.subscribe((params) => {
      if (params['id'] !== 'new') {
        this.Form.controls.id.setValue(params['id']);
        this.getDetail();
      }
    });
    this.ar.parent?.parent?.parent?.parent?.parent?.params.subscribe(
      (params) => {
        this.Form.controls.project.setValue(params['id']);
      },
    );
  }

  getDetail() {
    if (this.Form.value.id)
      this.detail.getDetail(this.Form.value.id).then((res) => {
        this.Form.patchValue({
          language: res.language?.id,
          title: res.title,
          description: res.description,
        });
      });
  }

  getLanguages() {
    this.language.getLanguages(0).then((res) => {
      this.languages = res;
    });
  }

  save() {
    this.Form.markAllAsTouched();
    if (this.Form.valid) {
      if (!this.Form.value.id)
        this.detail.addDetail(DetailFromPartial(this.Form.value)).then(() => {
          this.router.navigate(['..'], { relativeTo: this.ar });
        });
      else
        this.detail.editDetail(DetailFromPartial(this.Form.value)).then(() => {
          this.router.navigate(['..'], { relativeTo: this.ar });
        });
    }
  }

  deleteDetail() {
    const id = this.Form.value.id;
    if (id)
      this.confirm
        .show('Weet je zeker dat je dit detail wilt verwijderen?')
        .then((res) => {
          if (res)
            this.detail.deleteDetail(id).then(() => {
              this.router.navigate(['..'], { relativeTo: this.ar });
            });
        });
  }
}
