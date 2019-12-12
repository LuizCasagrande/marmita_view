import {Component, OnInit} from '@angular/core';
import {ListComponent} from '../component/list.component';
import {Pedido} from './pedido';
import {PedidoService} from '../service/pedido.service';
import {ConfirmationService, MessageService} from 'primeng';
import {Title} from '@angular/platform-browser';
import { error } from 'util';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  styleUrls: []
})
export class PedidoListComponent extends ListComponent<Pedido> implements OnInit {

  isAdm: boolean = false;

  constructor(private pedidoService: PedidoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private titleService: Title,
              private http: HttpClient) {
    super();
  }

  ngOnInit() {
    this.validaAdmin();
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

  validaAdmin() {
    return this.http.get(environment.api_url + "autoridade", { responseType: "text"}).subscribe(res => {
      this.isAdm =  res === "true";
    });
  }

  pagar(id: number) {
    this.pedidoService.pagar(id).subscribe(() => {
      this.carregarLista();
    });
  }

  cancelar(id: number) {
    this.pedidoService.cancelar(id);
  }

}
