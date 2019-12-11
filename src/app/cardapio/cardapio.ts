import {CardapioComida} from "./cardapioComida";
import {DiaSemana} from "./diaSemana";

export class Cardapio {
  id: number;
  cardapio: string;
  inativo: boolean;
  diaSemana: DiaSemana;
  cardapioComidaList: CardapioComida[];

}
