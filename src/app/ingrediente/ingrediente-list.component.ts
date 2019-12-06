import { Component, OnInit } from '@angular/core';
import {Ingrediente} from './ingrediente';
import {ListComponent} from '../component/list.component';
import {ConfirmationService, MessageService} from 'primeng';
import {Title} from '@angular/platform-browser';
import {IngredienteService} from '../service/ingrediente.service';

@Component({
  selector: 'app-ingrediente-list',
  templateUrl: './ingrediente-list.component.html',
  styleUrls: []
})
export class IngredienteListComponent extends ListComponent<Ingrediente> implements OnInit {

  constructor(private ingredienteService: IngredienteService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private titleService: Title) {
    super();
  }

  ngOnInit() {
    this.titleService.setTitle('Lista de Ingredientes');
    this.carregarLista();
  }

  carregarLista(): void {
    this.loading = true;
    this.ingredienteService.findAll().subscribe(res => {
      this.lista = res;
      setTimeout(() => this.loading = false);
    });
  }

  excluir(id: number): void {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir esse ingrediente?',
      accept: () => this.deletar(id),
      acceptLabel: 'SIM',
      rejectLabel: 'NÃO',
    });
  }

  private deletar(id: number): void {
    this.loading = true;
    this.ingredienteService.delete(id).subscribe(() => {
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

