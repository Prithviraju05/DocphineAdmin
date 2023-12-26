import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // apiURL: string = 'http://18.234.67.134:3000';
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNSwicm9sZSI6InN1cGVyYWRtaW4iLCJmaXJzdF9uYW1lIjoic3VwZXIiLCJsYXN0X25hbWUiOiJhZG1pbiIsImlhdCI6MTY5OTIwMDI2Mn0.tNMOPbhiucHb29PkvkpqGDehF9oFPB7fUvLiOZGjYho';

  constructor(private http: HttpClient) {}

  getDashboardData(apiPath: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.get(`${environment.apiUrl}/${apiPath}`, { headers: headers })
  }

  submitDataAPI(apiPath:string, body:any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.post(`${environment.apiUrl}/${apiPath}`, body, { headers: headers });
  }

  updateDataAPI(apiPath:string, body:any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    return this.http.put(`${environment.apiUrl}/${apiPath}`, body, { headers: headers });
  }

  deleteData(apiPath : string) {
    console.log(apiPath);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    // console.log(this.http.delete(`${environment.apiUrl}/${apiPath}`, { headers: headers }));
    return this.http.delete(`${environment.apiUrl}/${apiPath}`, { headers: headers });
  }
}
