import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.scss']
})
export class AddHospitalComponent implements OnInit {
  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];
  IsActiveList = [
    { id: 1, value: 'true' },
    { id: 0, value: 'false' },
  ];

  constructor(
    public service: CountryService,
    public formsService: FormsService
    ) { }
  
  ngOnInit(): void { }

  onFormSubmit() {
    alert('form submitted');
  }

  onSaveClick(){
    console.log('saveee',this.formsService.hospitalForm);
  }
  onUpdateClick(){
    console.log('updateee',this.formsService.hospitalForm);
  }
}