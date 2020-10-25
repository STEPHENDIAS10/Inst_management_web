import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstituteRegisterComponent } from './institute-register/institute-register.component';
import { ProfileUpdateComponent } from './dashboard/user/profile-update/profile-update.component';
import { UserGuard } from './core/guards/user.guard';


const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'new-insitute',
    component: InstituteRegisterComponent,
    canActivate: [UserGuard]
  },
  { path: 'auth', loadChildren: () => import(`src/app/auth/auth.module`).then(m => m.AuthModule) },
  {
    path: 'dashboard',
    loadChildren: () => import(`src/app/dashboard/dashboard.module`).then(m => m.DashboardModule),
    canActivate: [UserGuard]
  },
  {
    path: 'profileupdate',
    component: ProfileUpdateComponent,
    canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
