
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from '../../shared/dialog.service';
import { NotificationService } from '../../shared/notification.service';
import { CountryService } from 'src/app/services/country.service';
import { FormsService } from 'src/app/services/forms.service';
import { AddLocationComponent } from './add-location/add-location.component';

export interface countraTableData {
  CountryID: string;
  CountryName: string;
}
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, AfterViewInit {

  country: String[] = []
  // displayedColumns: string[] = ['CountryID', 'CountryName', 'actions'];
  displayedColumns: string[] = ['countryname', 'statename', 'cityname', 'Locationname', 'actions'];
  countryData: any;
  dataSource = new MatTableDataSource<countraTableData>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: CountryService, public dialog: MatDialog, public dialogService: DialogService,
    public notificationService: NotificationService,
    public formsService: FormsService
  ) { }

  ngOnInit(): void {
    this.getCountries();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getCountries() {
    let apiPath = 'location';
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNSwicm9sZSI6InN1cGVyYWRtaW4iLCJmaXJzdF9uYW1lIjoic3VwZXIiLCJsYXN0X25hbWUiOiJhZG1pbiIsImlhdCI6MTY5OTIwMDI2Mn0.tNMOPbhiucHb29PkvkpqGDehF9oFPB7fUvLiOZGjYho';
    this.service.getCountryData(apiPath, token).subscribe((data) => {
      console.log(data);
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCreate() {
    this.formsService.initializeLocationFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(AddLocationComponent, dialogConfig);
  }

  onEdit(row: any) {
    console.log(row);
    this.formsService.populateLocationForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(AddLocationComponent, dialogConfig);
  }

  onDelete($key: any) {
    // alert($key)
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?');
  }

}
