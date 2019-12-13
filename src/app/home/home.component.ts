import {Component, OnInit} from '@angular/core';
import {LoginService} from "../service/login.service";
import {CardapioService} from "../service/cardapio.service";
import {Cardapio} from "../cardapio/cardapio";
import {DiaSemana} from "../cardapio/diaSemana";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  taLogado: boolean = false;
  cardapios: Cardapio[] = [];
  cardapioSeg: Cardapio;
  cardapioTer: Cardapio;
  cardapioQua: Cardapio;
  cardapioQui: Cardapio;
  cardapioSex: Cardapio;

  constructor(private loginService: LoginService,
              private cardapioService: CardapioService) {
    this.cardapioService.findAtivos().subscribe(res => {
      this.cardapios = res;
      for (const cardapio of this.cardapios) {
        if (cardapio.diaSemana == DiaSemana.SEGUNDA) {
          this.cardapioSeg = cardapio;
        }
        if (cardapio.diaSemana == DiaSemana.TERCA) {
          this.cardapioTer = cardapio;
        }
        if (cardapio.diaSemana == DiaSemana.QUARTA) {
          this.cardapioQua = cardapio;
        }
        if (cardapio.diaSemana == DiaSemana.QUINTA) {
          this.cardapioQui = cardapio;
        }
        if (cardapio.diaSemana == DiaSemana.SEXTA) {
          this.cardapioSex = cardapio;
        }
      }
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
