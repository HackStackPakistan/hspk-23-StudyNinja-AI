import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent {
  selectedOption: string | null = null;

  constructor(private dialogRef: MatDialogRef<ChatDialogComponent>) {}

  selectUser() {
    if (this.selectedOption) {
      this.dialogRef.close(this.selectedOption);
    }
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}
