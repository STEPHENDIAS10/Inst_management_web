import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CourseService } from '../services/course.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.css']
})
export class CourseUpdateComponent implements OnInit {

  courseUpdateForm: FormGroup;
  public courseId = ' ';
  public instituteId = ' ';
  public course = {
    courseName: '',
    duration: '',
    value: '',
    fees: ''
  };
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private courseService: CourseService,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const instId = localStorage.getItem('instituteId');
    this.courseId = id;
    this.instituteId = instId;

    this.courseService.getCourseData(this.courseId).subscribe((response: any) => {
      this.course = response.course;
      this.setData(response.course);
    }, (error) => {
      console.log(error);
    });

    this.courseUpdateForm = this.fb.group({
      courseName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._,-/]{3,50}')]],
      duration: ['', [Validators.required, Validators.pattern('[0-9]{1,2}')]],
      value: ['', Validators.required],
      fees: ['', [Validators.required, Validators.pattern('^[0-9]*')]]
    });
  }

  setData(course) {
    this.courseUpdateForm.get('courseName').setValue(this.course.courseName);
    this.courseUpdateForm.get('duration').setValue(this.course.duration);
    this.courseUpdateForm.get('value').setValue(this.course.value);
    this.courseUpdateForm.get('fees').setValue(this.course.fees);
  }

  get courseNameValidate() {
    return this.courseUpdateForm.get('courseName');
  }

  get durationValidate() {
    return this.courseUpdateForm.get('duration');
  }

  get valueValidate() {
    return this.courseUpdateForm.get('value');
  }

  get feesValidate() {
    return this.courseUpdateForm.get('fees');
  }
  cancel(){
    this.router.navigate(['./dashboard/course/list']);
  }
  updateCourse(){
    const data = {
      _id : this.courseId,
      courseName : this.courseUpdateForm.get('courseName').value,
      duration : this.courseUpdateForm.get('duration').value,
      value : this.courseUpdateForm.get('value').value,
      fees : this.courseUpdateForm.get('fees').value
    };

    this.courseService.updateCourse(data).subscribe((response: any) => {
      this.notification.createNotification('success', 'Success', 'Course updated Successfully', 'topRight');
      this.router.navigate(['/dashboard/course/list']);

      }, (error) => {
        this.notification.createNotification('error', 'Error', 'Error in course updation', 'topRight');
        // console.log(error);
        // alert(error.error.message);
    });
  }


}
