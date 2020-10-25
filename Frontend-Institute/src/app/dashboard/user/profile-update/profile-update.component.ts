import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css'],
})
export class ProfileUpdateComponent implements OnInit {
  profileUpdateform: FormGroup;

  userId = '';
  user = {
    firstName: '',
    lastName: '',
    email: '',
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private notification: NotificationService,
  ) {}

  ngOnInit() {

    this.userId = localStorage.getItem('ownerId');

    this.userService.getUser(this.userId).subscribe(
      (response: any) => {
        this.user = response.usersList;
        this.setData(response.usersList);
      },
      (error) => {
      }
    );

    this.profileUpdateform = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  setData(user) {
    this.profileUpdateform.get('firstName').setValue(this.user.firstName);
    this.profileUpdateform.get('lastName').setValue(this.user.lastName);
    this.profileUpdateform.get('email').setValue(this.user.email);
  }

  get firstnamevalidate() {
    return this.profileUpdateform.get('firstName');
  }

  get lastnamevalidate() {
    return this.profileUpdateform.get('lastName');
  }

  get emailvalidate() {
    return this.profileUpdateform.get('email');
  }
  cancel(){
    this.router.navigate(['./dashboard/course/list']);
  }

  updateUser() {
    const data = {
      _id: this.userId,
      firstName: this.profileUpdateform.get('firstName').value,
      lastName: this.profileUpdateform.get('lastName').value,
      email: this.profileUpdateform.get('email').value,
    };

    this.userService.updateUser(data).subscribe((response: any) => {
      this.notification.createNotification('success', 'Success', 'Updated successfully', 'topRight');
      this.router.navigate(['/dashboard/course/list']);
    }, (error) => {
      this.notification.createNotification('error', 'Error', 'Error in updation', 'topRight');
    });
  }

}
