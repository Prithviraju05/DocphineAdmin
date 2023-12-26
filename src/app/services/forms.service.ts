import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  public countryForm: FormGroup;
  public stateForm: FormGroup;
  public cityForm: FormGroup;
  public diseaseForm: FormGroup;
  public doctorForm: FormGroup;
  public hospitalForm: FormGroup;
  public locationForm: FormGroup;
  public specializationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.countryForm = this.formBuilder.group({
      $key: [null],
      CountryID: [null],
      CountryName: ['', Validators.required],
      IsActive: [0],
      updateButton: ['Submit']
    });

    this.stateForm = this.formBuilder.group({
      $key: [null],
      CountryID: [null, Validators.required],
      CountryName: [null],
      StateID: [null],
      StateName: ['', Validators.required],
      IsActive: [0, Validators.required],
      updateButton: ['Submit']
    });

    this.cityForm = this.formBuilder.group({
      $key: [null],
      CountryID: [null, Validators.required],
      CountryName: [null],
      StateID: [null, Validators.required],
      StateName: [null],
      CityID: [null],
      CityName: [null, Validators.required],
      IsActive: [0, Validators.required],
      updateButton: ['Submit']
    });

    this.diseaseForm = this.formBuilder.group({
      DiseaseId: [0],
      SpecializationID: ['', Validators.required],
      Diseasedescription: ['', Validators.required],
      CreatedBy: [null],
      CreatedDate: [null],
      UpdatedBy: [null],
      UpdatedDate: [null],
      IsActive: ['', Validators.required],
      updateButton: ['Submit']
    })
    this.doctorForm = this.formBuilder.group({
      DoctorId: [0],
      HospitalId: ['', Validators.required],
      DoctorName: ['', Validators.required],
      DoctorImage: [null],
      Education: ['', Validators.required],
      SpecializationID: ['', Validators.required],
      Memberships: ['', Validators.required],
      Experience: ['', Validators.required],
      Registration: ['', Validators.required],
      Services: ['', Validators.required],
      Fee: ['', Validators.required],
      LanguageKnown: ['', Validators.required],
      Feedback: ['', Validators.required],
      AboutDoctor: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      CreatedBy: [null],
      UpdatedBy: [null],
      IsActive: [0],
      updateButton: ['Submit']
    });

    this.hospitalForm = this.formBuilder.group({
      HospitalId: [0],
      LocationId: ['', Validators.required],
      CityId: ['', Validators.required],
      StateId: ['', Validators.required],
      CountryId: ['', Validators.required],
      HospitalName: ['', Validators.required],
      Address1: ['', Validators.required],
      Address2: ['', Validators.required],
      Address3: ['', Validators.required],
      Address4: ['', Validators.required],
      Pincode: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      LandlineNumber: ['', Validators.required],
      CreatedBy: [null],
      UpdatedBy: [null],
      IsActive: [null, Validators.required],
      updateButton: ['Submit']
    });

    this.locationForm = this.formBuilder.group({
      LocationId: [0],
      countryid: ['', Validators.required],
      cityid: ['', Validators.required],
      stateid: ['', Validators.required],
      Locationname: [null, Validators.required],
      createdby: [null],
      updatedby: [null],
      isactive: ['', Validators.required],
      updateButton: ['Submit']
    });

    this.specializationForm = this.formBuilder.group({
      SpecializationID: [null, Validators.required],
      SpecializationName: ['', Validators.required],
      CreatedBy: [null, Validators.required],
      CreatedDate: ['', Validators.required],
      UpdatedBy: [null, Validators.required],
      UpdatedDate: ['', Validators.required],
      IsActive: [0],
      updateButton: ['Submit']
    });
  }

  initializeCountryFormGroup() {
    this.countryForm.patchValue({
      $key: null,
      CountryID: '',
      CountryName: '',
      IsActive: true,
      updateButton: 'Submit'
    });
  }

  populateCountryForm(data: any) {
    console.log('dataa_country', data);
    this.countryForm.patchValue({
      $key: data.CountryID,
      CountryID: data.CountryID,
      CountryName: data.CountryName,
      IsActive: data.IsActive,
      updateButton: 'Update'
    });
  }

  initializeStateFormGroup() {
    this.stateForm.patchValue({
      $key: [null],
      CountryID: [null],
      CountryName: null,
      StateID: [null],
      StateName: '',
      IsActive: true,
      updateButton: 'Submit',
    });
  }

  populateStateForm(data: any) {
    console.log('dataa_state', data);
    this.stateForm.patchValue({
      $key: data.CountryID,
      CountryID: data.CountryID,
      CountryName: data.CountryName,
      StateID: data.StateID,
      StateName: data.StateName,
      IsActive: data.IsActive,
      updateButton: 'Update'
    });
  }

  // City-Group
  initializeCityFormGroup() {
    console.log('initialize_City');
    this.cityForm.patchValue({
      $key: null,
      CountryID: null,
      CountryName: '',
      StateID: '',
      StateName: '',
      CityName: '',
      CityID: '',
      IsActive: true,
      updateButton: 'Submit',
    });
  }


  populateCityForm(data: any) {
    console.log('populate_city', data);
    this.cityForm.patchValue({
      $key: data.CountryID,
      CountryID: data.CountryID,
      CountryName: data.CountryName,
      StateID: data.StateID,
      StateName: data.StateName,
      CityID: data.CityID,
      CityName: data.CityName,
      IsActive: data.IsActive,
      updateButton: 'Update'
    });
  }

  //Disease Group
  initializeDiseaseFormGroup() {
    this.diseaseForm.patchValue({
      DiseaseId: '',
      SpecializationID: '',
      Diseasedescription: '',
      CreatedBy: '',
      CreatedDate: '',
      UpdatedBy: '',
      UpdatedDate: '',
      IsActive: true,
      updateButton: 'Submit',
    })
  }

  populateDiseaseFormGroup(data: any) {
    console.log('Populate Disease',data);
    this.diseaseForm.patchValue({
      DiseaseId: data.DiseaseId,
      SpecializationID: data.SpecializationID,
      Diseasedescription: data.Diseasedescription,
      CreatedBy: data.CreatedBy,
      CreatedDate: data.CreatedDate,
      UpdatedBy: data.UpdatedBy,
      IsActive: data.IsActive,
      updateButton: 'Update'
    })
  }
  // Doctor-Group
  initializeDoctorFormGroup() {
    this.doctorForm.patchValue({
      DoctorId: null,
      HospitalId: '',
      DoctorName: '',
      DoctorImage: null,
      Education: '',
      SpecializationID: '',
      Memberships: '',
      Experience: '',
      Registration: '',
      Services: '',
      Fee: '',
      LanguageKnown: '',
      Feedback: '',
      AboutDoctor: '',
      PhoneNumber: '',
      CreatedBy: null,
      UpdatedBy: null,
      IsActive: true,
      updateButton: 'Update'
    });
  }


  populateDoctorForm(data: any) {
    console.log('dataa_doctor', data);
    this.doctorForm.patchValue({
      DoctorId: data.DoctorId,
      HospitalId: data.HospitalId,
      DoctorName: data.DoctorName,
      DoctorImage: data.DoctorImage,
      Education: data.Education,
      SpecializationID: data.SpecializationID,
      Memberships: data.Memberships,
      Experience: data.Experience,
      Registration: data.Registration,
      Services: data.Services,
      Fee: data.Fee,
      LanguageKnown: data.LanguageKnown,
      Feedback: data.Feedback,
      AboutDoctor: data.AboutDoctor,
      PhoneNumber: data.PhoneNumber,
      CreatedBy: data.CreatedBy,
      UpdatedBy: data.UpdatedBy,
      IsActive: data.IsActive,
      updateButton: 'Update'
    });
  }

  // Hospital-Group
  initializeHospitalFormGroup() {
    this.hospitalForm.patchValue({
      HospitalId: null,
      CountryId: null,
      StateId: null,
      CityId: null,
      LocationId: null,
      HospitalName: '',
      Address1: '',
      Address2: '',
      Address3: '',
      Address4: '',
      Pincode: '',
      PhoneNumber: '',
      LandlineNumber: '',
      CreatedBy: 1,
      UpdatedBy: 1,
      IsActive: true,
      updateButton: 'Submit'
    });
  }

  populateHospitalForm(data: any) {
    console.log('dataa_hospital', data);
    this.hospitalForm.patchValue({
      HospitalId: data.HospitalId,
      LocationId: data.LocationId,
      CityId: data.CityId,
      StateId: data.StateId,
      CountryId: data.CountryId,
      HospitalName: data.HospitalName,
      Address1: data.Address1,
      Address2: data.Address2,
      Address3: data.Address3,
      Address4: data.Address4,
      Pincode: data.Pincode,
      PhoneNumber: data.PhoneNumber,
      LandlineNumber: data.LandlineNumber,
      CreatedBy: data.CreatedBy,
      UpdatedBy: data.UpdatedBy,
      IsActive: data.IsActive,
      updateButton: 'Update'
    });
  }

  // Location-Group
  initializeLocationFormGroup() {
    this.locationForm.patchValue({
      LocationId: 0,
      countryid: '',
      stateid: '',
      cityid: null,
      Locationname: '',
      createdby: 1,
      updatedby: 1,
      isactive: null,
      updateButton: 'Submit'
    });
  }

  populateLocationForm(data: any) {
    console.log('dataa_location', data);
    this.locationForm.patchValue({
      LocationId: data.LocationId,
      cityid: data.cityid,
      stateid: data.stateid,
      countryid: data.countryid,
      Locationname: data.Locationname,
      createdby: data.createdby,
      updatedby: data.updatedby,
      isactive: data.isactive,
      updateButton: 'Update'
    });
  }

  //Specialization Form
  initializeSpecializationFormGroup() {
    this.specializationForm.patchValue({
      SpecializationID: '',
      SpecializationName: '',
      CreatedBy: true,
      CreatedDate: '',
      UpdatedBy: '',
      UpdatedDate: '',
      IsActive: true,
      updateButton: 'Submit'
    });
  }

  populateSpecializationFormGroup(data: any) {
    this.specializationForm.patchValue({
      SpecializationID: data.SpecializationID,
      SpecializationName: data.SpecializationName,
      CreatedBy: data.CreatedBy,
      CreatedDate: data.CreatedDate,
      UpdatedBy: data.UpdatedBy,
      UpdatedDate: data.UpdatedDate,
      IsActive: data.IsActive,
      updateButton: 'Update'
    });
  }
}
