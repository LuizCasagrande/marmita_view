import { Component, OnInit } from '@angular/core';
import {ListComponent} from '../component/list.component';
import {Cardapio} from './Cardapio';
import {CardapioService} from '../service/cardapio.service';
import {ConfirmationService, MessageService} from 'primeng';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-cardapio-list',
  templateUrl: './cardapio-list.component.html',
  styleUrls: []
})
export class CardapioListComponent extends ListComponent<Cardapio> implements OnInit {

  constructor(private cardapioService: CardapioService,
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
    this.cardapioService.findAll().subscribe(res => {
      this.lista = res;
      setTimeout(() => this.loading = false);
    });
  }

  excluir(id: number): void {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir esse cardapio?',
      accept: () => this.deletar(id),
      acceptLabel: 'SIM',
      rejectLabel: 'NÃO',
    });
  }

  private deletar(id: number): void {
    this.loading = true;
    this.cardapioService.delete(id).subscribe(() => {
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
