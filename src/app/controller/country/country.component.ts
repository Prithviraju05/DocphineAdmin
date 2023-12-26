
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from '../../shared/dialog.service';
import { NotificationService } from '../../shared/notification.service';
import { AddCountryComponent } from './add-country/add-country.component';
import { FormsService } from 'src/app/services/forms.service';
import { ApiService } from 'src/app/services/api.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


export interface countraTableData {
  CountryID: string;
  CountryName: string;
}
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, AfterViewInit {

  country: String[] = []
  displayedColumns: string[] = ['CountryID', 'CountryName', 'actions'];
  countryData: any;
  dataSource = new MatTableDataSource<countraTableData>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, public dialogService: DialogService,
    public notificationService: NotificationService,
    public formsService: FormsService,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getCountryList();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getCountryList() {
    let apiPath = 'country';
    this.apiService.getDashboardData(apiPath).subscribe((data) => {
      console.log(data);
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (err) => {
      this.handleError(err);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCreate() {
    this.formsService.initializeCountryFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(AddCountryComponent, dialogConfig);
  }

  onEdit(row: any) {
    console.log(row);
    const country = {
      "$key": row.CountryID,
      "CountryID": row.CountryID,
      "CountryName": row.CountryName,
      // "CreatedBy": row.CreatedBy,
      // "CreatedDate": row.CreatedDate,  //"2020-06-30",
      // "UpdateBy": row.UpdateBy,
      // "UpdateDate": row.UpdateDate, //"2020-06-30",
      "IsActive": row.IsActive
    }
    this.formsService.populateCountryForm(country);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(AddCountryComponent, dialogConfig);
  }

  onDelete($key: any) {
    console.log('id',$key);
    let apiPath = 'country/' + $key;
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().subscribe(res => {
        console.log(res);
        if (res) {
          console.log('res');
          this.apiService.deleteData(apiPath).subscribe(res=>{
            this.getCountryList();
            this.notificationService.warn(": deleted successfully");
          });
        }
      }, (err) => {
        this.handleError(err);
      })
  }

  handleError(error: any) {
    console.log(error);
    if (error.status === 409) {
      console.log(error.error.message);
    } else {
      if (error && error.error && error.error.message) {
        alert(error.error.message);
      } else {
        alert("Please Try again later..");
      }
    }
  }
}
