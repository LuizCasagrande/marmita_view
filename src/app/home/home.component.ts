import { Component, OnInit } from '@angular/core';
import {LoginService} from "../service/login.service";
import {CardapioService} from "../service/cardapio.service";
import {Cardapio} from "../cardapio/Cardapio";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  taLogado: boolean = false;
  cardapios: Cardapio[] = [];

  constructor(private loginService: LoginService,
              private cardapioService: CardapioService) {
    this.cardapioService.findAtivos().subscribe(res => {
      this.cardapios = res;
    });
  }

  ngOnInit() {
    this.taLogado = this.loginService.existeToken();
    this.loginService.getLogado().asObservable().subscribe(res => {
      this.taLogado = res;
    });
  }

  logar(): void {
    this.loginService.abrirLogin.emit();
  }

}
