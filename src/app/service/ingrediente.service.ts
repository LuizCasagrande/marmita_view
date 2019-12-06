import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Ingrediente} from '../ingrediente/ingrediente';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService extends BaseService<Ingrediente> {

  constructor(protected http: HttpClient) {
    super(http, 'ingrediente');
  }
}
