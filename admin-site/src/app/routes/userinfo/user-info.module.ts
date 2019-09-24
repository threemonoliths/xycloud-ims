import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { UserInfoRoutingModule } from './user-info-routing.module';

import { UserInfoComponent } from './user-info.component';
import { UserInfoService } from './user-info.service';

@NgModule({
  imports: [SharedModule, UserInfoRoutingModule],
  declarations: [UserInfoComponent],
  providers: [
    UserInfoService,
  ],
})
export class UserInfoModule { }
