import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TmplComponent } from './tmpl.component';
import { TmplListComponent } from './list/tmpl-list.component';
import { TmplFormComponent } from './form/tmpl-form.component';

const routes: Routes = [
  {
    path: '',
    component: TmplComponent,
    children: [
      { path: '', redirectTo: 'page', pathMatch: 'full' },
      { path: 'page', component: TmplListComponent },
      { path: 'form', component: TmplFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TmplRoutingModule { }
