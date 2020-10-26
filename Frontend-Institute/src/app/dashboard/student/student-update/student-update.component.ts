import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CourseService } from '../../course/services/course.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {

  studentupdateform: FormGroup;

  Courses: any = [];
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  selectedItems: any = [];

  dropdownSettings: IDropdownSettings = {};

  public studId = ' ';
  public student = {
    firstname: '',
    lastname: '',
    email: '',
    courses: [],
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private courseService: CourseService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.studId = id;

    this.studentService.getStudent(this.studId).subscribe((response: any) => {
        this.student = response.student;
        this.setData(response.student);
      }, (error) => {
        console.log(error);
    });

    this.studentupdateform = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      courses: [this.selectedItems, Validators.required],
    });

    this.getCourses();

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

  setData(student) {
    this.studentupdateform.get('firstname').setValue(this.student.firstname);
    this.studentupdateform.get('lastname').setValue(this.student.lastname);
    this.studentupdateform.get('email').setValue(this.student.email);
    this.studentupdateform.get('courses').setValue(this.student.courses);
  }

  get firstnamevalidate() {
    return this.studentupdateform.get('firstname');
  }

  get lastnamevalidate() {
    return this.studentupdateform.get('lastname');
  }

  get emailvalidate() {
    return this.studentupdateform.get('email');
  }

  get coursesvalidate() {
    return this.studentupdateform.get('courses');
  }

  updateStudent(){
    const data = {
      id : this.studId,
      firstname: this.studentupdateform.get('firstname').value,
      lastname: this.studentupdateform.get('lastname').value,
      email: this.studentupdateform.get('email').value,
      courses: this.studentupdateform.get('courses').value
    };

    this.studentService.updateStudent(data).subscribe((response: any) => {
        this.createNotification('success', 'Success', 'Updated Successfully', 'topRight');
        this.router.navigate(['/dashboard/student/list']);
      }, (error) => {
        this.createNotification('error', 'Error', 'Error in Updating', 'topRight');
    });
  }
  cancel() {
    this.router.navigate(['./dashboard/student/list']);
  }

  getCourses(){
    const instId = localStorage.getItem('instituteId');
    if (!instId) {
      this.router.navigate(['/']);
    }
    this.courseService.getCourses(instId).subscribe((response: any) => {
      const data =[];
      for(let i = 0; i < response.courseNameData.length; i++){
         data[i] = {item_id :  i, item_text: response.courseNameData[i] };
      }
      this.Courses = data;
      console.log(this.Courses);
    }, (error) => {
      console.log(error);
    });

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
