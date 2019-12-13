import {Component} from '@angular/core';
import {RelatorioPedidoEmpresaService} from "../service/relatorio-pedido-empresa.service";
import {RelatorioPedidoEmpresa} from "./RelatorioPedidoEmpresa";
import {DiaSemana} from "../cardapio/diaSemana";

@Component({
  selector: 'app-relatorio-empresa',
  templateUrl: './relatorio-empresa.component.html',
  styleUrls: ['./relatorio-empresa.component.scss']
})
export class RelatorioEmpresaComponent {

  relatorioPedidoEmpresa: RelatorioPedidoEmpresa[] = [];
  diasSemana: [{ label: string; value: null },{ label: string; value: DiaSemana.SEGUNDA }, { label: string; value: DiaSemana.TERCA }, { label: string; value: DiaSemana.QUARTA }, { label: string; value: DiaSemana.QUINTA }, { label: string; value: DiaSemana.SEXTA }];
  chosenDay: DiaSemana;
  filtrado: boolean = false;
  valorTotal: number = 0;

  constructor(private relatorioPedidoClienteService: RelatorioPedidoEmpresaService) {
    this.diasSemana= [
      {label: 'Selecione:', value: null },
      {label: 'Segunda', value: DiaSemana.SEGUNDA },
      {label: 'Terça', value: DiaSemana.TERCA},
      {label: 'Quarta', value: DiaSemana.QUARTA},
      {label: 'Quinta', value: DiaSemana.QUINTA},
      {label: 'Sexta', value: DiaSemana.SEXTA},
    ]
  }

  calcularTotal(): void{
    let total = 0;
    for (const relatorioPedido of this.relatorioPedidoEmpresa) {
      total+= relatorioPedido.valorTotal;
    }
    this.valorTotal = total;
  }

  filtraData() {
    console.log(this.chosenDay);
    this.relatorioPedidoClienteService.getRelatorioEmpresa(this.chosenDay).subscribe( res => {
      this.relatorioPedidoEmpresa = res;
      this.calcularTotal();
    });
    this.filtrado = true;
  }
}
