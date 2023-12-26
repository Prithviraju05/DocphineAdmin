import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormsService } from 'src/app/services/forms.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-state',
  templateUrl: './add-state.component.html',
  styleUrls: ['./add-state.component.scss']
})
export class AddStateComponent implements OnInit {

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
    private dialogRef: MatDialogRef<AddStateComponent>,
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
      this.countryInfo = data;
      console.log(this.countryInfo);
    }, (err) => {
      this.handleError(err);
    })
  }

  onChangeCountry(countryValue: any) {
    this.stateInfo = [];
    this.cityInfo = [];
    // this.dropdownForm.controls['state'].setValue(null);
    // this.dropdownForm.controls['city'].setValue(null);

    this.stateInfo = this.countryInfo[countryValue].States;
    this.cityInfo = this.stateInfo[0].Cities;
    console.log(this.cityInfo);
  }

  onChangeState(stateValue: any) {
    this.cityInfo = this.stateInfo[stateValue].Cities;
    console.log(this.cityInfo);
  }

  onSubmitClick() {
    if (this.formsService.stateForm.invalid) return;

    console.log('statee', this.formsService.stateForm);

    let apiPath = 'state';
    let body = {
      "CountryID": this.formsService.stateForm.controls['CountryID'].value,
      "StateName": this.formsService.stateForm.controls['StateName'].value,
      // "CreatedBy": this.formsService.stateForm.controls['CreatedBy'].value,
      // "CreatedDate": this.formsService.stateForm.controls['CreatedDate'].value,
      // "UpdatedBy": this.formsService.stateForm.controls['UpdatedBy'].value,
      // "UpdatedDate": this.formsService.stateForm.controls['UpdatedDate'].value,
      "IsActive": this.formsService.stateForm.controls['IsActive'].value
    }
    console.log('body', body);
    this.apiService.submitDataAPI(apiPath, body).subscribe((res: any) => {
      console.log(res);
      this.formsService.initializeStateFormGroup();
      this.dialogRef.close();
      this.refresh();
    }, (err) => {
      this.handleError(err);
    })

  }

  onUpdateClick(stateID: number) {
    if (this.formsService.stateForm.invalid) return;
    let apiPath = 'state/' + stateID;

    let body = {
      "CountryID": this.formsService.stateForm.controls['CountryID'].value,
      "StateName": this.formsService.stateForm.controls['StateName'].value,
      // "CreatedBy": this.formsService.stateForm.controls['CreatedBy'].value,
      // "CreatedDate": this.formsService.stateForm.controls['CreatedDate'].value,
      // "UpdatedBy": this.formsService.stateForm.controls['UpdatedBy'].value,
      // "UpdatedDate": this.formsService.stateForm.controls['UpdatedDate'].value,
      "IsActive": this.formsService.stateForm.controls['IsActive'].value
    }

    this.apiService.updateDataAPI(apiPath, body).subscribe((res: any) => {
      console.log(res);
      this.formsService.initializeCountryFormGroup();
      this.dialogRef.close();
      this.refresh();
    }, (err) => {
      this.handleError(err);
    })
  }

  refresh() {
    this.router.navigateByUrl("/state", { skipLocationChange: true }).then(() => {
      // alert(decodeURI(this.location.path()));
      this.router.navigate([decodeURI(this.location.path())]);
    })
  }

  handleError(error: any) {
    console.log(error);
    if (error.status === 409) {
      console.log(error.error.message);
      this.errorMessage = error.error.message;
      this.formsService.stateForm.controls['StateName'].setErrors({ stateNameExist: error.error.message });
    } else {
      if (error && error.error && error.error.message) {
        alert(error.error.message);
      } else {
        alert("Please Try again later..");
      }
    }
  }

}