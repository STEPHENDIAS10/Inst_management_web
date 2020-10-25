import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { REGEX } from 'src/app/shared/constants';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css'],
})
export class ForgotPassComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  emailExample: '< example > @ < mail >.< com >';
  togglePassword = 'visibility';
  disabledPassword = true;
  typePassword = 'password';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(REGEX.EMAIL)]],
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  onClick() {
    const data = {
      email: this.forgotPasswordForm.get('email').value,
    };

    this.auth.forgotPassword(data).subscribe(
      (res: any) => {
        alert(res.message);
        this.router.navigate(['./auth/login']);
      },
      (err: any) => {
        alert('Error in Forget Password');
      }
    );
  }
}
