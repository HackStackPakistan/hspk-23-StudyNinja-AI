import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatDialogComponent } from '../chat-dialog/chat-dialog.component';
import { ApiserviceService } from 'src/app/services/apiservice.service'
import { ApiResponse, ChattestingComponent } from '../chattesting/chattesting.component';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  selectedRecipient: string | null = null;
  chatHistory: { recipient: string; messages: { sender: string; message: string }[] }[] = [];
  message: string = '';
  previousChats: string[] = [];
  data1:ApiResponse[]=[];
  userchatsvisible: boolean= false;

  constructor(private dialog: MatDialog,private chattest:ChattestingComponent,private firebaseservice:ApiserviceService) {}

  ngOnInit(){
    this.ChatStart()
  }

  openChatDialog() {
    const dialogRef = this.dialog.open(ChatDialogComponent, {
      width: '400px',
    });

    //after modal close
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedRecipient = result;
        this.message = '';
        this.addToPreviousChats(result);
        this.addchattodatabase(result)
      }
    });
  }

  ChatStart(){
    // this.showSpinner = true;
    // const durationInMilliseconds = 1000;

    // setTimeout(() => {
    //   console.log('Timeout callback executed');
    //   this.showSpinner = false;

    //   console.log('showSpinner set to false');
    //   // this.cdr.detectChanges();

    //   this.Isspinnerclose = true;
    //   if (this.Isspinnerclose == true){
    //     console.log("chat working");
    //     this.chatboxvisible = true;
    //   }
    // }, durationInMilliseconds);

   
    this.firebaseservice.getAllUserschats().subscribe(
      (response: any) => {
        for (let i = 0; i < response.length; i++) {
          const chattitle = response[i].ChatTitle;
          this.addToPreviousChats(chattitle);
        }
        console.log(response);
      },
      (error) => {
        console.error('Error fetching chat data:', error);
      }
    );
    // var apiresponse:any = this.chattest.PostData();
    // this.data1= apiresponse?.body;

    
    // for (let i = 0; i <  apiresponse?.bodydata1.length; i++) {

    //   var newMessage = { sender: 'system', message:this.data1[i].payload };
    //   var newChat:any = { recipient: this.selectedRecipient, messages: [newMessage] };
    //   this.chatHistory.push(newChat);
    //  console.log('new chat ')
    //  console.log(this.chatHistory)
    // }

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
    this.previousChats.push(chatName);
   
    
  }

  addchattodatabase(chatName: string){
    // add chat in database
    this.firebaseservice.Adduserchats("123",chatName,"tezst")
    if (!this.previousChats.includes(chatName)) {
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


  getuserchats(){
    console.log("sdfsd")

    
  }
}
