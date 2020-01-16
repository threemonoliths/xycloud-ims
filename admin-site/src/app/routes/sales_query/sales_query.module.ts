import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { SalesQueryRoutingModule } from './sales_query-routing.module';
import { SalesQueryComponent } from './sales_query.component';

import { SalesQueryListComponent } from './list/sales_query-list.component';

import { SalesQueryService } from './sales_query.service';

@NgModule({
  imports: [
    SharedModule,
    SalesQueryRoutingModule
  ],
  declarations: [
    SalesQueryComponent,
    SalesQueryListComponent
  ],
  providers: [
    SalesQueryService,

  ],
})
export class SalesQueryModule { }
