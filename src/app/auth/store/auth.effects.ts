import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

  @Effect()
  authSignup = this.actions$.ofType(AuthActions.DO_SINGUP)
    .map(
      (action: AuthActions.DoSignup) => {
        return action.payload;
      }
    )
    .switchMap( 
      (authData: {email: string, password: string}) => {
        return fromPromise(firebase.app().auth().createUserWithEmailAndPassword(authData.email, authData.password));
      }
    )
    .switchMap(
      () => { return fromPromise(firebase.auth().currentUser.getIdToken()); }
    )
    .mergeMap(
      (token: string) => {
        this.router.navigate(['/']);
        return [
          {
            type: AuthActions.SINGUP
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ]
      }
    );

  @Effect()
  authSignin = this.actions$.ofType(AuthActions.DO_SINGIN)
    .map(
      (action: AuthActions.DoSignin) => {
        return action.payload;
      }
    )
    .switchMap( 
      (authData: {email: string, password: string}) => {
        return fromPromise(firebase.app().auth().signInWithEmailAndPassword(authData.email, authData.password));
      }
    )
    .switchMap(
      () => { return fromPromise(firebase.auth().currentUser.getIdToken()); }
    )
    .mergeMap(
      (token: string) => {
        this.router.navigate(['/']);
        return [
          {
            type: AuthActions.SINGIN
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ]
      }
    );

  @Effect({dispatch: false})
  authLogout = this.actions$.ofType(AuthActions.LOGOUT)
    .do(() => this.router.navigate(['/']))

  constructor(private actions$: Actions,
              private router: Router) {}
}