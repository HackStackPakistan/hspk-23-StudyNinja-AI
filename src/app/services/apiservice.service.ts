import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment1 as env } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {  
  data: any;

  
  private apiurl = 'https://general-runtime.voiceflow.com/state/user/12345/interact?logs=off';

  constructor(private http:HttpClient
    ,private db: AngularFirestore
    ) {  }

  // apikey:any = 'VF.DM.64c8ee4679fc860007badb7a.Ce4o2LSwhEGKOtCd'; //unimentor api
  apikey:any = 'VF.DM.65149bb4b4bc5400060fa2e1.D8lxjqqm2XDIp24d'; //unimentor api 2.0
  // apikey:any = 'apikey';
  userinput:any = 'hi i have some questoins';
  buttonpath:string= "";

  httpoptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': this.apikey,
      'Host':'general-runtime.voiceflow.com',
      'Content-Length': 96
    })
  };

  httpbodyGET = {
    body: JSON.stringify({
      action: {
        type: 'launch',
        payload: this.userinput
      },
      config: {
        tts: false,
        stripSSML: true,
        stopAll: true,
        excludeTypes: ['block', 'debug', 'flow']
      }
    })
  }

  httpbodyPost = {
    body: JSON.stringify({
      action: {
        type: 'launch',
      }
      // ,
      // config: {
      //   tts: false,
      //   stripSSML: true,
      //   stopAll: true,
      //   excludeTypes: ['block', 'debug', 'flow']
      // }
    })
  }
  // httpbodyresponse = {
  //   body: JSON.stringify({
  //     action: {
  //       type: "path-pe1wo39mf",
  //       payload: {}
  //     },
  //     config: {
  //       tts: false,
  //       stripSSML: true,
  //       stopAll: true,
  //       excludeTypes: ['block', 'debug', 'flow']
  //     }
  //   })
  // }
  


userrespomne(resp:string){
console.log(resp);
this.buttonpath =  resp;
}


  getData ():Observable<any>{
  return this.http.get<any>(this.apiurl , this.httpoptions).pipe(map( data => {
    console.log(data);
    return data;
  }));
  }

  // postdata():Observable<any>{

  //   // return this.http.post<any>(this.apiurl, this.httpbodyPost,this.httpoptions).pipe(map( data => {
  //   //   console.log(data);
  //   //   return data;
  //   // }));  

  //   const rawData = '{"action": {"type": "launch"}}';
    
  //   // const formData = `action[type]=${encodeURIComponent(rawData.action.type)}`;
    

  //   let params = new HttpParams().set('body', rawData);


  //   const newpost = this.http.post<any>(`${env.BASE_URL}/`,params);
  //   return newpost;


  // }
  postdata(): Observable<any> {
    const rawData = { action: { type: 'launch' } }; 

    let modifiedReq = new HttpRequest<any>(
      'POST',
      `${env.BASE_URL}/`,
      rawData,
      {
        headers: new HttpHeaders({
          'Host': 'general-runtime.voiceflow.com',
          'Authorization': this.apikey,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
//        params: new HttpParams().set('key', this.apikey)
      }
    );

    console.log(modifiedReq)
    return this.http.request(modifiedReq);
}
 




 

   

}

