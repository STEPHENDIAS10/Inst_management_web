import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  studentApi = `${environment.api}/student`;

  constructor(private httpService: HttpService) { }

  getStudents(instituteId): Observable<object> {
    return this.httpService.get(`${this.studentApi}/institute/${instituteId}`);
  }

  createStudent(student): Observable<object> {
    return this.httpService.post(`${this.studentApi}`, student);
  }

  deleteStudent(studentId): Observable<object> {
    return this.httpService.delete(`${this.studentApi}/${studentId}`);
  }

  getStudent(studentId): Observable<object> {
    return this.httpService.get(`${this.studentApi}/${studentId}`);
  }

  updateStudent(studentId): Observable<object> {
    return this.httpService.put(`${this.studentApi}`, studentId);
  }
}
