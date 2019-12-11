import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {BaseService} from "./base.service";
import {Login} from "../login/login";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService<Login> implements OnInit {
  logado: EventEmitter<boolean> = new EventEmitter<boolean>();
  abrirLogin: EventEmitter<void> = new EventEmitter<void>();
  constructor(protected http: HttpClient) {
    super(http, 'login');
  }

  ngOnInit(): void {
    this.getLogado().emit(this.existeToken());
  }

  existeToken(): boolean {
    return localStorage.getItem("Authorization") != null;
  }

  login(username: string, password: string): Observable<any> {
    const login = {
      "username": username,
      "password": password
    };

    return this.http.post(`${environment.api_url}authenticate`, login);
  }

  changeLogado(logado: boolean): void {
    this.logado.emit(logado);
  }

  getLogado(): EventEmitter<boolean>{
    return this.logado;
  }

}
