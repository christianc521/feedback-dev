import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private fireauth: AngularFireAuth, private router : Router) {}

  login(email: string, password : string){
    this.fireauth.signInWithEmailAndPassword(email,password).then( () => {
      localStorage.setItem('token','true');
      this.router.navigate(['/fetch']);
    }, err => {
      alert('Incorrect Username or Password');
      this.router.navigate(["/"])
    })
  }
}
