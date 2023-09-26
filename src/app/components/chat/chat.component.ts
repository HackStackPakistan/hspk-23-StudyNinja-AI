  import { Component } from '@angular/core';
  import { MatDialog } from '@angular/material/dialog';
  import { ChatDialogComponent } from '../chat-dialog/chat-dialog.component';

  @Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
  })
  export class ChatComponent {
    selectedRecipient: string | null = null;
    chatHistory: { recipient: string; messages: { sender: string; message: string }[] }[] = [];
    message: string = '';
    previousChats: string[] = [];

    constructor(private dialog: MatDialog) {}

    openChatDialog() {
      const dialogRef = this.dialog.open(ChatDialogComponent, {
        width: '400px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.selectedRecipient = result;
          this.message = '';
          this.addToPreviousChats(result);
        }
      });
    }

    sendMessage() {
      const message = this.message.trim();
      if (message && this.selectedRecipient) {
        const newMessage = { sender: 'User', message };
        const currentChat = this.chatHistory.find(chat => chat.recipient === this.selectedRecipient);

        if (currentChat) {
          currentChat.messages.push(newMessage);
        } else {
          const newChat = { recipient: this.selectedRecipient, messages: [newMessage] };
          this.chatHistory.push(newChat);
        }

        this.message = '';
      }
    }

    loadChat(chatName: string) {
      this.selectedRecipient = chatName;
    }

    addToPreviousChats(chatName: string) {
      if (!this.previousChats.includes(chatName)) {
        this.previousChats.push(chatName);
      }
    }

    editMessage(messageIndex: number) {
      const chat = this.chatHistory.find(chat => chat.recipient === this.selectedRecipient);
      if (chat && chat.messages[messageIndex]) {
        const editedMessage = prompt('Edit the message:', chat.messages[messageIndex].message);
        if (editedMessage !== null) {
          chat.messages[messageIndex].message = editedMessage;
        }
      }
    }

    deleteMessage(messageIndex: number) {
      const chat = this.chatHistory.find(chat => chat.recipient === this.selectedRecipient);
      if (chat) {
        chat.messages.splice(messageIndex, 1);
      }
    }

    getChatMessages(recipient: string): { sender: string; message: string }[] {
      const chat = this.chatHistory.find(chat => chat.recipient === recipient);
      return chat ? chat.messages : [];
    }
  }
