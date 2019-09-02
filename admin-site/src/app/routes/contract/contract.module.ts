import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractComponent } from './contract.component';

import { ContractFormComponent } from './form/contract-form.component';
import { ContractListComponent } from './list/contract-list.component';

import { ContractService } from './contract.service';
import { ProjectService } from '../project/project.service';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    ContractRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    ContractComponent,
    ContractFormComponent,
    ContractListComponent
  ],
  providers: [
    ContractService,
    ProjectService,
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ContractModule { }
