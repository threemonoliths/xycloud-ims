import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { ProjectRoutingModule } from './project-routing.module';

import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './list/project-list.component';
import { ProjectFormComponent } from './form/project-form.component';
import { ProjectService } from './project.service';

@NgModule({
  imports: [SharedModule, ProjectRoutingModule],
  declarations: [ProjectComponent, ProjectListComponent, ProjectFormComponent],
  providers: [
    ProjectService,
  ],
})
export class ProjectModule { }
