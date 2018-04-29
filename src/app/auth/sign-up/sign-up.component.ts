import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @ViewChild('signupForm') singupForm: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignup() {
    const value = this.singupForm.value;
    this.authService.registerUser(value.email, value.password);
  }
  
}
