import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
// import { authState } from 'rxfire/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   
  email1:any = '';
  password1:any = '';


  loginForm = new FormGroup({
    email: new FormControl(' ',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required]),
  });

  constructor(
    private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router,
    private fb: NonNullableFormBuilder,
    
  ) {}


  // currentUser$ = authState(this.authService);


ngOnInit(): void{}
  
get email() {
  return this.loginForm.get('email');
}

get password() {
  return this.loginForm.get('password');
}

submit(){
  if(!this.loginForm.valid){
    return;
  }
  this.email1 = this.loginForm.value.email;
  this.password1 = this.loginForm.value.password;
  this.authService.login(this.email1, this.password1 )
  .pipe(
    this.toast.observe({
      success: 'Logged in successfully',
      loading: 'Logging in...',
      error: ({ message }) => `There was an error: ${message} `,
    })
  )
  .subscribe(() => {
    this.router.navigate(['/home'])
  })


}




}
