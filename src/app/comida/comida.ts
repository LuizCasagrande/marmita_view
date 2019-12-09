import {ComidaIngrediente} from './comidaIngrediente';
import {TipoComida} from './tipoComida';

export class Comida {
  id: number;
  comida: string;
  ingredientesList: ComidaIngrediente[];
  tipoList: TipoComida[];
  inativo: boolean = false;

  constructor() {
   this.ingredientesList = new Array<ComidaIngrediente>();
    this.tipoList = new Array<TipoComida>();
  }
}
