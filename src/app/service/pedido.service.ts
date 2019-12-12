import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Pedido} from "../pedido/pedido";
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends  BaseService<Pedido>{

  constructor(protected http: HttpClient) {
    super(http, 'pedido');
  }

  pagar(id: number): Observable<void> {
    return this.http.get<void>(this.getUrl() + "/pago/" + id);
  }

  cancelar(id: number): Observable<void> {
    return this.http.get<void>(this.getUrl() + "/cancelado/" + id);
  }

}
