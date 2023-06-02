import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedin: boolean = false;

  constructor(private fireauth: AngularFireAuth, private router : Router) {}

  login(email: string, password: string) {
    return this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.isLoggedin = true;
      console.log("logged in");
      this.router.navigate(['/fetch']);
    }, err => {
      alert('Incorrect Username or Password');
      this.router.navigate(['/']);
    });
  }
  
  signOut(){
    return this.fireauth.signOut().then(() => {
      this.router.navigate(['/'])
    })
  }

  createAccount(email: string, password : string, confirmedPass : string){
    return this.fireauth.createUserWithEmailAndPassword(email,password).then ( () => {
      alert('Account Created');
    }, err => {
      alert('Incorrect Username or Password');
      this.router.navigate(["/"])
    })
  }

  isLoggedIn() {
    if (localStorage.getItem("token") == null) {
      this.isLoggedin = false;
      return this.isLoggedin;
    }
    else {
      return true;
    }
  }
}


