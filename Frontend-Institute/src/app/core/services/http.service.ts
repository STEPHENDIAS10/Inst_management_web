import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  get(url: string): Observable<object> {
    return this.http.get(url);
  }

  post(url: string, body: object): Observable<object> {
    return this.http.post(url, body);
  }

  put(url: string, body: object): Observable<object> {
    return this.http.put(url, body);
  }

  delete(url: string): Observable<object> {
    return this.http.delete(url);
  }
}
