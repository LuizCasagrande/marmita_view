import {Component, EventEmitter, Output} from '@angular/core';
import {LoginService} from "../service/login.service";
import {Login} from "./login";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: Login;
  display: boolean = false;
  @Output() deslogar: EventEmitter<boolean> = new EventEmitter();

  constructor( private loginService: LoginService,
               private httpCliente: HttpClient) {
    this.login = new Login();
  }

  logout() {
    localStorage.removeItem("Authorization");
    this.deslogar.emit(false);
  }

  autenticar() {
    const username = this.login.cpf;
    const senha = this.login.senha;
    this.httpCliente.post<any>("http://localhost:8080/authenticate",
      { "username": username, "password": senha}).subscribe( data => {
      localStorage.setItem('Authorization', data.token)
    });
  }

  showDialog() {
    if(!this.display)
      this.display = true;
  }
}
