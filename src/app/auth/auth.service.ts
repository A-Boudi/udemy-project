import * as firebase from 'firebase'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as authActions from './store/auth.actions'


@Injectable()
export class AuthService {
  private token: string;

  constructor(private router: Router,
              private store: Store<fromApp.AppState>) {}

  registerUser(email: string, password: string) {
    firebase.app().auth().createUserWithEmailAndPassword(email, password)
      .then(
        () => {
          this.store.dispatch(new authActions.Signup());
          firebase.auth().currentUser.getIdToken()
          .then(
            (token:string) => this.store.dispatch(new authActions.SetToken(token))
          );
        }
      )
      .catch(
        (error) => console.log(error)
      );
  }

  loginUser(email: string, password: string) {
    firebase.app().auth().signInWithEmailAndPassword(email, password)
    .then(
      () => {
        this.store.dispatch(new authActions.Signin())
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken()
          .then(
            (token:string) => this.store.dispatch(new authActions.SetToken(token))
          );
      }
    ).catch(
      error => console.log(error)
    );
  }

  logoutUser() {
    this.store.dispatch(new authActions.Logout())
    firebase.auth().signOut();
    this.router.navigate(['/']);
  }

}