import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Cliente} from '../cliente/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseService<Cliente> {

  constructor(protected http: HttpClient) {
    super(http, 'cliente');
  }
}
