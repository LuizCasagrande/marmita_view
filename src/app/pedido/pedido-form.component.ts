import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem, MessageService, SelectItem} from "primeng";
import {Pedido} from "./pedido";
import {PedidoService} from "../service/pedido.service";
import {TamanhoPedido} from "./tamanho-pedido";
import {FormComponent} from "../component/form.component";
import {TamanhoService} from "../service/tamanho.service";
import {Tamanho} from "../tamanho/tamanho";


@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: []
})
export class PedidoFormComponent extends FormComponent<Pedido> implements OnInit {

  tamanhos: Tamanho[];
  menuItem: MenuItem[];
  displayItem: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  diaOpcao: SelectItem[];
  total: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private pedidoService: PedidoService,
              private tamanhoService: TamanhoService,
              private router: Router,
              private messageService: MessageService) {
    super();
    this.diaOpcao = [
      {label: 'Selecione:', value: null},
      {label:'Segunda', value: 'SEGUNDA'},
      {label:'Terça', value: 'TERCA'},
      {label:'Quarta', value: 'QUARTA'},
      {label:'Quinta', value: 'QUINTA'},
      {label:'Sexta', value: 'SEXTA'},
    ];
    this.tamanhoService.findAll().subscribe(tamanhos => this.tamanhos = tamanhos);
    this.menuItem = [
      {
        label: 'Limpar',
        icon: 'pi pi-trash',
        command: () => this.limparItens(),
      }
    ];

  }

  private limparItens() {
    this.objeto.tamanhoPedidoList = [];
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      if (params.has('id')) {
        this.pedidoService.findOne(parseInt(params.get('id'))).subscribe(res => {
          this.objeto = res;
        });
      } else {
        this.resetaForm();
      }
    });
  }

  preSave(): void {
    const erros: string[] = [];
    if (!(this.objeto.tamanhoPedidoList.length > 0)) {
      erros.push('Adicione ao menos uma marmita!');
    }
    if (this.objeto.diaSemana == null) {
      erros.push('Informe o dia da semana!');
    }
    if (erros.length) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: erros[0],
      });
      throw new Error(erros[0]);
    }
  }

  salvar(): void {
    super.salvar();
    this.pedidoService.save(this.objeto).subscribe(res => {
      this.objeto = res;

      this.messageService.add({
        severity: 'success',
        summary: 'Salvo com sucesso!'
      });

      this.router.navigateByUrl('pedido');
    }, erro => {
      this.messageService.add({
        severity: 'error',
        summary: erro.error.message
      });
    });
  }

  resetaForm(): void {
    this.objeto = new Pedido();
    this.objeto.data = new Date();
    this.objeto.tamanhoPedidoList = [];
  }

  adicionaItem(tamanhoPedido: TamanhoPedido) {
    this.objeto.tamanhoPedidoList.push(tamanhoPedido);
    this.calcularTotal();
  }

  calcularTotal(): void {
    this.objeto.valorTotal = 0;
    for (const tamanhoPedido1 of this.objeto.tamanhoPedidoList) {
      this.objeto.valorTotal += tamanhoPedido1.valorTotal;
    }
  }

  novoItem() {
    this.displayItem = true;
  }

  excluir(rowIndex: number) {
    this.objeto.tamanhoPedidoList.splice(rowIndex, 1);
    this.calcularTotal();
  }

}

