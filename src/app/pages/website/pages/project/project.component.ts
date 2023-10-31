import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/interfaces/project';
import { PreferredLanguageService } from 'src/app/services/preferred-language.service';
import { ProjectService } from 'src/app/services/project.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  project: Project | undefined;
  subscription: Subscription | undefined;

  constructor(
    private projects: ProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: TitleService,
    private preferredLanguage: PreferredLanguageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getProject(params['slug']);
      this.subscription = this.preferredLanguage.languageChanged.subscribe(() => {
        this.getProject(params['slug']);
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getProject(slug: string) {
    this.projects.getProjectSlug(slug).then(res => {
      this.project = res;
      this.title.setTitle(res.details![0].title!)
    });
  }
}
