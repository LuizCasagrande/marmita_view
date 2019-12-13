import {Component, Injector, OnInit} from '@angular/core';
import {RelatorioPedidoClienteService} from "../service/relatorio-pedido-cliente.service";
import {RelatorioPedidoCliente} from "./relatorioPedidoCliente";
import {forkJoin} from "rxjs";


@Component({
  selector: 'app-relatorio-pedido-cliente',
  templateUrl: './relatorio-pedido-cliente.component.html',
  styleUrls: []
})

export class RelatorioPedidoClienteComponent implements OnInit {
  dataInicial: Date;
  dataFinal: Date;
  relatorioPedidoClienteList: RelatorioPedidoCliente[] = [];
  totalRecebido: number;
  totalAReceber: number;
  filtrado: boolean = false;

  constructor(private relatorioPedidoClienteService: RelatorioPedidoClienteService) {
  }

  ngOnInit(): void {
  }

  filtraData(){
    forkJoin(
      this.relatorioPedidoClienteService.getRelatorioCliente(this.dataInicial, this.dataFinal),
      this.relatorioPedidoClienteService.relatorioPedidoClienteTotalAPagar(this.dataInicial, this.dataFinal),
      this.relatorioPedidoClienteService.relatorioPedidoClienteTotalPago(this.dataInicial, this.dataFinal)
    ).subscribe(res => {
      this.relatorioPedidoClienteList = res[0];
      this.totalAReceber = res[1];
      this.totalRecebido = res[2];
      this.filtrado = true;
    });
  }


}
