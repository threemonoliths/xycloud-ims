import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchaseContractComponent } from './purchase_contract.component';
import { PurchaseContractFormComponent } from './form/purchase_contract-form.component';
import { PurchaseContractListComponent } from './list/purchase_contract-list.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseContractComponent,
    children: [
      { path: '', redirectTo: 'page', pathMatch: 'full' },
      { path: 'page', component: PurchaseContractListComponent },
      { path: 'form', component: PurchaseContractFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseContractRoutingModule { }
