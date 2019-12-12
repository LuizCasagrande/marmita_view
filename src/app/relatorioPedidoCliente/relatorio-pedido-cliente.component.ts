import {Component, Injector, OnInit} from '@angular/core';
import {RelatorioPedidoClienteService} from "../service/relatorio-pedido-cliente.service";
import {RelatorioPedidoCliente} from "./relatorioPedidoCliente";
import {Pedido} from "../pedido/pedido";


@Component({
  selector: 'app-relatorio-pedido-cliente',
  templateUrl: './relatorio-pedido-cliente.component.html',
  styleUrls: []
})

export class RelatorioPedidoClienteComponent implements OnInit {
  dataInicial: Date;
  dataFinal: Date;
  relatorioPedidoClienteList: RelatorioPedidoCliente[] = [];

  constructor(private relatorioPedidoClienteService: RelatorioPedidoClienteService) {

  }

  ngOnInit(): void {
  }

  filtraData(){
    this.relatorioPedidoClienteService.getRelatorioCliente(this.dataInicial, this.dataFinal).subscribe( res => {
      this.relatorioPedidoClienteList = res;
    });
  }


}
