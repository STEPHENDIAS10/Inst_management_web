import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: Student[];
  disablelabel = true;
  instituteId;
  constructor(
    private studentService: StudentService,
    private router: Router,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.instituteId = localStorage.getItem('instituteId');
    this.getStudents();
    if (this.students !== undefined) {
      this.disablelabel = false;
    }
  }

  getStudents(): void {
    this.studentService.getStudents(this.instituteId).subscribe(
      (response: any) => {
        this.students = response.students;
      },
      (error) => {
        alert(error.error.message);
      }
    );
  }

  deleteStudent(id) {
    this.studentService.deleteStudent(id).subscribe(
      (response: any) => {
        this.notification.createNotification('success', 'Success', 'Deleted Successfully', 'topRight');
        this.getStudents();
      },
      (error) => {
        this.notification.createNotification('error', 'Error', 'Error in deleting', 'topRight');
        alert(error.error.message);
      }
    );
  }

  editStudent(id) {
    this.router.navigate(['./dashboard/student/update/' + id]);
  }

  addStudent() {
    this.router.navigate(['/dashboard/student/create']);
  }

}
