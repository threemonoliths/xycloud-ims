import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { UserListComponent } from './list/user-list.component';
import { UserFormComponent } from './form/user-form.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'page', pathMatch: 'full' },
      { path: 'page', component: UserListComponent },
      { path: 'form', component: UserFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
