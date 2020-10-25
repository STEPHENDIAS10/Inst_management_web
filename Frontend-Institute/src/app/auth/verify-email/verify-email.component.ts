import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { REGEX } from 'src/app/shared/constants';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  verifyForm: FormGroup;
  typePassword = 'Enter code';
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.verifyForm = this.fb.group({
      code: ['', [Validators.required]]
    });
  }

  onClick(){

  }

  onVerifyClick(){

  }
  get code() {
    return this.verifyForm.get('code');
  }

}
