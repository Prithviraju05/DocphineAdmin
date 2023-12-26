import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormsService } from 'src/app/services/forms.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss']
})
export class AddCityComponent implements OnInit {

  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];
  IsActiveList = [
    { id: 1, value: 'true' },
    { id: 0, value: 'false' },
  ];
  errorMessage: any;

  constructor(
    public formsService: FormsService,
    public apiService: ApiService,
    private dialogRef: MatDialogRef<AddCityComponent>,
    public router: Router,
    public location: Location
  ) { }
  ngOnInit(): void {
    this.getCountryList();
  }

  getCountryList() {
    let apiPath = 'country';
    this.apiService.getDashboardData(apiPath).subscribe((data) => {
      console.log(data);
      // this.countryInfo = [data];
      this.countryInfo = data;
      console.log(this.countryInfo);
      if (['Update'].includes(this.formsService.cityForm.controls['updateButton'].value)) {
        this.getStateList(this.formsService.cityForm.controls['CountryID'].value);
        // this.formsService.cityForm.controls['StateID'].setValue(this.formsService.cityForm.controls['StateID'].value)
      }
    }, (err) => {
      this.handleError(err);
    })
  }

  getStateList(countryID: any) {
    console.log(countryID);
    
    let apiPath = 'state/' + countryID;
    this.apiService.getDashboardData(apiPath).subscribe((data) => {
      console.log(data);
      // this.stateInfo = [data];
      this.stateInfo = [data];
      console.log(this.stateInfo);
    }, (err) => {
      this.handleError(err);
    })
  }

  onChangeCountry(countryID: any) {
    console.log(countryID);
    this.stateInfo = [];
    this.formsService.cityForm.controls['StateID'].setValue(null);
    this.formsService.cityForm.controls['CityName'].setValue(null);
    this.getStateList(countryID);
  }

  onChangeState(stateID: any) {
    console.log(stateID);
    this.getStateList(stateID);
    // this.cityInfo = this.stateInfo[stateID].Cities;
    console.log(this.cityInfo);
  }

  onSubmitClick() {
    if (this.formsService.cityForm.invalid) return;

    console.log('statee', this.formsService.cityForm);

    let apiPath = 'city';
    let body = {
      "CountryID": this.formsService.cityForm.controls['CountryID'].value,
      "StateID": this.formsService.cityForm.controls['StateID'].value,
      "CityName": this.formsService.cityForm.controls['CityName'].value,
      // "CreatedBy": this.formsService.cityForm.controls['CreatedBy'].value,
      // "CreatedDate": this.formsService.cityForm.controls['CreatedDate'].value,
      // "UpdatedBy": this.formsService.cityForm.controls['UpdatedBy'].value,
      // "UpdatedDate": this.formsService.cityForm.controls['UpdatedDate'].value,
      "IsActive": this.formsService.cityForm.controls['IsActive'].value
    }
    console.log('body', body);
    this.apiService.submitDataAPI(apiPath, body).subscribe((res: any) => {
      console.log(res);
      this.formsService.initializeStateFormGroup();
      this.dialogRef.close();
      this.refresh();
      // this.getStateList();
    }, (err) => {
      this.handleError(err);
    })

  }

  onUpdateClick(stateID: number) {
    if (this.formsService.cityForm.invalid) return;
    let apiPath = 'city/' + stateID;

    let body = {
      "CountryID": this.formsService.cityForm.controls['CountryID'].value,
      "StateID": this.formsService.cityForm.controls['StateID'].value,
      "CityName": this.formsService.cityForm.controls['CityName'].value,
      // "CreatedBy": this.formsService.cityForm.controls['CreatedBy'].value,
      // "CreatedDate": this.formsService.cityForm.controls['CreatedDate'].value,
      // "UpdatedBy": this.formsService.cityForm.controls['UpdatedBy'].value,
      // "UpdatedDate": this.formsService.cityForm.controls['UpdatedDate'].value,
      "IsActive": this.formsService.cityForm.controls['IsActive'].value
    }

    this.apiService.updateDataAPI(apiPath, body).subscribe((res: any) => {
      console.log(res);
      this.formsService.initializeCountryFormGroup();
      this.refresh();
      // this.getStateList();
      this.dialogRef.close();
    }, (err) => {
      this.handleError(err);
    })
  }

  handleError(error: any) {
    console.log(error);
    if (error.status === 409) {
      console.log(error.error.message);
      this.errorMessage = error.error.message;
      this.formsService.cityForm.controls['StateID'].setErrors({ stateNameExist: error.error.message });
    }else if (error.status === 404) {
      // alert(error.error.message);
      this.errorMessage = error.error.message;
      console.log(this.errorMessage);
      this.formsService.cityForm.controls['StateID'].setErrors({ stateNameExist: error.error.message });
    }else {
      if (error && error.error && error.error.message) {
        alert(error.error.message);
      } else {
        alert("Please Try again later..");
      }
    }
  }

  refresh() {
    this.router.navigateByUrl("/city", { skipLocationChange: true }).then(() => {
      // alert(decodeURI(this.location.path()));
      this.router.navigate([decodeURI(this.location.path())]);
    })
  }
}