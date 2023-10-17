import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details.component';
import { OverviewComponent } from './pages/overview/overview.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsComponent,
    children: [
      {
        path: '',
        component: OverviewComponent,
      },
      {
        path: ':id',
        loadChildren: () =>
          import('./pages/edit/edit.module').then((m) => m.EditModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsRoutingModule {}
