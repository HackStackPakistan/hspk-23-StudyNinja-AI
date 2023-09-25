// chat.component.ts

import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { ChatDialogComponent } from '../chat-dialog/chat-dialog.component';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  toggleSidenav() {
    this.sidenav.toggle();
  }
  constructor(private dialog: MatDialog) {}
  openChatDialog() {
    const dialogRef = this.dialog.open(ChatDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  suggestedQuestions: string[] = [
    "How can I help you today?",
    "Tell me about your issue.",
    "What's your name?",
  ];
  message: string = '';
  selectQuestion(question: string) {
    this.message = question;
  }
  sendMessage() {
    console.log('User message:', this.message);
    this.message = '';
  }
    
}
