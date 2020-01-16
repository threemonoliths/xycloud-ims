import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseQueryComponent } from './purchase_query.component';

import { PurchaseQueryListComponent } from './list/purchase_query-list.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseQueryComponent,
    children: [
      { path: '', redirectTo: 'page', pathMatch: 'full' },
      { path: 'page', component: PurchaseQueryListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseQueryRoutingModule { }