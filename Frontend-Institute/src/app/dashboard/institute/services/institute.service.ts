import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstituteService {
  instituteApi = `${environment.api}/institute`;

  constructor(private httpService: HttpService) { }

  getInstitutes(ownerId): Observable<object> {
    return this.httpService.get(`${this.instituteApi}/${ownerId}`);
  }

  getInstitute(instituteId): Observable<object> {
    return this.httpService.get(`${this.instituteApi}/getinstitute/${instituteId}`);
  }

  findInstituteId(data): Observable<object> {
    return this.httpService.post(
      `${this.instituteApi}/findInstituteId`,
      data
    );
  }



  createInstitute(institute): Observable<object> {
    return this.httpService.post(
      `${this.instituteApi}/register`,
      institute
    );
  }

  deleteInstitute(instituteId): Observable<object> {
    return this.httpService.delete(`${this.instituteApi}/${instituteId}`);
  }

  updateInstitute(data): Observable<object> {
    return this.httpService.put(`${this.instituteApi}/${data._id}`, data);
  }
}
