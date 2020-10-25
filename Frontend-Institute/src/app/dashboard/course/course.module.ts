import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseUpdateComponent } from './course-update/course-update.component';


@NgModule({
  declarations: [CourseComponent, CourseListComponent, CourseCreateComponent, CourseUpdateComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CourseModule { }
