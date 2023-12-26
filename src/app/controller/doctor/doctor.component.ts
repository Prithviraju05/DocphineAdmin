
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from '../../shared/dialog.service';
import { NotificationService } from '../../shared/notification.service';
import { CountryService } from 'src/app/services/country.service';
import { FormsService } from 'src/app/services/forms.service';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';

export interface countraTableData {
  CountryID: string;
  CountryName: string;
}

export interface AcademicTableData {
  Doctor : string;
  Education : string;
  Memberships : string;
  Registration : string;
  Services : string;
  Fee : string;
  LanguageKnown : string;
  Feedback : string;
  AboutDoctor : string;
  PhoneNumber : string;
}

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit, AfterViewInit {

  country: String[] = []
  academicColumns: string[] = ['Doctor', 'Education', 'Memberships', 'Registration', 'Services', 'Fee', 'LanguageKnown', 'Feedback', 'AboutDoctor', 'PhoneNumber'];
  displayedColumns: string[] = ['DoctorName', 'Education', 'Memberships','Registration','Services','Fee', 'LanguageKnown','Feedback','AboutDoctor','PhoneNumber','actions'];
  countryData: any;

  dataSource = new MatTableDataSource<countraTableData>();
  academicData = new MatTableDataSource<any>();
  // academicData = new MatTableDataSource();
  academicDataList = 
  [
      {
          "Doctor": "Dr. Rekha Mahajan",
          "Education": "MBBS, Diploma in Cardiology",
          "Memberships": "xyz",
          "Registration": "xyzw",
          "Services": [
              "Disk slip",
              "Wrist problems",
              "Meniscus Injury",
              "ACL Reconstruction",
              "Rotator Cuff Injury Treatment",
              "Ligament Reconstruction",
              "Arthroscopy",
              "Cartilage Surgery"
          ],
          "Fee": "400",
          "LanguageKnown": "English, Hindi and Telugu",
          "Feedback": "good",
          "AboutDoctor": "As an orthopedic doctor, I am dedicated to diagnosing, treating, and preventing conditions that affect the musculoskeletal system, which includes bones, joints, ligaments, tendons, and muscles. With a keen eye for detail and an analytical approach, I strive to accurately diagnose the root cause of each patient's condition. This allows me to develop personalized treatment plans that may include nonsurgical interventions such as physical therapy, medication, or injections. When necessary, I am also skilled in performing various surgical procedures, employing state-of-the-art techniques to optimize outcomes and minimize recovery time. Beyond the operating room, I am committed to educating my patients about their conditions, empowering them to actively participate in their own healing process. By fostering a collaborative relationship, I aim to ensure that every patient feels heard, supported, and well-informed throughout their orthopedic journey.I am dedicated to making a positive impact on the lives of my patients, one step at a time.",
          "PhoneNumber": "9898989898"
      },
      {
          "Doctor": "Dr. Shakti Kumar",
          "Education": "MBBS, Diploma in Anasthesia",
          "Memberships": "xyz",
          "Registration": "xyzw",
          "Services": [
              "Disk slip",
              "Wrist problems",
              "Meniscus Injury",
              "Cartilage Surgery"
          ],
          "Fee": "400",
          "LanguageKnown": "English, Hindi, Kannada and Telugu",
          "Feedback": "good",
          "AboutDoctor": "As an orthopedic doctor, I am dedicated to diagnosing, treating, and preventing conditions that affect the musculoskeletal system, which includes bones, joints, ligaments, tendons, and muscles. With a keen eye for detail and an analytical approach, I strive to accurately diagnose the root cause of each patient's condition. This allows me to develop personalized treatment plans that may include nonsurgical interventions such as physical therapy, medication, or injections. When necessary, I am also skilled in performing various surgical procedures, employing state-of-the-art techniques to optimize outcomes and minimize recovery time. Beyond the operating room, I am committed to educating my patients about their conditions, empowering them to actively participate in their own healing process. By fostering a collaborative relationship, I aim to ensure that every patient feels heard, supported, and well-informed throughout their orthopedic journey.I am dedicated to making a positive impact on the lives of my patients, one step at a time.",
          "PhoneNumber": "9898989898"
      }
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: CountryService, public dialog: MatDialog, public dialogService: DialogService,
     public notificationService: NotificationService,
     public formsService: FormsService
     ) { }

  ngOnInit(): void {
    this.getCountries();

    let academicData = 
    [
        {
            "Doctor": "Dr. Rekha Mahajan",
            "Education": "MBBS, Diploma in Cardiology",
            "Memberships": "xyz",
            "Registration": "xyzw",
            "Services": [
                "Disk slip",
                "Wrist problems",
                "Meniscus Injury",
                "ACL Reconstruction",
                "Rotator Cuff Injury Treatment",
                "Ligament Reconstruction",
                "Arthroscopy",
                "Cartilage Surgery"
            ],
            "Fee": "400",
            "LanguageKnown": "English, Hindi and Telugu",
            "Feedback": "good",
            "AboutDoctor": "As an orthopedic doctor, I am dedicated to diagnosing, treating, and preventing conditions that affect the musculoskeletal system, which includes bones, joints, ligaments, tendons, and muscles. With a keen eye for detail and an analytical approach, I strive to accurately diagnose the root cause of each patient's condition. This allows me to develop personalized treatment plans that may include nonsurgical interventions such as physical therapy, medication, or injections. When necessary, I am also skilled in performing various surgical procedures, employing state-of-the-art techniques to optimize outcomes and minimize recovery time. Beyond the operating room, I am committed to educating my patients about their conditions, empowering them to actively participate in their own healing process. By fostering a collaborative relationship, I aim to ensure that every patient feels heard, supported, and well-informed throughout their orthopedic journey.I am dedicated to making a positive impact on the lives of my patients, one step at a time.",
            "PhoneNumber": "9898989898"
        },
        {
            "Doctor": "Dr. Shakti Kumar",
            "Education": "MBBS, Diploma in Anasthesia",
            "Memberships": "xyz",
            "Registration": "xyzw",
            "Services": [
                "Disk slip",
                "Wrist problems",
                "Meniscus Injury",
                "Cartilage Surgery"
            ],
            "Fee": "400",
            "LanguageKnown": "English, Hindi, Kannada and Telugu",
            "Feedback": "good",
            "AboutDoctor": "As an orthopedic doctor, I am dedicated to diagnosing, treating, and preventing conditions that affect the musculoskeletal system, which includes bones, joints, ligaments, tendons, and muscles. With a keen eye for detail and an analytical approach, I strive to accurately diagnose the root cause of each patient's condition. This allows me to develop personalized treatment plans that may include nonsurgical interventions such as physical therapy, medication, or injections. When necessary, I am also skilled in performing various surgical procedures, employing state-of-the-art techniques to optimize outcomes and minimize recovery time. Beyond the operating room, I am committed to educating my patients about their conditions, empowering them to actively participate in their own healing process. By fostering a collaborative relationship, I aim to ensure that every patient feels heard, supported, and well-informed throughout their orthopedic journey.I am dedicated to making a positive impact on the lives of my patients, one step at a time.",
            "PhoneNumber": "9898989898"
        }
    ];
    // this.academicData = academicData;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getCountries() {
    let apiPath = 'doctor';
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNSwicm9sZSI6InN1cGVyYWRtaW4iLCJmaXJzdF9uYW1lIjoic3VwZXIiLCJsYXN0X25hbWUiOiJhZG1pbiIsImlhdCI6MTY5OTIwMDI2Mn0.tNMOPbhiucHb29PkvkpqGDehF9oFPB7fUvLiOZGjYho';
    this.service.getCountryData(apiPath, token).subscribe((data) => {
      console.log(data);
      this.dataSource.data = data;
      // this.academicData.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCreate() {
    this.formsService.initializeDoctorFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(AddDoctorComponent, dialogConfig);
  }

  onEdit(row: any) {
    console.log(row);
    this.formsService.populateDoctorForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(AddDoctorComponent, dialogConfig);
  }

  onDelete($key: any) {
    // alert($key)
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?');
  }

}
