import {Component, EventEmitter, Output} from '@angular/core';
import {LoginService} from "../service/login.service";
import {Login} from "./login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  login: Login;
  display: boolean = false;

  constructor( private loginService: LoginService) {
    this.login = new Login();
  }

}
