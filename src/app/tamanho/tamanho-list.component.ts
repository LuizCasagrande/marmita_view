import {Component, OnInit} from '@angular/core';
import {ListComponent} from '../component/list.component';
import {Tamanho} from './tamanho';
import {ConfirmationService, MessageService} from 'primeng';
import {Title} from '@angular/platform-browser';
import {TamanhoService} from '../service/tamanho.service';

@Component({
  selector: 'app-tamanho-list',
  templateUrl: './tamanho-list.component.html',
  styleUrls: []
})
export class TamanhoListComponent extends ListComponent<Tamanho> implements OnInit {

  constructor(private tamanhoService: TamanhoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private titleService: Title) {
    super();
  }

  ngOnInit() {
    this.titleService.setTitle('Lista de Tamanhos');
    this.carregarLista();
  }

  carregarLista(): void {
    this.loading = true;
    this.tamanhoService.findAll().subscribe(res => {
      this.lista = res;
      setTimeout(() => this.loading = false);
    });
  }

  excluir(id: number): void {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir esse tamanho?',
      accept: () => this.deletar(id),
      acceptLabel: 'SIM',
      rejectLabel: 'NÃO',
    });
  }

  private deletar(id: number): void {
    this.loading = true;
    this.tamanhoService.delete(id).subscribe(() => {
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

