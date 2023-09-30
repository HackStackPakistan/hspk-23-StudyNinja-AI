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
  userchatsgot: boolean= false;
  systemschat: boolean =false;
  
  constructor(private dialog: MatDialog,private chattest:ChattestingComponent,private ApiService:ApiserviceService) {}

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
        this.apichatstart();
        // this.ApiService.Getresponse("",'choice')
      }
    });
  }

  ChatStart(){


  //  if (!this.userchatsgot){
  //   this.ApiService.getAllUserschats().subscribe(
  //     (response: any) => {  
  //       for (let i = 0; i < response.length; i++) {
  //         const chattitle = response[i].ChatTitle;
  //         this.addToPreviousChats(chattitle);
  //         this.userchatsgot = true;
  //       }
  //       console.log(response);
  //     },
  //     (error:any) => {
  //       console.error('Error fetching chat data:', error);
  //     }
  //   );
  //  }
        this.ApiService.getAllUserschats().subscribe(
          (response:any)=>{
            console.log(response);
          }
        )

  }

  apichatstart(){

    debugger;
   this.systemschat = true;
   this.message = "asdfadfdsf";
   this.sendMessage()

   

  //  voiceflow api start


  this.ApiService.postdata().subscribe(
    response => {
      this.data1= response?.body;
      var data1length = this.data1?.length;
 
       for (let i = 0; i <  data1length; i++) {
 
        console.log(this.data1[i].payload.message);
        this.systemschat = true;
        this.message = this.data1[i].payload.message ;
        this.sendMessage()
  
       console.log('new chat ')
       console.log(this.chatHistory)
  
 
       }
    })


  }




  sendMessage() {
    debugger;
    const message = this.message.trim();
    if (message && this.selectedRecipient) {
      let newMessage:any = [];
   
      if(this.systemschat){
        newMessage = { sender: 'System', message };
        this.systemschat = false;
      }
      else{
        newMessage = { sender: 'User', message };
      }
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
    // this.firebaseservice.Adduserchats("123",chatName,"tezst")
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
