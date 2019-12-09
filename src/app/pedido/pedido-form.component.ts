import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService, SelectItem} from "primeng";
import {Pedido} from "./pedido";
import {PedidoService} from "../service/pedido.service";
import {Tamanho} from "../tamanho/tamanho";
import {TamanhoService} from "../service/tamanho.service";


@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: []
})
export class PedidoFormComponent implements OnInit {
  objeto: Pedido;
  selectedTamanho: { label: number; value: Tamanho }[];


  constructor(private activatedRoute: ActivatedRoute,
              private pedidoService: PedidoService,
              private tamanhoService: TamanhoService,
              private router: Router,
              private messageService: MessageService) {
    this.tamanhoService.findAll().subscribe(res => {
      this.selectedTamanho = res.map(tamanho => {
        return {label: tamanho.peso, value: tamanho};
      });
    });
  }

  ngOnInit() {
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


  salvar(): void {
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

   private resetaForm(): void {
    this.objeto = new Pedido();
  }

}
