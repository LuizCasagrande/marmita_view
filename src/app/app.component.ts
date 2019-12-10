import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {SidebarService} from './service/sidebar.service';
import {MenuItem} from 'primeng';
import {HttpClient} from "@angular/common/http";
import {LoginService} from "./service/login.service";
import {Login} from "./login/login";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  usuarioEstaLogado: boolean = false;
  title = 'marmitex';
  menuList: MenuItem[];
  @Output() deslogar: EventEmitter<boolean> = new EventEmitter();
  login: Login;
  display: boolean = false;
  token;

  constructor(private sidebarService: SidebarService,
              private http: HttpClient,
              private loginService: LoginService,
              private httpClient: HttpClient) {
    this.token =  localStorage.getItem('Authorization');
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
            routerLink: '/tipo',
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
    if(this.token){
      this.usuarioEstaLogado = true;
    }else{
      this.usuarioEstaLogado = false;
    }
  }

  ngOnDestroy(): void {
  }

  logout() {
    localStorage.removeItem("Authorization");
    this.deslogar.emit(false);
  }

  showDialog() {
    if(!this.display)
      this.display = true;
  }

  autenticar() {
    const username = this.login.cpf;
    const senha = this.login.senha;
    this.httpClient.post<any>("http://localhost:8080/authenticate",
      { "username": username, "password": senha}).subscribe( data => {
        localStorage.setItem('Authorization', (data.token))
      });
  }
}
