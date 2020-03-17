import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { ResourceRoutingModule } from './resource-routing.module';
import { ResourceComponent } from './resource.component';

import { ResourceListComponent } from './list/resource-list.component';
import { ResourceFormComponent } from './form/resource-form.component';

import { ResourceService } from './resource.service';
import { ContractService } from '../contract/contract.service';
import { ClientService } from '../client/client.service';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    ResourceRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    ResourceComponent,
    ResourceListComponent,
    ResourceFormComponent
  ],
  providers: [
    ResourceService,
    ContractService,
    ClientService
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ResourceModule { }
