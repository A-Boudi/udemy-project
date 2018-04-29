import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, EmailValidator } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  @ViewChild('signinForm') singinForm: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignin() {
    const value = this.singinForm.value;
    this.authService.loginUser(value.email, value.password);
  }

}
