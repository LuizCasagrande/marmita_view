import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ComidaService} from '../service/comida.service';
import {MessageService} from 'primeng';
import {Comida} from './comida';
import {IngredienteService} from '../service/ingrediente.service';
import {SelectItem} from 'primeng/api/selectitem';
import {TipoService} from "../service/tipo.service";
import {Ingrediente} from "../ingrediente/ingrediente";
import {ComidaIngrediente} from "./comidaIngrediente";
import {Tipo} from "../tipo/tipo";
import {TipoComida} from "./tipoComida";

@Component({
    selector: 'app-comida-form',
    templateUrl: './comida-form.component.html',
    styleUrls: []
})
export class ComidaFormComponent implements OnInit {

    objeto: Comida;
    ingredienteListSuggestions: SelectItem[];
    ingredientesList: Ingrediente[] = [];
    tipoListSuggestions: SelectItem[];
    tipoList: Tipo[] = [];

    constructor(private activatedRoute: ActivatedRoute,
                private comidaService: ComidaService,
                private router: Router,
                private messageService: MessageService,
                private ingredienteService: IngredienteService,
                private tipoService: TipoService) {

        this.ingredienteService.findAll().subscribe(res => {
            this.ingredienteListSuggestions = res.map(ingrediente => {
                return {label: ingrediente.ingredientes, value: ingrediente};
            });
        });

        this.tipoService.findAll().subscribe(res => {
          this.tipoListSuggestions = res.map(tipo => {
            return {label: tipo.tipoComida, value: tipo};
          })
        });
    }

    ngOnInit() {
        this.activatedRoute.queryParamMap.subscribe(params => {
            if (params.has('id')) {
                this.comidaService.findOne(parseInt(params.get('id'))).subscribe(res => {
                    this.objeto = res;
                  this.ingredientesList = [];
                  for (const comidaIngrediente of this.objeto.ingredientesList) {
                    this.ingredientesList.push(comidaIngrediente.ingrediente);
                  }
                  this.tipoList = [];
                  for (const tipoComida of this.objeto.tipoList) {
                    this.tipoList.push(tipoComida.tipo);
                  }
                });
            } else {
                this.resetaForm();
            }
        });
    }

    salvar(): void {
      this.objeto.ingredientesList = [];
      for (const ingrediente of this.ingredientesList) {
        const comidaIngrediente = new ComidaIngrediente();
        comidaIngrediente.ingrediente = ingrediente;
        this.objeto.ingredientesList.push(comidaIngrediente);
      }
      this.objeto.tipoList = [];
      for (const tipo of this.tipoList) {
        const tipoComida = new TipoComida();
        tipoComida.tipo = tipo;
        this.objeto.tipoList.push(tipoComida);
      }

      this.comidaService.save(this.objeto).subscribe(res => {
          this.objeto = res;

          this.messageService.add({
              severity: 'success',
              summary: 'Salvo com sucesso!'
          });

          this.router.navigateByUrl('comida');
      }, erro => {
          this.messageService.add({
              severity: 'error',
              summary: erro.error.message
          });
      });
    }

    private resetaForm(): void {
        this.objeto = new Comida();
        this.ingredientesList = [];
        this.tipoList = [];
    }
}

