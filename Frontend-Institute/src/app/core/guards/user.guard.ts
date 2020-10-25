import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
    private readonly router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (state.url.split('/').includes('dashboard')) {
      return this.checkForDashboard();
    } else {
      return this.checkForUserOnly();
    }
  }

  checkForDashboard(): boolean {
    const ownerId = localStorage.getItem('ownerId');
    const instituteId = localStorage.getItem('instituteId');
    if (ownerId && instituteId) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

  checkForUserOnly(): boolean {
    const ownerId = localStorage.getItem('ownerId');
    if (ownerId) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
