import {Cliente} from "../cliente/cliente";
import {TamanhoPedido} from "./tamanho-pedido";
import {DiaSemana} from "../cardapio/diaSemana";

export class Pedido {
  id: number;
  data: Date;
  diaSemana: DiaSemana;
  tamanhoPedidoList: TamanhoPedido[];
  cliente: Cliente;
  valorTotal: number;
  status: boolean = true;
  pago: boolean;

}
