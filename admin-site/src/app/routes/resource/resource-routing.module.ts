import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourceComponent } from './resource.component';

import { ResourceListComponent } from './list/resource-list.component';
import { ResourceFormComponent } from './form/resource-form.component';

const routes: Routes = [
  {
    path: '',
    component: ResourceComponent,
    children: [
      { path: '', redirectTo: 'page', pathMatch: 'full' },
      { path: 'page', component: ResourceListComponent },
      { path: 'form', component: ResourceFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourceRoutingModule { }
