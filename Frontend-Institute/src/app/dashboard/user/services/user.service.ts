import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userApi = `${environment.api}/user`;

  constructor(private httpService: HttpService) {}


  getUser(data): Observable<object> {
    return this.httpService.get(`${this.userApi}/${data}`);
  }

  updateUser(data): Observable<object> {
    return this.httpService.put(`${this.userApi}/`, data);
  }
}
