import {Component, EventEmitter, Output} from '@angular/core';
import {LoginService} from "../service/login.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  @Output() deslogar: EventEmitter<boolean> = new EventEmitter();

  constructor( private loginService: LoginService,
               private httpCliente: HttpClient) {}


}
