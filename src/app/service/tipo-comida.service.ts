import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {TipoComida} from '../comida/tipoComida';

@Injectable({
  providedIn: 'root'
})
export class TipoComidaService extends BaseService<TipoComida> {

  constructor(protected http: HttpClient) {
    super(http, 'tipo-comida');
  }
}
