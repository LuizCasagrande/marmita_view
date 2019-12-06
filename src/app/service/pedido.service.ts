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
}
