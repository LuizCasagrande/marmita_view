import {Component, OnInit} from "@angular/core";
import {TipoService} from "../service/tipo.service";
import {Tipo} from "./tipo";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng";

@Component({
  selector: 'app-tipo-form',
  templateUrl: './tipo-form.component.html',
  styleUrls: []
})
export class TipoFormComponent implements OnInit {

  objeto: Tipo;

  constructor(private activatedRoute: ActivatedRoute,
              private tipoService: TipoService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      if (params.has('id')) {
        this.tipoService.findOne(parseInt(params.get('id'))).subscribe(res => {
          this.objeto = res;
        });
      } else {
        this.resetaForm();
      }
    });
  }

  salvar(): void {
    this.tipoService.save(this.objeto).subscribe(res => {
      this.objeto = res;

      this.messageService.add({
        severity: 'success',
        summary: 'Salvo com sucesso!'
      });

      this.router.navigateByUrl('tipo');
    }, erro => {
      this.messageService.add({
        severity: 'error',
        summary: erro.error.message
      });
    });
  }

  private resetaForm(): void {
    this.objeto = new Tipo();
  }

}
