import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { FormsService } from 'src/app/services/forms.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})

export class AddCountryComponent implements OnInit {
  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];
  IsActiveList = [
    { id: 1, value: 'true' },
    { id: 0, value: 'false' },
  ];
  diaRef: any;
  errorMessage: string;

  constructor(
    public formsService: FormsService,
    public apiService: ApiService,
    public dialogService: DialogService,
    private dialogRef: MatDialogRef<AddCountryComponent>,
    public router: Router,
    public location: Location
  ) { }

  ngOnInit(): void { }

  onSubmitClick() {
    if (this.formsService.countryForm.invalid) return;

    let apiPath = 'country';
    let body = {
      "CountryName": this.formsService.countryForm.controls['CountryName'].value,
      "IsActive": this.formsService.countryForm.controls['IsActive'].value,
    }
    this.apiService.submitDataAPI(apiPath, body).subscribe((res: any) => {
      console.log(res);
      this.formsService.initializeCountryFormGroup();
      this.dialogRef.close();
      this.refresh();
    }, (err) => {
      this.handleError(err);
    })

  }

  onUpdateClick(countryID:number) {
    if (this.formsService.countryForm.invalid) return;
    let apiPath = 'country/' + countryID;

    let body = {
      "CountryName": this.formsService.countryForm.controls['CountryName'].value,
      "IsActive": this.formsService.countryForm.controls['IsActive'].value,
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

  handleError(error: any) {
    console.log(error);
    if (error.status === 409) {
      console.log(error.error.message);
      this.errorMessage = error.error.message;
      this.formsService.countryForm.controls['CountryName'].setErrors({ countryNameExist: error.error.message });
    } else {
      if (error && error.error && error.error.message) {
        alert(error.error.message);
      } else {
        alert("Please Try again later..");
      }
    }
  }

  refresh() {
    this.router.navigateByUrl("/country", { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    })
  }

}