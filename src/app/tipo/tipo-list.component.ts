import {Component, OnInit} from "@angular/core";
import {ListComponent} from "../component/list.component";
import {Tipo} from "./tipo";
import {TipoService} from "../service/tipo.service";
import {ConfirmationService, MessageService} from "primeng";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-tipo-list',
  templateUrl: './tipo-list.component.html',
  styleUrls: []
})
export class TipoListComponent extends ListComponent<Tipo> implements OnInit {

  constructor(private tipoService: TipoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private titleService: Title) {
    super();
  }

  ngOnInit() {
    this.titleService.setTitle('Lista de Tipos de Comida');
    this.carregarLista();
  }

  carregarLista(): void {
    this.loading = true;
    this.tipoService.findAll().subscribe(res => {
      this.lista = res;
      setTimeout(() => this.loading = false);
    });
  }

  excluir(id: number): void {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir esse tipo?',
      accept: () => this.deletar(id),
      acceptLabel: 'SIM',
      rejectLabel: 'NÃO',
    });
  }

  private deletar(id: number): void {
    this.loading = true;
    this.tipoService.delete(id).subscribe(() => {
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

