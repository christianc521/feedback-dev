import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  constructor(private auth: AuthenticationService) { }
  email: string = ""
  password: string = ""

// test account 
// email: torecat275@dekaps.com
// password: test4321

  signIn() {
    this.auth.login(this.email,this.password);
  }

}
