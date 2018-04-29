import * as firebase from 'firebase'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
  private token: string;

  constructor(private router: Router) {}

  registerUser(email: string, password: string) {
    firebase.app().auth().createUserWithEmailAndPassword(email, password)
      .then(
        (resp) => console.log(resp)
      )
      .catch(
        (error) => console.log(error)
      );
  }

  loginUser(email: string, password: string) {
    firebase.app().auth().signInWithEmailAndPassword(email, password)
    .then(
      () => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken()
          .then(
            (token:string) => this.token = token
          )
      }
    ).catch(
      error => console.log(error)
    );
  }

  logoutUser() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/']);
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token:string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated(): boolean {
    return this.token != null;
  }

}