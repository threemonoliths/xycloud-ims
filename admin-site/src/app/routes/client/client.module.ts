import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';

import { ClientListComponent } from './list/client-list.component';
import { ClientFormComponent } from './form/client-form.component';

import { ClientService } from './client.service';
const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    ClientRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    ClientComponent,
    ClientListComponent,
    ClientFormComponent
  ],
  providers: [
    ClientService
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ClientModule { }
