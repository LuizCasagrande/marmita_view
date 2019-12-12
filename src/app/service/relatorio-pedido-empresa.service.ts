import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {RelatorioPedidoEmpresa} from "../relatorio-empresa/RelatorioPedidoEmpresa";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RelatorioPedidoEmpresaService extends BaseService<RelatorioPedidoEmpresa>{

  constructor(protected http: HttpClient) {
    super(http, 'relatorio');
  }

  getRelatorioEmpresa(): Observable<RelatorioPedidoEmpresa[]>{
    return this.http.get<RelatorioPedidoEmpresa[]>(`${this.getUrl()}/pedido-empresa`);
  }

}
