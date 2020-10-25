import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { REGEX } from 'src/app/shared/constants';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  emailExample: '< example > @ < mail >.< com >';
  togglePassword = 'visibility';
  disabledPassword = true;
  typePassword = 'password';
  titlebtnDisabled: 'Please enter valid data to enable button';
  titlebtn: 'Click to login';
  title: 'data';
  placement = 'topRight';
  pattern = REGEX;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private notification: NzNotificationService,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(REGEX.EMAIL)]],
      password: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD)]],
    });
  }

  loginData() {
    const loginDataValue = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
    return loginDataValue;
  }

  onLoginClick() {
    this.auth.login(this.loginData()).subscribe((res: any) => {
      this.createNotification('success', 'Success', 'Logged-in Successfully', 'topRight');
      const ownerId = res.user._id;
      localStorage.setItem('ownerId', ownerId);
      if (res.institute) {
        this.router.navigate(['/dashboard']);
        localStorage.setItem('instituteId', res.institute._id);
      } else {
        this.router.navigate(['/new-insitute']);
      }
    }, (err: any) => {
      this.createNotification('error', 'Error', 'Error in login', 'topRight');
      // alert('Error in login');
    });
  }

  onRegisterClick() {
    this.router.navigate(['./auth/register']);
  }

  onForgetPasswordClick() {
    this.router.navigate(['./auth/forgotpass']);
  }


  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  toggle() {
    if (this.disabledPassword === true) {
      this.disabledPassword = false;
      this.togglePassword = 'visibility_off';
      this.typePassword = 'text';
    } else {
      this.disabledPassword = true;
      this.togglePassword = 'visibility';
      this.typePassword = 'password';
    }
  }

  // createNotification(type: string, title: string, message: string): void {
  //   // this.placement = 'topRight';
  //   this.notification.create(
  //     type,
  //     title,
  //     message,
  //     {nzPlacement: 'topRight'}
  //     // { nzPlacement: this.placement }
  //   );
  // }

  createNotification(type, title, message, position) {
    this.notification.create(
      type,
      title,
      message,
       { nzPlacement: 'topRight' }
    );
  }

}
