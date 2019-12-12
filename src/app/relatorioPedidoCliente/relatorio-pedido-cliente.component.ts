import {Component, Injector, OnInit} from '@angular/core';
import {RelatorioPedidoClienteService} from "../service/relatorio-pedido-cliente.service";
import {RelatorioPedidoCliente} from "./relatorioPedidoCliente";


@Component({
  selector: 'app-relatorio-pedido-cliente',
  templateUrl: './relatorio-pedido-cliente.component.html',
  styleUrls: []
})

export class RelatorioPedidoClienteComponent implements OnInit {

  relatorioPedidoClienteList: RelatorioPedidoCliente[] = [];

  constructor(private relatorioPedidoClienteService: RelatorioPedidoClienteService) {
    relatorioPedidoClienteService.getRelatorioCliente().subscribe( res => {
      this.relatorioPedidoClienteList = res;
    });
  }

  ngOnInit(): void {
  }



}
