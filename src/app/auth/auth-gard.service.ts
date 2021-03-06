import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';


@Injectable()
export class AuthGard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>) {}

  canActivate() {
    return this.store.select('auth').take(1).map(
      (authState: fromAuth.State) => {
        return authState.authenticated;
      }
    );
  }
}
