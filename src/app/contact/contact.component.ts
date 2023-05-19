import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit{
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    submitForm() {
        const message = `Sending message "${this.message}" from ${this.firstname} ${this.lastname} from the email ${this.email}`;
        alert(message); 
    }
    

    firstname!: string;
    lastname!: string;
    email!: string;
    message!: string;
}
