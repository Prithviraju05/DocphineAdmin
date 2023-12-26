import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from '../../shared/dialog.service';
import { NotificationService } from '../../shared/notification.service';
import { AddStateComponent } from './add-state/add-state.component';
import { FormsService } from 'src/app/services/forms.service';
import { ApiService } from 'src/app/services/api.service';

export interface stateTableData {
  CountryName: string;
  StateName: string;
}

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  state: String[] = []
  displayedColumns: string[] = ['CountryName', 'StateName', 'actions'];
  dataSource = new MatTableDataSource<stateTableData>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, public dialogService: DialogService,
    public notificationService: NotificationService,
    public formsService: FormsService,
    public apiService: ApiService
    ) { }

  ngOnInit(): void {
    this.getStateList();
  }

  getStateList() {
    let apiPath = 'state';
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
    this.formsService.initializeStateFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(AddStateComponent, dialogConfig);
  }

  onEdit(row: any) {
    console.log(row);
    const state = {
      "$key": row.CountryID,
      "CountryID": row.CountryID,
      "CountryName": row.CountryName,
      "StateName": row.StateName,
      "CreatedBy": row.CreatedBy,
      "CreatedDate": row.CreatedDate,
      "UpdateBy": row.UpdateBy,
      "UpdateDate": row.UpdateDate,
      "IsActive": row.IsActive
    }
    this.formsService.populateStateForm(state);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(AddStateComponent, dialogConfig);
  }

  onDelete($key: any) {
    console.log('id',$key);
    let apiPath = 'state/' + $key;
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().subscribe(res => {
        console.log(res);
        if (res) {
          console.log('res');
          this.apiService.deleteData(apiPath).subscribe(res=>{
            this.getStateList();
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
