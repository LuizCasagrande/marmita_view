import {Component, OnInit} from '@angular/core';
import {ListComponent} from '../component/list.component';
import {Pedido} from './pedido';
import {PedidoService} from '../service/pedido.service';
import {ConfirmationService, MessageService} from 'primeng';
import {Title} from '@angular/platform-browser';
import { error } from 'util';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: []
})
export class PedidoListComponent extends ListComponent<Pedido> implements OnInit {

  constructor(private pedidoService: PedidoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private titleService: Title) {
    super();
  }

  ngOnInit() {
    this.titleService.setTitle('Lista de Pedidos');
    this.carregarLista();
  }

  carregarLista(): void {
    this.loading = true;
    this.pedidoService.findAll().subscribe(res => {
      this.lista = res;
      setTimeout(() => this.loading = false);
    });
  }

}
