import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { UserPasswordRoutingModule } from './user-password-routing.module';

import { UserPasswordComponent } from './user-password.component';
import { UserPasswordService } from './user-password.service';

@NgModule({
  imports: [SharedModule, UserPasswordRoutingModule],
  declarations: [UserPasswordComponent],
  providers: [
    UserPasswordService,
  ],
})
export class UserPasswordModule { }
