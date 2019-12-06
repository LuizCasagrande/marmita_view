import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {SidebarService} from './service/sidebar.service';
import {MenuItem} from 'primeng';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginService} from "./service/login.service";
import {Login} from "./login/login";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: any;
  usuarioEstaLogado: boolean = false;
  title = 'marmitex';
  menuList: MenuItem[];
  @Output() deslogar: EventEmitter<boolean> = new EventEmitter();
  login: Login;
  constructor(private sidebarService: SidebarService,
              private http: HttpClient,
              private loginService: LoginService) {
    this.login = new Login();
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
            routerLink: '/tipo-comida',
          },
        ]
      },
      {
        label: 'cardapio teste',
        routerLink: '/cardapio',
      },
    ];
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  logout() {
    localStorage.removeItem("Authorization");
    this.deslogar.emit(false);
  }
}
