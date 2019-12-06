import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base.service";
import {Comida} from "../comida/comida";

@Injectable({
  providedIn: 'root'
})
export class ComidaService  extends BaseService<Comida>  {

  constructor(protected http: HttpClient) {
    super(http, 'comida');
  }
}
