import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courseApi = `${environment.api}/course/`;
  coursedeleteApi = `${environment.api}/course/courseDelete`;


  constructor(
    private http: HttpService
  ) {   }


  courseCreate(data){
    return this.http.post(this.courseApi, data);
  }

  updateCourse(data){
    return this.http.put(this.courseApi, data);
  }

  getCourses(data){
    return this.http.get(this.courseApi + data);
  }

  getCourseData(data): Observable<object> {
    return this.http.get(`${this.courseApi}/courseSearch/${data}`);
  }

  deleteCourse(id){
    return this.http.delete(`${this.coursedeleteApi}/${id}`);
  }
}
