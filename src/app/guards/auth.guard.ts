import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {LoginService} from "../service/login.service";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isAdm: boolean = false;

  constructor(private loginService: LoginService,
              private router: Router,
              private http: HttpClient) {
    if (this.loginService.existeToken()) {
      this.validaAdmin();
    }
    this.loginService.getLogado().asObservable().subscribe(res => {
      this.validaAdmin();
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (this.loginService.existeToken()) {
      console.log(state.url);
      if (this.isAdm) {
        return true;
      } else {
        if (state.url.indexOf("inicio") > -1
          || state.url.indexOf("cliente/form") > -1
          || state.url.indexOf("sem-acesso") > -1
          || state.url.indexOf("pedido/form") > -1
          || state.url.indexOf("pedido") > -1) {
          return true;
        }
        this.router.navigate(['/sem-acesso']);
        return false;
      }
    } else {
      this.router.navigate(['/inicio']);
      return false;
    }
  }

  validaAdmin() {
    return this.http.get(environment.api_url + "autoridade", { responseType: "text"}).subscribe(res => {
      this.isAdm =  res === "true";
    });
  }

}
