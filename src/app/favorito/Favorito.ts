import {Cliente} from "../cliente/cliente";
import {Comida} from "../comida/comida";
export class Favorito {
  id: number;
  cliente: Cliente;
  comidaList: Comida[];

  constructor() {
    this.comidaList = new Array<Comida>();
  }
}
