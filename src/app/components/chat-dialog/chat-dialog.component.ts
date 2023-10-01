import { Component , Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Button } from 'src/app/shared/components/typewriterchat/models/apimodels';
@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent {
  selectedOption: any = null;
  Buttons: Button[] = []; 


  constructor(private dialogRef: MatDialogRef<ChatDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {

        // Access the data properties here
        this.Buttons = data;
        console.log(this.Buttons)
  }

  StartChat() {
    if (this.selectedOption) {
      console.log(this.selectedOption)
      this.dialogRef.close(this.selectedOption);
    }
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}
