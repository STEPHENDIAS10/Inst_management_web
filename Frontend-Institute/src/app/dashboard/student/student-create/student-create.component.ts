import { StudentService } from './../services/student.service';
import { CourseService } from '../../course/services/course.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css'],
})
export class StudentCreateComponent implements OnInit {
  studentRegistrationForm: FormGroup;

  Courses: any = [];
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  selectedItems: any = [];
  dropdownSettings: IDropdownSettings = {};
  instituteId;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private notification: NotificationService,
  ) { }

  ngOnInit() {
    this.instituteId = localStorage.getItem('instituteId');
    this.buildForm();
    this.getCourses();
    this.createDropDownSettings();
  }

  buildForm() {
    this.studentRegistrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      courses: [this.selectedItems, Validators.required],
    });
  }

  createDropDownSettings() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };
  }

  get firstName() {
    return this.studentRegistrationForm.get('firstName');
  }

  get lastName() {
    return this.studentRegistrationForm.get('lastName');
  }

  get email() {
    return this.studentRegistrationForm.get('email');
  }

  get courses() {
    return this.studentRegistrationForm.get('courses');
  }

  cancel() {
    this.studentRegistrationForm.reset({
      firstName: '',
      lastName: '',
      email: '',
      courses: '',
    });
    this.router.navigate(['./dashboard/student/list']);
  }

  register() {
    const student = {
      firstname: this.studentRegistrationForm.get('firstName').value,
      lastname: this.studentRegistrationForm.get('lastName').value,
      email: this.studentRegistrationForm.get('email').value,
      courses: this.studentRegistrationForm.get('courses').value,
      instituteId: this.instituteId
    };

    this.studentService.createStudent(student).subscribe(
      (response: any) => {
        this.notification.createNotification('success', 'Success', 'Created Successfully', 'topRight');
        this.router.navigate(['./dashboard/student/list']);
      },
      (error) => {
        this.notification.createNotification('error', 'Error', 'Error in creating student', 'topRight');
      }
    );
  }

  getCourses() {
    const instId = localStorage.getItem('instituteId');
    this.courseService.getCourses(instId).subscribe(
      (response: any) => {
        const data = [];
        for (let i = 0; i < response.courseNameData.length; i++) {
          data[i] = { item_id: i, item_text: response.courseNameData[i] };
        }
        this.Courses = data;
      },
      (error) => {
      }
    );
  }


}
