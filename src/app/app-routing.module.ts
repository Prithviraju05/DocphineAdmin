import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './controller/country/country.component';
import { HeaderComponent } from './controller/AdminLTE/header/header.component';
import { HomeComponent } from './controller/AdminLTE/home/home.component';
import { AboutComponent } from './controller/AdminLTE/about/about.component';
import { LoginComponent } from './controller/AdminLTE/login/login.component';
import { StateComponent } from './controller/state/state.component';
import { CityComponent } from './controller/city/city.component';
import { DiseaseComponent } from './controller/disease/disease.component';
import { DoctorComponent } from './controller/doctor/doctor.component';
import { HospitalComponent } from './controller/hospital/hospital.component';
import { LocationComponent } from './controller/location/location.component';
import { SpecializationComponent } from './controller/specialization/specialization.component';

const appRoutes: Routes = [
  {
    path: 'dashboard', component: HeaderComponent, 
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'country', component: CountryComponent },
      { path: 'state', component: StateComponent },
      { path: 'city', component: CityComponent },

      { path: 'disease', component: DiseaseComponent },
      { path: 'doctor', component: DoctorComponent },
      { path: 'hospital', component: HospitalComponent },
      
      { path: 'location', component: LocationComponent },
      { path: 'specialization', component: SpecializationComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
