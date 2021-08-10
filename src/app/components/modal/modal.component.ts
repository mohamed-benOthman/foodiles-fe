import {Component, Input, OnInit, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ModalComponent>) { }

  ngOnInit(): void {
  }
  close(): void {
    this.dialogRef.close();
  }

  success() {
    this.data.roleFunction(this.dialogRef);
    this.close();
  }
}
