import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  constructor(private router: Router) { }

  signIn() {
    this.router.navigate(['fetch']);
  }

}
