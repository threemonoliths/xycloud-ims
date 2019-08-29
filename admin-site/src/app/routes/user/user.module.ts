import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user.component';
import { UserListComponent } from './list/user-list.component';
import { UserFormComponent } from './form/user-form.component';
import { UserService } from './user.service';

@NgModule({
  imports: [SharedModule, UserRoutingModule],
  declarations: [UserComponent, UserListComponent, UserFormComponent],
  providers: [
    UserService,
  ],
})
export class UserModule { }
