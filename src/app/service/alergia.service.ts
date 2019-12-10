import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Alergia} from "../alergia/alergia";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AlergiaService extends BaseService<Alergia>{

  constructor(protected http: HttpClient) {
    super(http, 'alergia');
  }
}
