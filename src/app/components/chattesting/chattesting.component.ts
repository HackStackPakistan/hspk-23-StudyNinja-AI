import { Component, ElementRef, Injectable, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { ApiserviceService } from 'src/app/services/apiservice.service';



export interface ButtonType {
  payload: any;
  type: string;
}

export interface Button {
  name: string;
  request: ButtonType;
}
export interface Payload {
  buttons: Button[];
  slate?: any; 
  message?: string;
  delay?: number;
}

export interface ApiResponse {
  type: string;
  payload: any;
}



@Component({
  selector: 'app-chattesting',
  templateUrl: './chattesting.component.html',
  styleUrls: ['./chattesting.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ChattestingComponent {

  @ViewChild('chatboxContainer') chatboxContainer!: ElementRef;
  ngOnInit() {
    // this.PostData();
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatboxContainer.nativeElement.scrollTop = this.chatboxContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  showSpinner = false;
  chatboxvisible = false;
  Isspinnerclose = false;
  Responsetype: any= "";
  buttonsresponse = false;
  buttonname : any= "";
  userresponse : string = '';
  apiresponse : any = false;

  data1:ApiResponse[]=[];

  data1length:any;
  data2:any[]=[];
  data3:any[]=[];
  data :ApiResponse[] = [];
  // data: ApiResponse | null = null;
  Buttons: Button[] = []; 
  ConversationArr:any[]=[];
  latestbuttonarr :any[]=[];


  constructor(private apiService: ApiserviceService) { }



  ChatStart(){
    this.showSpinner = true;
    const durationInMilliseconds = 1000;

    setTimeout(() => {
      console.log('Timeout callback executed');
      this.showSpinner = false;

      console.log('showSpinner set to false');
      // this.cdr.detectChanges();

      this.Isspinnerclose = true;
      if (this.Isspinnerclose == true){
        console.log("chat working");
        this.chatboxvisible = true;
      }
    }, durationInMilliseconds);

   

    this.PostData();
  }

  ButtonClick(Buttonpath:Button){
    console.log("button response");
    console.log(Buttonpath);
    this.Getresponse(Buttonpath.request.type,"choice");


    this.buttonname = Buttonpath.name;
    this.ConversationArr.push({
      type: 'user',
      contenttype: 'text',
      payload:this.buttonname

    })


    console.log(Buttonpath.request.type);
    console.log(Buttonpath.name);
  }

  UserResponse(userresponse:string){

    this.Getresponse(userresponse,'text');
    console.log(userresponse);
    this.ConversationArr.push({
      type: 'user',
      contenttype: 'text',
      payload:userresponse

    })
    this.userresponse = "";
    

  }
  isTyping: boolean = false;
  isTypingnew: boolean = false;
  isTypingcheck: any;
  

  isTypingg(item: any): boolean {
    return true; 

  }



Getdata() {
  this.apiService.getData().subscribe(
    response =>{
      this.data = response;

      console.log(response);

    }
  );
}


 PostData(){
  this.apiService.postdata().subscribe(
    response => {

      this.data1= response?.body;
     this.data1length = this.data1?.length;

      for (let i = 0; i <  this.data1length; i++) {


        this.ConversationArr.push({
          type: 'system',
          contenttype:  this.data1[i].type,
          payload:this.data1[i].payload
  
        })

      }
      
      // const buttonarr = this.ConversationArr.filter(item => item.contenttype == 'choice');
      const buttonarr = this.ConversationArr.filter(item => item.contenttype == 'choice');
      if (buttonarr.length > 0){
        this.latestbuttonarr = buttonarr.map(item => item.payload.buttons).pop();

      }



      if (response?.body?.length > 1) {
        this.Buttons =  this.data1[1].payload.buttons; 
        // console.log(response[1].payload.buttons);
      }

      return response?.body;
    })
    // ,
    // (error) => {
    //   console.log('Error fetching data:', error);
    // })
    // (response: ApiResponse[]) => {
    //   this.data = response;
    //   console.log("this.data1");
    //   console.log(this.data);
    //   console.log(this.data[1].payload?.buttons);
      
    //   if (this.data1.length > 1 && this.data1[1].payload?.buttons) {
    //     this.Buttons = this.data1[1].payload.buttons;
    //     console.log(this.Buttons);
    //   }
    // },
    // error => {
    //   console.error(error);
    // }


  
  }
   Getresponse(userresponse:string,type:string){


    // this.apiService.userrespomne(userresponse);
    // this.apiService.Getresponse(userresponse).subscribe(
    //   (response) => {
    //     this.data = response;
    //     console.log("button response");
    //     console.log(response);
    //     console.log(this.data);
    //   },
    //   (error) => {
    //     console.log('Error fetching data:', error);
    //   })
    // }
    // try {
    //   const responseData =  this.apiService.Getresponse(userresponse);
    //   // Handle the responseData here

    //   console.log("button response1");
    //     console.log(responseData);
    // } catch (error) {
    //   // Handle errors here
    // }
  



    // this.apiService.Getresponse(userresponse,type).subscribe(
    //   response => {
    //     console.log("geting data");
  
    //     this.data1 = response.body;
       
    //     for (let i = 0; i <  this.data1length; i++) {

    //       if(this.data1 != null){
    //       this.ConversationArr.push({
    //         type: 'system',
    //         contenttype:  this.data1[i]?.type,
    //         payload:this.data1[i]?.payload
    
    //       })
    //     }
  
    //     }


    //     console.log("new data");
    //     console.log(this.data1);
  
  
    //     // if (response.body.length > 1) {
    //     //   this.Buttons =  this.data1[1].payload.buttons; // Extract 'buttons' from the second item in the array
    //     //   console.log(this.Buttons);
    //     //   // console.log(response[1].payload.buttons);
    //     // }
    //   })

    this.apiService.Getresponse(userresponse, type).pipe(
      map(response => {
        console.log("getting data");

        this.data1 = response.body;
        this.data1length = this.data1.length;

        // for (let i = 0; i < this.data1length; i++) {

        // }
        // getLastChoiceItem() {
        //   const choiceItems = this.items.filter(item => item.contenttype === 'choice');
        //   return choiceItems.length > 0 ? choiceItems[choiceItems.length - 1] : null;
        // }
        for (let i = 0; i < this.data1length; i++) {
          if (this.data1 != null) {
            this.ConversationArr.push({
              type: 'system',
              contenttype: this.data1[i]?.type, 
              payload: this.data1[i]?.payload,
            });
            // if (this.data1[i]?.type == 'choice'){
            //   this.latestitem = 
            // }
          }
          // this.isTyping = true;
          // setTimeout(() => {
          //   this.isTyping = false;
          // }, 6000);
        }
      

        
        


        console.log("new data");
        console.log(this.ConversationArr);
    
        return this.ConversationArr; // Return the modified array
      })
    )
    .subscribe(
      modifiedConversationArr => {

        const buttonarr = this.ConversationArr.filter(item => item.contenttype == 'choice');
        this.latestbuttonarr = buttonarr.map(item => item.payload.buttons).pop();

        // const buttonsArray = this.latestbuttonarr.map(item => item.payload.buttons);
        // this.latestbuttonarr.push(...buttonsArray);
        console.log("button arr")
        console.log(this.latestbuttonarr)


        this.ConversationArr = modifiedConversationArr;
        console.log('test')
        console.log(this.ConversationArr);
    
        // Other actions you need to perform after updating ConversationArr
        // getLastChoiceItem() {
        //   const choiceItems = this.items.filter(item => item.contenttype === 'choice');
        //   return choiceItems.length > 0 ? choiceItems[choiceItems.length - 1] : null;
        // }


        // this.cdr.detectChanges();

      },
      error => {
        console.error("Error fetching data:", error);
      }
    );



    // this.apiService.Getresponse(userresponse, type).subscribe(
    //   (event: HttpEvent<any>) => {
    //     if (event instanceof HttpResponse) {
    //       const response: HttpResponse<any> = event;
    //       console.log("getting data");
    //       this.data1 = response.body;
    
    //       for (let i = 0; i < this.data1length; i++) {
    //         if (this.data1 != null) {
    //           this.ConversationArr.push({
    //             type: 'system',
    //             contenttype: this.data1[i]?.type,
    //             payload: this.data1[i]?.payload
    //           });
    //         }
    //       }
    
    //       console.log("new data");
    //       console.log(this.data1);
    
    //       // Update the ConversationArr with the modified array
    //       this.ConversationArr = this.ConversationArr;

    //       this.cdr.detectChanges();
    //     }
    //   },
    //   (error: any) => {
    //     console.error("Error fetching data:", error);
    //   }
    // );
    
      








      // ,
    // this.apiService.Getresponse(userresponse).subscribe({
    //   next: (response) => {
    //     this.data1 = response;
    //     console.log("button response user");
    //     console.log(response);
    //     console.log(this.data1);
    //   },
    //   error: (error) => {
    //     console.log('Error fetching data:', error);
    //   }
    // });
  }

} 