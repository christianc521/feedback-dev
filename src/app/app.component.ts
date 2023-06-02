import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'feedback-dev';
  account = false;
  storedEmail: string  = "";
  create = false;

  constructor(public auth: AuthenticationService) { }
  email: string = ""
  password: string = ""
  passwordConfirm: string = ""

// test account (
// email: torecat275@dekaps.com
// password: test4321

signIn() {
  this.auth.login(this.email, this.password).then(() => {
    this.status();
    this.storedEmail = this.email
    this.password = "";
    this.email = "";
  });
}

signOut(){
  this.auth.signOut;
  this.account = false;
}

createButton(){
  this.create = true;
}

createAccount(){
  if(this.password == this.passwordConfirm){
    this.auth.createAccount(this.email, this.password,this.passwordConfirm).then(() => {
      this.create = false;
      this.password = "";

    })
  }else{
    alert("Passwords Don't Match")
    this.password = "";
    this.passwordConfirm = "";
  }
  
  }

  status(){
    this.account = this.auth.isLoggedin;
  }
}
