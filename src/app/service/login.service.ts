import {EventEmitter, Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Login} from "../login/login";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService<Login>{
  logado: EventEmitter<boolean> = new EventEmitter<boolean>();
  showDialog: boolean;

  constructor(protected http: HttpClient) {
    super(http, 'login');
  }

  login(username: string, password: string): Observable<string> {
    const login = {
      "username": username,
      "password": password
    };

    return this.http.post(`${environment.api_url}authenticate`, login, {responseType: "text"});
  }

  changeLogado(logado: boolean): void {
    this.logado.emit(logado);
  }

  getLogado(): EventEmitter<boolean>{
    return this.logado;
  }

}
