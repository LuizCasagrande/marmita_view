import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {RelatorioPedidoCliente} from "../relatorioPedidoCliente/relatorioPedidoCliente";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class RelatorioPedidoClienteService extends BaseService<RelatorioPedidoCliente>{

  constructor(protected http: HttpClient) {
    super(http, 'relatorio');
  }

  getRelatorioCliente(dataInicial: Date, dataFinal: Date): Observable<[RelatorioPedidoCliente]>{
    return this.http.get<[RelatorioPedidoCliente]>(`${this.getUrl()}/pedido-cliente?dataInicial=${dataInicial}&dataFinal=${dataFinal}`);
  }

}

