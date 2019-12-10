import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base.service";
import {Favorito} from "../favorito/Favorito";

@Injectable({
  providedIn: 'root'
})
export class FavoritaService extends BaseService<Favorito>{

  constructor(protected http: HttpClient) {
    super(http, 'favorito');
  }
}
