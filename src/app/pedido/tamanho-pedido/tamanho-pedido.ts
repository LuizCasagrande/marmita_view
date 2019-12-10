import {Tamanho} from "../../tamanho/tamanho";
import {Pedido} from "../pedido";

export class TamanhoPedido {
  id:number;
  tamanho:Tamanho;
  pedido:Pedido;
  quantidade: number;
  preco: number;
}
