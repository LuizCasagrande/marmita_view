import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base.service";
import {Tamanho} from "../tamanho/tamanho";

@Injectable({
  providedIn: 'root'
})
export class TamanhoService extends BaseService<Tamanho> {

  constructor(protected http: HttpClient) {
    super(http, 'tamanho');
  }
}
