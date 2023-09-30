import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';

import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { ChattestingComponent } from './components/chattesting/chattesting.component';

import { ChatComponent } from './components/chat/chat.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const routes: Routes = [

  {
    path: '',
    pathMatch : 'full',
    component: LandingpageComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'signup',
    component: SignupComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'home',
    component: HomeComponent,
    ...canActivate(redirectUnauthorizedToLogin
  ),
  },
  {
    path: 'chatgpt',
    component: ChattestingComponent,
    ...canActivate(redirectUnauthorizedToLogin
  ),
  },

  { path: 'chat', component: ChatComponent },
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
