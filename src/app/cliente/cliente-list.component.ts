import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng';
import {Title} from '@angular/platform-browser';
import {ListComponent} from '../component/list.component';
import {Cliente} from './cliente';
import {ClienteService} from '../service/cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: []
})
export class ClienteListComponent extends ListComponent<Cliente> implements OnInit {

  constructor(private clienteService: ClienteService,
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
    this.clienteService.findAll().subscribe(res => {
      this.lista = res;
      setTimeout(() => this.loading = false);
    });
  }

  excluir(id: number): void {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir esse cliente?',
      accept: () => this.deletar(id),
      acceptLabel: 'SIM',
      rejectLabel: 'NÃO',
    });
  }

  private deletar(id: number): void {
    this.loading = true;
    this.clienteService.delete(id).subscribe(() => {
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
