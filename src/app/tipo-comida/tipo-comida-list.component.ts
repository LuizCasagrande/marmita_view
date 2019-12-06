import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng';
import {Title} from '@angular/platform-browser';
import {ListComponent} from '../component/list.component';
import {TipoComidaService} from '../service/tipo-comida.service';
import {TipoComida} from '../comida/tipoComida';

@Component({
  selector: 'app-tipo-comida',
  templateUrl: './tipo-comida-list.component.html',
  styleUrls: []
})
export class TipoComidaListComponent extends ListComponent<TipoComida> implements OnInit {

  constructor(private tipoComidaService: TipoComidaService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private titleService: Title) {
    super();
  }

  ngOnInit() {
    this.titleService.setTitle('Tipos de Comida');
    this.carregarLista();
  }

  carregarLista(): void {
    this.loading = true;
    this.tipoComidaService.findAll().subscribe(res => {
      this.lista = res;
      setTimeout(() => this.loading = false);
    });
  }

  excluir(id: number): void {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir esse tipo de comida?',
      accept: () => this.deletar(id),
      acceptLabel: 'SIM',
      rejectLabel: 'NÃO',
    });
  }

  private deletar(id: number): void {
    this.loading = true;
    this.tipoComidaService.delete(id).subscribe(() => {
      this.carregarLista();

      this.messageService.add({
        severity: 'success',
        summary: 'Deletado com sucesso!'
      });
      setTimeout(() => this.loading = false);
    }, error => {
      this.messageService.add({
        severity: 'error',
        summary: error.error.message
      });
      setTimeout(() => this.loading = false);
    });
  }

}
