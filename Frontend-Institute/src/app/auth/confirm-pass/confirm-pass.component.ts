import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { REGEX } from 'src/app/shared/constants';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-pass',
  templateUrl: './confirm-pass.component.html',
  styleUrls: ['./confirm-pass.component.css']
})
export class ConfirmPassComponent implements OnInit {

  confirmPasswordForm: FormGroup;
  emailExample: '< example > @ < mail >.< com >';
  togglePassword = 'visibility';
  disabledPassword = true;
  typePassword = 'password';
  public ownerId = ' ';
  passcheck = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    this.ownerId = id;

    this.confirmPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(REGEX.PASSWORD)]]
    });
  }

  get newPassword() {
    return this.confirmPasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.confirmPasswordForm.get('confirmPassword');
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

  isPassCheck() {
    if (this.confirmPasswordForm.get('newPassword').value === this.confirmPasswordForm.get('confirmPassword').value) {
      return true;
    } else {
      this.passcheck = true;
      return false;
    }
  }

  clearError() {
    this.passcheck = false;
  }

  onClick(){
    if (this.isPassCheck()) {
    const data = {
      _id: this.ownerId,
      password: this.confirmPasswordForm.get('newPassword').value,
    };

    this.auth.confirmPassword(data).subscribe((res: any) => {
      this.router.navigate(['/dashboard/course/list']);
    }, (err: any) => {
      alert('Error in login');
    });
  }
}
}
