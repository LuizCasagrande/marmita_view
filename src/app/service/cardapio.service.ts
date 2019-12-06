import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Cardapio} from '../cardapio/Cardapio';

@Injectable({
  providedIn: 'root'
})
export class CardapioService extends BaseService<Cardapio> {

  constructor(protected http: HttpClient) {
    super(http, 'cardapio');
  }
}
