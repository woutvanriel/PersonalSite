import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './pages/login/login.component';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'pages',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./pages/pages/pages.module').then((m) => m.PagesModule),
        canActivate: [adminGuard],
      },
      {
        path: 'languages',
        loadChildren: () =>
          import('./pages/languages/languages.module').then(
            (m) => m.LanguagesModule,
          ),
        canActivate: [adminGuard],
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./pages/projects/projects.module').then(
            (m) => m.ProjectsModule,
          ),
        canActivate: [adminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
