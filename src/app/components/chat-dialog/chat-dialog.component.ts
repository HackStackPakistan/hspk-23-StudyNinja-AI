import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent {

  constructor(private dialogRef: MatDialogRef<ChatDialogComponent>) {}
  selectUser() {
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
