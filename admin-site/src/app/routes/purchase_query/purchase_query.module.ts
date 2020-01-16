import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { PurchaseQueryRoutingModule } from './purchase_query-routing.module';
import { PurchaseQueryComponent } from './purchase_query.component';

import { PurchaseQueryListComponent } from './list/purchase_query-list.component';

import { PurchaseQueryService } from './purchase_query.service';

@NgModule({
  imports: [
    SharedModule,
    PurchaseQueryRoutingModule
  ],
  declarations: [
    PurchaseQueryComponent,
    PurchaseQueryListComponent
  ],
  providers: [
    PurchaseQueryService,

  ],
})
export class PurchaseQueryModule { }
