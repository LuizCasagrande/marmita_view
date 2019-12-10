import {Cliente} from "../cliente/cliente";
import {Ingrediente} from "../ingrediente/ingrediente";

export class Alergia {
  id: number;
  cliente: Cliente;
  ingredienteList: Ingrediente[];

}
