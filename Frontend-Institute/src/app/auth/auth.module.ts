import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { ConfirmPassComponent } from './confirm-pass/confirm-pass.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent, ForgotPassComponent, ConfirmPassComponent, VerifyEmailComponent],
    imports: [CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
