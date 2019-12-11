import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TamanhoPedido} from "./tamanho-pedido";
import {Tamanho} from "../tamanho/tamanho";
import {TamanhoService} from "../service/tamanho.service";

@Component({
  selector: 'app-tamanho-pedido',
  templateUrl: './tamanho-pedido.component.html',
  styleUrls: []
})
export class TamanhoPedidoComponent implements OnInit {

  @Output() onClose = new EventEmitter<void>();
  @Output() onSalvar = new EventEmitter<TamanhoPedido>();
  objeto: TamanhoPedido;
  tamanhos: Tamanho[];

  constructor(private activatedRoute: ActivatedRoute,
              private tamanhoService: TamanhoService) {
    this.tamanhoService.findAll().subscribe(tamanhos => this.tamanhos = tamanhos);
  }

  ngOnInit() {
    this.resetaForm();
  }

  resetaForm(): void {
    this.objeto = new TamanhoPedido();
  }

  salvarItem(): void {
    this.objeto.valorTotal = this.objeto.tamanho.preco * this.objeto.quantidade;
    this.onSalvar.emit(this.objeto);
    this.onClose.emit();
    this.resetaForm();
  }

}
