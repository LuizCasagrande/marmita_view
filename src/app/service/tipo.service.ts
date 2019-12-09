import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Tipo} from "../tipo/tipo";

@Injectable({
  providedIn: 'root'
})
export class TipoService extends BaseService<Tipo> {

  constructor(protected http: HttpClient) {
    super(http, 'tipo');
  }
}
