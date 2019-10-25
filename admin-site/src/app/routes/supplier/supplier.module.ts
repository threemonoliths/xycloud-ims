import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';

import { SupplierListComponent } from './list/supplier-list.component';
import { SupplierFormComponent } from './form/supplier-form.component';

import { SupplierService } from './supplier.service';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    SupplierRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    SupplierComponent,
    SupplierListComponent,
    SupplierFormComponent
  ],
  providers: [
    SupplierService,
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class SupplierModule { }
