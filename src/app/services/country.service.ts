import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  readonly baseURL = 'http://localhost:3000/api/country/';
  apiURL: string = 'http://18.234.67.134:3000';
  url: string = "https://raw.githubusercontent.com/sagarshirbhate/Country-State-City-Database/master/Contries.json";

  constructor(private http: HttpClient) {}
  
  deleteCountry(id: any) {
    console.log('http://localhost:3000/DeleteCountry/' + id);
    return this.http.delete('http://localhost:3000/DeleteCountry/' + id)
  }

  insertCountry(cntry: any) {
    const country = {
      "CountryID": cntry.CountryID == 0 ? 0 : cntry.CountryID,
      "CountryName": cntry.CountryName,
      "CreatedBy": 1,
      "CreatedDate": "2020-06-25",
      "UpdateBy": 1,
      "UpdateDate": "2020-06-25",
      "IsActive": cntry.IsActive
    }
    this.http.post<Array<any>>('http://localhost:3000/api/country/', country).subscribe(data => {
    });
  }

  updateData(apiURL: string, body: any) {
    return this.http.post(`${this.baseURL}/${apiURL}`, body, options);
  }

  getCountryData(apiPath: string, auth_token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.get(`${this.apiURL}/${apiPath}`, { headers: headers })
  }

  getCoutnries(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/country');
  }
  
  allCountries(): Observable<any> {
    return this.http.get(this.url);
  }
}
