import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {SidebarService} from './service/sidebar.service';
import {ConfirmationService, MenuItem} from 'primeng';
import {HttpClient} from "@angular/common/http";
import {LoginService} from "./service/login.service";
import {Login} from "./login/login";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {BaseService} from "./service/base.service";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'marmitex';
  menuList: MenuItem[];
  login: Login;
  taLogado: boolean = false;
  display: boolean = false;
  getAUtoridade: boolean = false;
  valueAdm: boolean;

  constructor(private sidebarService: SidebarService,
              private http: HttpClient,
              private loginService: LoginService,
              private router: Router,
              private confirmationService: ConfirmationService) {
    this.loginService.abrirLogin.asObservable().subscribe(() => {
      this.display = true;
    });
    this.login = new Login();
    console.log(this.valueAdm);
    if (this.valueAdm) {
      this.menuList = [
        {
          label: 'Início',
          routerLink: '/inicio',
          icon: 'pi pi-home'
        },
        {
          label: 'Pedido',
          items: [
            {
              label: 'Pedidos',
              routerLink: '/pedido',
            },
            {
              label: 'Clientes',
              routerLink: '/cliente',
            },
            {
              label: 'Tamanhos do pedido',
              routerLink: 'tamanho',
            }
          ]
        },
        {
          label: 'Marmita',
          items: [
            {
              label: 'Ingredientes',
              routerLink: '/ingrediente',
            },
            {
              label: 'Comidas',
              routerLink: '/comida',
            },
            {
              label: 'Tipos de comida',
              routerLink: '/tipo',
            },
          ]
        },
        {
          label: 'Cardápios',
          routerLink: '/cardapio',
        },
      ];
    }

  }

  ngOnInit(): void {
    this.taLogado = this.loginService.existeToken();
    this.loginService.getLogado().asObservable().subscribe(res => {
      this.taLogado = res;
    });
    this.retornaAutoridade()
  }

  retornaAutoridade() {
    let value;
    this.http.get(environment.api_url + "autoridade").subscribe( res => {
      value = res;
      this.valueAdm = value;
    });
  }



  ngOnDestroy(): void {
  }

  logout() {
    localStorage.removeItem("Authorization");
    this.loginService.changeLogado(false);
    this.router.navigate(['/inicio']);
  }

  showDialog() {
    this.display = true;
  }

  autenticar() {
    const username = this.login.cpf;
    const senha = this.login.senha;
    this.loginService.login(username, senha).subscribe(data => {
      localStorage.setItem('Authorization', data.token);
      this.loginService.changeLogado(true);
      this.display = false;
      this.login = new Login;
    });
  }

  confirmaLogout() {
    this.confirmationService.confirm({
      message: 'Tem certeza que quer sair ?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.logout();
      }
    });
  }
}
