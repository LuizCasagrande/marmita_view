import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng';
import {TipoComidaService} from '../service/tipo-comida.service';
import {TipoComida} from '../comida/tipoComida';
import {Tipo} from './tipo';

@Component({
  selector: 'app-tipo-comida-list',
  templateUrl: './tipo-comida-form.component.html',
  styleUrls: []
})
export class TipoComidaFormComponent implements OnInit {

  objeto: TipoComida;

  constructor(private activatedRoute: ActivatedRoute,
              private tipoComidaService: TipoComidaService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      if (params.has('id')) {
        this.tipoComidaService.findOne(parseInt(params.get('id'))).subscribe(res => {
          this.objeto = res;
        });
      } else {
        this.resetaForm();
      }
    });
  }

  salvar(): void {
    this.tipoComidaService.save(this.objeto).subscribe(res => {
      this.objeto = res;

      this.messageService.add({
        severity: 'success',
        summary: 'Salvo com sucesso!'
      });

      this.router.navigateByUrl('tipo-comida');
    }, erro => {
      this.messageService.add({
        severity: 'error',
        summary: erro.error.message
      });
    });
  }

  private resetaForm(): void {
    this.objeto = new TipoComida();
  }

}
