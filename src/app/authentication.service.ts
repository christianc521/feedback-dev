import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isLoggedin: boolean = false;
  userId: string = '';

  constructor(
    private fireauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return this.fireauth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          const userEmail = user.email;
          const userRef = this.firestore.collection('users', (ref) =>
            ref.where('email', '==', userEmail)
          );

          return userRef
            .get()
            .toPromise()
            .then((querySnapshot) => {
              if (!querySnapshot.empty) {
                const userId = querySnapshot.docs[0].id;
                localStorage.setItem('userId', userId); // Store the user ID
              } else {
                throw new Error('User not found');
              }
              localStorage.setItem('token', 'true');
              this.isLoggedin = true;
              console.log('logged in');
              this.router.navigate(['/fetch']); // Switch to the fetch component
            });
        } else {
          throw new Error('User not found');
        }
      })
      .catch((err) => {
        alert('Incorrect Username or Password');
        this.router.navigate(['/']);
      });
  }

  signOut() {
    return this.fireauth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  createAccount(email: string, password: string, confirmedPass: string) {
    return this.fireauth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          const userId = this.firestore.createId(); // Generate auto-generated ID
          const userData = {
            userId: userId,
            email: user.email,
            password: '', // Do not store the password in plaintext
          };

          // Create user document in Firestore with custom and auto-generated IDs
          return this.firestore.collection('users').doc(userId).set(userData);
        } else {
          throw new Error('User not found');
        }
      })
      .then(() => {
        alert('Account Created');
      })
      .catch((error) => {
        alert('Incorrect Username or Password');
        this.router.navigate(['/']);
      });
  }

  isLoggedIn() {
    if (localStorage.getItem('token') == null) {
      this.isLoggedin = false;
      return this.isLoggedin;
    } else {
      return true;
    }
  }
}
