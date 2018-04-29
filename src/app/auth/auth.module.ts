import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { SignUpComponent } from "./sign-up/sign-up.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { AuthRoutingModule } from "./auth-routing.module";


@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }