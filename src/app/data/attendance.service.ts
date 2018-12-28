import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  apiRoot = "http://localhost:3000/attendance"

  constructor(private http:HttpClient){}

  getAttendances(query:any): Observable<any>{
    let url = `${this.apiRoot}/getAttendances`;
    return this.http.post(url,query);
  }
}
