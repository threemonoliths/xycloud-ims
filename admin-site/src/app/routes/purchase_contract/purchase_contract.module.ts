import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { PurchaseContractRoutingModule } from './purchase_contract-routing.module';
import { PurchaseContractComponent } from './purchase_contract.component';

import { PurchaseContractFormComponent } from './form/purchase_contract-form.component';
import { PurchaseContractListComponent } from './list/purchase_contract-list.component';

import { PurchaseContractService } from './purchase_contract.service';
import { ProjectService } from '../project/project.service';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    PurchaseContractRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    PurchaseContractComponent,
    PurchaseContractFormComponent,
    PurchaseContractListComponent
  ],
  providers: [
    PurchaseContractService,
    ProjectService,
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class PurchaseContractModule { }
