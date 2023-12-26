import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CountryComponent } from './controller/country/country.component';
import { LoginComponent } from './controller/AdminLTE/login/login.component';
import { HomeComponent } from './controller/AdminLTE/home/home.component';
import { HeaderComponent } from './controller/AdminLTE/header/header.component';
import { AboutComponent } from './controller/AdminLTE/about/about.component';
import { StateComponent } from './controller/state/state.component';
import { CityComponent } from './controller/city/city.component';
import { AddCountryComponent } from './controller/country/add-country/add-country.component';
import { AddCityComponent } from './controller/city/add-city/add-city.component';
import { AddStateComponent } from './controller/state/add-state/add-state.component';
import { MatConfirmDialogComponent } from './controller/mat-confirm-dialog/mat-confirm-dialog.component';
import { DiseaseComponent } from './controller/disease/disease.component';
import { AddDiseaseComponent } from './controller/disease/add-disease/add-disease.component';
import { DoctorComponent } from './controller/doctor/doctor.component';
import { AddDoctorComponent } from './controller/doctor/add-doctor/add-doctor.component';
import { HospitalComponent } from './controller/hospital/hospital.component';
import { AddHospitalComponent } from './controller/hospital/add-hospital/add-hospital.component';
import { LocationComponent } from './controller/location/location.component';
import { AddLocationComponent } from './controller/location/add-location/add-location.component';
import { SpecializationComponent } from './controller/specialization/specialization.component';
import { AddSpecializationComponent } from './controller/specialization/add-specialization/add-specialization.component';
import { ConfirmDialogComponent } from './controller/confirm-dialog/confirm-dialog.component';
import {MatTabsModule} from '@angular/material/tabs';
import { LongTextCellComponent } from './common/long-text-cell/long-text-cell.component';
import { MainHeaderComponent } from './common/main-header/main-header.component';


@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    MainHeaderComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    AboutComponent,
    StateComponent,
    CityComponent,
    AddCountryComponent,
    AddCityComponent,
    AddStateComponent,
    MatConfirmDialogComponent,
    DiseaseComponent,
    AddDiseaseComponent,
    DoctorComponent,
    AddDoctorComponent,
    HospitalComponent,
    AddHospitalComponent,
    LocationComponent,
    AddLocationComponent,
    SpecializationComponent,
    AddSpecializationComponent,
    ConfirmDialogComponent,
    LongTextCellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
