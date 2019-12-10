import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base.service";
import {Detestada} from "../detestada/Detestada";

@Injectable({
  providedIn: 'root'
})
export class DetestadaService extends BaseService<Detestada>{

  constructor(protected http: HttpClient) {
    super(http, 'detestada');
  }
}
