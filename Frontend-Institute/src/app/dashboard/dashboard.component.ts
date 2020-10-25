import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogoutClick() {
    localStorage.clear();
    this.router.navigate(['../auth/login']);
  }

  onCourseClick() {
    this.router.navigate(['/dashboard/course']);
  }

  onStudentClick() {
    this.router.navigate(['/dashboard/student']);
  }

  onInstituteClick() {
    this.router.navigate(['/dashboard/institute']);
  }

  onProfileClick() {
    this.router.navigate(['/dashboard/user']);
  }
}
