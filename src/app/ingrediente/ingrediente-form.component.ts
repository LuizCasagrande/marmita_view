import { Component, OnInit } from '@angular/core';
import {Ingrediente} from './ingrediente';
import {IngredienteService} from '../service/ingrediente.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng';

@Component({
  selector: 'app-ingrediente-form',
  templateUrl: './ingrediente-form.component.html',
  styleUrls: []
})
export class IngredienteFormComponent implements OnInit {

  objeto: Ingrediente;

  constructor(private activatedRoute: ActivatedRoute,
              private ingredienteService: IngredienteService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      if (params.has('id')) {
        this.ingredienteService.findOne(parseInt(params.get('id'))).subscribe(res => {
          this.objeto = res;
        });
      } else {
        this.resetaForm();
      }
    });
  }

  salvar(): void {
    this.ingredienteService.save(this.objeto).subscribe(res => {
      this.objeto = res;

      this.messageService.add({
        severity: 'success',
        summary: 'Salvo com sucesso!'
      });

      this.router.navigateByUrl('ingrediente');
    }, erro => {
      this.messageService.add({
        severity: 'error',
        summary: erro.error.message
      });
    });
  }

  private resetaForm(): void {
    this.objeto = new Ingrediente();
  }

}
