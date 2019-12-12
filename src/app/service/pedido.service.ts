import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Pedido} from "../pedido/pedido";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends  BaseService<Pedido>{

  constructor(protected http: HttpClient) {
    super(http, 'pedido');
  }

  // pagar(id: number) {
  //   return this.http.get(this.getUrl() + "/pago/" + id).subscribe();
  // }
  //
  // cancelar(id: number) {
  //   return this.http.get(this.getUrl() + "/cancelado/" + id).subscribe();
  // }

}
