import {Component, Injector, OnInit} from '@angular/core';
import {Router} from '@angular/router';
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
import {BaseForm} from "../service/base.form";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'app-comida-form',
    templateUrl: './comida-form.component.html',
    styleUrls: []
})
export class ComidaFormComponent extends BaseForm<Comida> implements OnInit {

    ingredienteListSuggestions: SelectItem[];
    ingredientesList: Ingrediente[] = [];
    tipoListSuggestions: SelectItem[];
    tipoList: Tipo[] = [];

    constructor(public injector: Injector,
                private comidaService: ComidaService,
                private router: Router,
                private messageService: MessageService,
                private ingredienteService: IngredienteService,
                private tipoService: TipoService,
                private fb: FormBuilder) {
      super(injector, comidaService);

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
    this.form = this.fb.group({
      'id': new FormControl(''),
      'comida': new FormControl('', Validators.required),
      'ingredientesList': new FormControl('', Validators.required),
      'tipoList': new FormControl('', Validators.required),
      'inativo': new FormControl(''),
    });
  }

  protected postEdit(res: Comida): void {
    this.ingredientesList = [];
    for (const comidaIngrediente of this.objeto.ingredientesList) {
      this.ingredientesList.push(comidaIngrediente.ingrediente);
    }
    this.form.controls['ingredientesList'].setValue(this.ingredientesList);
    this.tipoList = [];
    for (const tipoComida of this.objeto.tipoList) {
      this.tipoList.push(tipoComida.tipo);
    }
    this.form.controls['tipoList'].setValue(this.tipoList);
  }

  salvar(): void {
    this.objeto.ingredientesList = [];
    for (const ingrediente of this.form.controls.ingredientesList.value) {
      const comidaIngrediente = new ComidaIngrediente();
      comidaIngrediente.ingrediente = ingrediente;
      this.objeto.ingredientesList.push(comidaIngrediente);
    }
    this.objeto.tipoList = [];
    for (const tipo of this.form.controls.tipoList.value) {
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

  onSubmit(value: Comida) {
    this.objeto = value;
    this.salvar();
  }

}

