import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, EmailValidator } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  @ViewChild('signinForm') singinForm: NgForm;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignin() {
    const value = this.singinForm.value;
    this.store.dispatch(new AuthActions.DoSignin({email: value.email, password: value.password}));
  }

}
