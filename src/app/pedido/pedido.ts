import {Cliente} from "../cliente/cliente";
import {TamanhoPedido} from "./tamanho-pedido/tamanho-pedido";

export class Pedido {
id: number;
data: Date;
tamanhoPedidoList: TamanhoPedido[];
cliente: Cliente;
totalPedido: number;
status: boolean = true;
pago: boolean;
}
