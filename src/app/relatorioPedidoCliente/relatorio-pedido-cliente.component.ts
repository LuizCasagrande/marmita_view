import {Component, Injector, OnInit} from '@angular/core';
import {RelatorioPedidoClienteService} from "../service/relatorio-pedido-cliente.service";
import {RelatorioPedidoCliente} from "./relatorioPedidoCliente";
import {forkJoin} from "rxjs";
import {MessageService} from "primeng";


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


  constructor(private relatorioPedidoClienteService: RelatorioPedidoClienteService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  filtraData() {
    console.log("chegando aqui ")
    if (this.dataInicial == null || this.dataFinal == null) {
      this.messageService.add({
        severity: 'info',
        summary: "Complete as Informações Necessarias"
      });
    }else if(this.dataInicial == this.dataFinal){
      this.messageService.add({
        severity: 'info',
        summary: "As datas informadas são iguais"
      });
    }else{
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
}
