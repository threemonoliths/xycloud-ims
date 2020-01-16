import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesQueryComponent } from './sales_query.component';

import { SalesQueryListComponent } from './list/sales_query-list.component';

const routes: Routes = [
  {
    path: '',
    component: SalesQueryComponent,
    children: [
      { path: '', redirectTo: 'page', pathMatch: 'full' },
      { path: 'page', component: SalesQueryListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesQueryRoutingModule { }