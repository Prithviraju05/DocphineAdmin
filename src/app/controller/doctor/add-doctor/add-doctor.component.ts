import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CountryService } from 'src/app/services/country.service';
import { FormsService } from 'src/app/services/forms.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {
  hospitalList: any[] = [];
  doctorDetails: any[] = [];
  SpecializationList: any[] = [];
  IsActiveList = [
    { id: 1, value: 'true' },
    { id: 0, value: 'false' },
  ];

  tempData = {"data":{"DoctorDetails":{"Info":[{"DoctorID":1,"AboutMe":"test","AcademicQualification":[{"College":null,"IsPersuing":null,"University":null,"PassoutYear":null}],"ProfessionalExperience":[{"EndDate":null,"Hospital":null,"StartDate":null,"Designation":null,"HospitalAddress":null}],"ServicesProvided":["Gynecologist"],"LanguagesKnown":[null],"Awards":[{"Year":null,"AwardName":null}],"Membership":[null]}],"BookSlot":{"AvailableSlots":[{"AvailableSlotID":1,"HospitalName":"Tapadia Diagnostic Centre","HospitalAddress":"Aurangabad Railway Station, Aurangabad","latitude":"17,56463","longitude":"75.3333","Availability":[{"AvailabilityDay":"Thursday","Fees":300,"StartTime":"2PM","EndTime":"7PM"},{"AvailabilityDay":"Friday","Fees":300,"StartTime":"4PM","EndTime":"9PM"}]},{"AvailableSlotID":1,"HospitalName":"Tapadia Diagnostic Centre","HospitalAddress":"Aurangabad Railway Station, Aurangabad","latitude":"17,56463","longitude":"75.3333","Availability":[{"AvailabilityDay":"Thursday","Fees":300,"StartTime":"2PM","EndTime":"7PM"},{"AvailabilityDay":"Friday","Fees":300,"StartTime":"4PM","EndTime":"9PM"}]},{"AvailableSlotID":1,"HospitalName":"Tapadia Diagnostic Centre","HospitalAddress":"Aurangabad Railway Station, Aurangabad","latitude":"17,56463","longitude":"75.3333","Availability":[{"AvailabilityDay":"Thursday","Fees":300,"StartTime":"2PM","EndTime":"7PM"},{"AvailabilityDay":"Friday","Fees":300,"StartTime":"4PM","EndTime":"9PM"}]}]},"Queries":[],"Reviews":[{"UserId":1,"ImagePath":"","Review":"Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus","IsUseful":100,"Comments":[{"Comment":"Thank You for your feedback"},{"Comment":"Thank You for your feedback"},{"Comment":"Thank You for your feedback"}]},{"UserId":1,"ImagePath":"","Review":"Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus","IsUseful":100,"Comments":[{"Comment":"Thank You for your feedback"},{"Comment":"Thank You for your feedback"},{"Comment":"Thank You for your feedback"}]},{"UserId":1,"ImagePath":"","Review":"Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus","IsUseful":100,"Comments":[{"Comment":"Thank You for your feedback"},{"Comment":"Thank You for your feedback"},{"Comment":"Thank You for your feedback"}]},{"UserId":1,"ImagePath":"","Review":"Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus","IsUseful":100,"Comments":[{"Comment":"Thank You for your feedback"},{"Comment":"Thank You for your feedback"},{"Comment":"Thank You for your feedback"}]}],"Gallery":[{"ImageName":"Image1","ImagePath":"https://images.example.com"},{"ImageName":"Image2","ImagePath":"https://images.example.com"},{"ImageName":"Image3","ImagePath":"https://images.example.com"},{"ImageName":"Image4","ImagePath":"https://images.example.com"},{"ImageName":"Image5","ImagePath":"https://images.example.com"}]}},"message":"User registered successfully"}
  errorMessage: any;

  constructor(
    public service: CountryService,
    public formsService: FormsService,
    public apiService: ApiService,
    private dialogRef: MatDialogRef<AddDoctorComponent>,
    public router: Router,
    public location: Location
  ) { }

  ngOnInit(): void {
    // this.gethospitalList();
    // this.getDoctorDetails();
    // this.getSpecializationList();
    // this.doctorDetails = this.tempData.data;
  }

  getDoctorDetails() {
    let apiPath = 'getDoctorDetails';
    this.apiService.getDashboardData(apiPath).subscribe((data) => {
      console.log(data);
      this.doctorDetails = data;
    }, (err) => {
      this.handleError(err);
    })
  }

  gethospitalList() {
    let apiPath = 'hospital';
    this.apiService.getDashboardData(apiPath).subscribe((data) => {
      console.log(data);
      this.hospitalList = data;
    }, (err) => {
      this.handleError(err);
    })
  }
  getSpecializationList() {
    let apiPath = 'specialization';
    this.apiService.getDashboardData(apiPath).subscribe((data) => {
      console.log(data);
      this.SpecializationList = data;
    }, (err) => {
      this.handleError(err);
    })
  }

  // ----

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