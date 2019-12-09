import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Cliente} from '../cliente/cliente';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseService<Cliente> {

  constructor(protected http: HttpClient) {
    super(http, 'cliente');
  }

  save(objeto: Cliente): Observable<Cliente> {
    objeto.cep = objeto.cep.replace('-','')
    objeto.telefone = objeto.telefone.replace(')', '')
      .replace('(','')
      .replace('-','')
      .replace(' ','');
    objeto.cpf = objeto.cpf.replace('-','')
      .replace(/\./g,'');
    // const str = objeto.cpf;
    // const res = str.replace(".", "");
    // objeto.cpf = res;
    // const str2 = objeto.cpf;
    // const res2 = str2.replace(".", "");
    // objeto.cpf = res2;
    return super.save(objeto);

  }
}
