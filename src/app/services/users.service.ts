import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Firestore } from 'firebase/firestore';
import { Observable, switchMap } from 'rxjs';
import { docData } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: Firestore, private authService: AuthenticationService) {}


  // get currentUserProfile$(): Observable<ProfileUser | null> {
  //   return this.authService.currentUser$.pipe(
  //     switchMap((user) => {
  //       if (!user?.uid) {
  //         return of(null);
  //       }

  //       const ref = doc(this.firestore, 'users', user?.uid);
  //       return docData(ref) as Observable<ProfileUser>;
  //     })
  //   );
  // }

  // addUser(user: ProfileUser): Observable<void> {
  //   const ref = doc(this.firestore, 'users', user.uid);
  //   return from(setDoc(ref, user));
  // }

  // updateUser(user: ProfileUser): Observable<void> {
  //   const ref = doc(this.firestore, 'users', user.uid);
  //   return from(updateDoc(ref, { ...user }));
  // }
}
