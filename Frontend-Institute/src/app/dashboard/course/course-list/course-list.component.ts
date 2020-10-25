import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  courses = [];
  public instituteId = ' ';
  disableCourse = false;

  constructor(
    private router: Router,
    private courseService: CourseService,
    private notification: NotificationService,
  ) {}

  ngOnInit(): void {
    this.instituteId = localStorage.getItem('instituteId');
    if (this.instituteId) {
      this.getCourses();
    } else {
      this.router.navigate(['/']);
    }
  }

  getCourses() {
    this.courseService.getCourses(this.instituteId).subscribe(
      (response: any) => {
        this.courses = response.course;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  addCourse() {
    this.router.navigate(['./dashboard/course/create']);
  }

  editCourse(courseId) {
    this.router.navigate(['./dashboard/course/update/', courseId]);
  }

  deleteCourse(courseId) {
    this.courseService.deleteCourse(courseId).subscribe(
      (response: any) => {
        this.notification.createNotification('success', 'Success', 'Course deleted Successfully', 'topRight');
        this.getCourses();
      },
      (error) => {
        this.notification.createNotification('error', 'Error', 'Error in deleting course', 'topRight');
        // console.log(error);
      }
    );
  }
}
