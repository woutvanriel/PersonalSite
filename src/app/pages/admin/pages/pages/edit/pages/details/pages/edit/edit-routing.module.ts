import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit.component';
import { GeneralComponent } from './pages/general/general.component';
import { ContentComponent } from './pages/content/content.component';

const routes: Routes = [
  {
    path: '',
    component: EditComponent,
    children: [
      {
        path: '',
        component: GeneralComponent,
      },
      {
        path: 'content',
        loadChildren: () => import('./pages/content/content.module').then(m => m.ContentModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRoutingModule {}
