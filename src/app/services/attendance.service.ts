import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  apiRoot = "http://localhost:3000/SicapApi"

  constructor(private http:HttpClient){}

  getAreas(query:any): Observable<any>{
    let url = `${this.apiRoot}/getAreas`;
    return this.http.post(url,query)
  }

  getAttendances(query:any):Observable<any>{
    let url = `${this.apiRoot}/getAttendances`;
    return this.http.post(url,query)
  }

  getAttendanceDetail(query:any):Observable<any>{
    let url = `${this.apiRoot}/getAttendanceDetail`;
    return this.http.post(url,query)
  }

  getEmployees(query:any):Observable<any>{
    let url = `${this.apiRoot}/getEmployees`;
    return this.http.post(url,query)
  }
}
