import {Component, OnInit} from '@angular/core';

import {ComidaService} from '../service/comida.service';
import {ListComponent} from '../component/list.component';
import {Comida} from './comida';
import {ConfirmationService, MessageService} from 'primeng';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-comida-list',
  templateUrl: './comida-list.component.html',
  styleUrls: []
})
export class ComidaListComponent extends ListComponent<Comida> implements OnInit {

  constructor(private comidaService: ComidaService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private titleService: Title) {
    super();
  }

  ngOnInit() {
    this.titleService.setTitle('Lista de Comidas');
    this.carregarLista();
  }

  carregarLista(): void {
    this.loading = true;
    this.comidaService.findAll().subscribe(res => {
      this.lista = res;
      setTimeout(() => this.loading = false);
    });
  }

  excluir(id: number): void {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir essa comida?',
      accept: () => this.deletar(id),
      acceptLabel: 'SIM',
      rejectLabel: 'NÃO',
    });
  }

  private deletar(id: number): void {
    this.loading = true;
    this.comidaService.delete(id).subscribe(() => {
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
