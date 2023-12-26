import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatConfirmDialogComponent } from '../controller/mat-confirm-dialog/mat-confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../controller/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar,public apiService: ApiService,) { }

  openConfirmDialog2(msg: any) {
    const dialogRef = this.dialog.open(MatConfirmDialogComponent, {
      width: '390px',
      disableClose: true,
      position: { top: "60px" },
      data: {
        message: msg,
        buttonText: {
          ok: 'Ok',
          cancel: 'Cancel'
        }
      }
    });
    // const snack = this.snackBar.open('Snack bar open before dialog');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();
        // snack.dismiss();
        // this.apiService.deleteData($key);
        this.snackBar.open('deleted successfully', '', {
          duration: 2000,
        });
      }
    });
  }

  openConfirmDialog(msg : any){
    return this.dialog.open(MatConfirmDialogComponent,{
       width: '390px',
       panelClass: 'confirm-dialog-container',
       disableClose: true,
       position: { top: "60px" },
       data :{
         message : msg
       }
     });
   }

   public confirm(title: string, message: string): Observable<any> {

    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
         width: '28%',
         data: {title:title, message:message}
       });
       return this.dialogRef.afterClosed();
   
     }
}

