import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CountryService } from 'src/app/services/country.service';
import { FormsService } from 'src/app/services/forms.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-disease',
  templateUrl: './add-disease.component.html',
  styleUrls: ['./add-disease.component.scss']
})
export class AddDiseaseComponent implements OnInit {
  IsActiveList = [
    { id: 1, value: 'true' },
    { id: 0, value: 'false' },
  ];
  specializationData: any;
  errorMessage: any;

  constructor(
    public service: CountryService,
    public formsService: FormsService,
    public apiService: ApiService,
    private dialogRef: MatDialogRef<AddDiseaseComponent>,
    public router: Router,
    public location: Location
  ) { }

  ngOnInit(): void {
    this.getCountryList();
  }

  getCountryList() {
    let apiPath = 'specialization';
    this.apiService.getDashboardData(apiPath).subscribe((data) => {
      console.log(data);
      this.specializationData = data;
    }, (err) => {
      this.handleError(err);
    })
  }

  onSubmitClick() {
    if (this.formsService.stateForm.invalid) return;

    console.log('statee', this.formsService.stateForm);

    let apiPath = 'disease';
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
    let apiPath = 'disease/' + stateID;

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
    this.router.navigateByUrl("/disease", { skipLocationChange: true }).then(() => {
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