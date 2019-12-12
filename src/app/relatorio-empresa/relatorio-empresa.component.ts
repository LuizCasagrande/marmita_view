import {Component, OnInit} from '@angular/core';
import {RelatorioPedidoEmpresaService} from "../service/relatorio-pedido-empresa.service";
import {RelatorioPedidoEmpresa} from "./RelatorioPedidoEmpresa";

@Component({
  selector: 'app-relatorio-empresa',
  templateUrl: './relatorio-empresa.component.html',
  styleUrls: ['./relatorio-empresa.component.scss']
})
export class RelatorioEmpresaComponent {

  relatorioPedidoEmpresa: RelatorioPedidoEmpresa[] = [];

  constructor(private relatorioPedidoClienteService: RelatorioPedidoEmpresaService) {
    relatorioPedidoClienteService.getRelatorioEmpresa().subscribe( res => {
      this.relatorioPedidoEmpresa = res;
    });
  }

}
