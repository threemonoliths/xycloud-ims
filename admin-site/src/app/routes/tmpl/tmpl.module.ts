import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { TmplRoutingModule } from './tmpl-routing.module';
import { TmplComponent } from './tmpl.component';

import { TmplListComponent } from './list/tmpl-list.component';
import { TmplFormComponent } from './form/tmpl-form.component';

import { TmplService } from './tmpl.service';

@NgModule({
  imports: [SharedModule, TmplRoutingModule],
  declarations: [TmplComponent, TmplListComponent, TmplFormComponent],
  providers: [
    TmplService,
  ],
})
export class TmplModule { }
