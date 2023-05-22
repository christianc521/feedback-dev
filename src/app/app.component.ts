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
  credentials: string  = "";

  constructor(public auth: AuthenticationService) { }
  email: string = ""
  password: string = ""

// test account (
// email: torecat275@dekaps.com
// password: test4321

signIn() {
  this.auth.login(this.email, this.password).then(() => {
    this.status();
    this.credentials = this.email
  });
}


  status(){
    this.account = this.auth.isLoggedin;
  }
}
