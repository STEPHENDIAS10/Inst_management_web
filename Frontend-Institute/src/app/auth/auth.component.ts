import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    const instId = localStorage.getItem('ownerId');
    const ownerId = localStorage.getItem('ownerId');
    if (instId && ownerId) {
      this.router.navigate(['/dashboard']);
    }
  }


}
