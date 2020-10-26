import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentUpdateComponent } from './student-update/student-update.component';


@NgModule({
  declarations: [StudentComponent, StudentListComponent, StudentCreateComponent, StudentUpdateComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    StudentRoutingModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class StudentModule { }
