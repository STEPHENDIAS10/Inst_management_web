import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css'],
})
export class CourseCreateComponent implements OnInit {
  courseCreateForm: FormGroup;
  courseId: string;
  public instituteId = ' ';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('instituteId');
    this.instituteId = id;
    this.courseCreateForm = this.fb.group({
      courseName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._,-/]{3,50}')] ],
      duration: ['', [Validators.required, Validators.pattern('[0-9]{1,2}')]],
      value: ['', Validators.required],
      fees: ['', [Validators.required, Validators.pattern('^[0-9]*')]],
    });
  }

  get courseNameValidate() {
    return this.courseCreateForm.get('courseName');
  }

  get durationValidate() {
    return this.courseCreateForm.get('duration');
  }

  get valueValidate() {
    return this.courseCreateForm.get('value');
  }

  get feesValidate() {
    return this.courseCreateForm.get('fees');
  }

  cancel() {
    this.router.navigate(['./dashboard/course/list']);
  }


  createCourse() {
    const data = {
      courseName: this.courseCreateForm.get('courseName').value,
      duration: this.courseCreateForm.get('duration').value,
      value: this.courseCreateForm.get('value').value,
      fees: this.courseCreateForm.get('fees').value,
      Institute_id: this.instituteId,
    };

    this.courseService.courseCreate(data).subscribe(
      (response: any) => {
        this.createNotification('success', 'Success', 'Course created Successfully', 'topRight');
        this.router.navigate(['/dashboard/course/list']);
      },
      (error) => {
        this.createNotification('error', 'Error', 'Error in course creation', 'topRight');
        // console.log(error);
      }
    );
  }

  createNotification(type, title, message, position) {
    this.notification.create(
      type,
      title,
      message,
       { nzPlacement: 'topRight' }
    );
  }
}
