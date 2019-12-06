import {Ingrediente} from '../ingrediente/ingrediente';
import {Comida} from './comida';

export class ComidaIngrediente {
  id: number;
  comida: Comida;
  ingrediente: Ingrediente;
}
