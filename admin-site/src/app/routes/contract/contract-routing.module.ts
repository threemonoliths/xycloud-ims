import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractComponent } from './contract.component';
import { ContractFormComponent } from './form/contract-form.component';
import { ContractListComponent } from './list/contract-list.component';

const routes: Routes = [
  {
    path: '',
    component: ContractComponent,
    children: [
      { path: '', redirectTo: 'page', pathMatch: 'full' },
      { path: 'page', component: ContractListComponent },
      { path: 'form', component: ContractFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
