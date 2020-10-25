import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'course', pathMatch: 'full' },
      { path: 'course', loadChildren: () => import(`src/app/dashboard/course/course.module`).then(m => m.CourseModule) },
      { path: 'student', loadChildren: () => import(`src/app/dashboard/student/student.module`).then(m => m.StudentModule) },
      { path: 'institute', loadChildren: () => import(`src/app/dashboard/institute/institute.module`).then(m => m.InstituteModule) },
      { path: 'user', loadChildren: () => import(`src/app/dashboard/user/user.module`).then(m => m.UserModule) },
      { path: 'login', loadChildren: () => import(`src/app/auth/login/login.component`).then(m => m.LoginComponent) }      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
