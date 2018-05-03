import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  @ViewChild('signupForm') singupForm: NgForm;

  constructor(private store: Store<fromApp.AppState>) { }

  onSignup() {
    const value = this.singupForm.value;
    this.store.dispatch(new AuthActions.DoSignup({email: value.email, password: value.password}));
  }

}
