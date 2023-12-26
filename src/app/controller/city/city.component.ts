import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from '../../shared/dialog.service';
import { NotificationService } from '../../shared/notification.service';
import { AddCityComponent } from './add-city/add-city.component';
import { FormsService } from 'src/app/services/forms.service';
import { ApiService } from 'src/app/services/api.service';

export interface stateTableData {
  CountryName: string;
  StateName: string;
}

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

 country: String[] = []
 state: String[] = []
 displayedColumns: string[] = ['CountryName', 'StateName', 'CityName', 'actions'];
 dataSource = new MatTableDataSource<stateTableData>();

 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,public dialogService: DialogService,
    public notificationService: NotificationService,
    public formsService: FormsService,
    public apiService: ApiService
    ) { }

  ngOnInit(): void {
  this.getCityList();
  }

  getCityList() {
    let apiPath = 'city';
    this.apiService.getDashboardData(apiPath).subscribe((data) => {
      console.log(data);
      console.log(data.data);
      this.dataSource.data = data.data;
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
    this.formsService.initializeCityFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(AddCityComponent,dialogConfig);
  }

  onEdit(row:any){
    console.log('city_component',row);
     const city = {
       "$key": row.CountryID,
       "CountryID": row.CountryID,
       "CountryName": row.CountryName,
       "StateName": row.StateName,
       "StateID": row.StateID,
       "CityID": row.CityID,
       "CityName": row.CityName,
       "CreatedBy": row.CreatedBy,
       "CreatedDate": row.CreatedDate,
       "UpdateBy": row.UpdateBy,
       "UpdateDate": row.UpdateDate,
       "IsActive": row.IsActive
     }
     console.log('city',city);
     
    this.formsService.populateCityForm(city);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(AddCityComponent,dialogConfig);
  }
  onDelete($key: any) {
    console.log('cityID',$key);
    let apiPath = 'city/' + $key;
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().subscribe(res => {
        console.log(res);
        if (res) {
          console.log('res');
          this.apiService.deleteData(apiPath).subscribe(res=>{
            this.getCityList();
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
