import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPasswordComponent } from './user-password.component';

const routes: Routes = [
  {
    path: '',
    component: UserPasswordComponent,
    children: [
      { path: 'password', component: UserPasswordComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPasswordRoutingModule { }
