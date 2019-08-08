import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public afAuth: AngularFireAuth,
              public localStorageService: LocalStorageService) { }

  loginEmailPassword (email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert(`${errorCode}: ${errorMessage}`);
    });
  }


  getUserState() {
    let successF = () => {
      this.localStorageService.setLoginSuccess();
    };    
    this.afAuth.auth.onAuthStateChanged(function(user) {
      if (user) {
        successF();
        console.log('Login Success');
      } else {
        console.log('Login fails');
      }
    });
  }

  signOut() {
    this.localStorageService.logOut();
    this.afAuth.auth.signOut();
  }
}
