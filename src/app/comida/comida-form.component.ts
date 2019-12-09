import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ComidaService} from '../service/comida.service';
import {MessageService} from 'primeng';
import {Comida} from './comida';
import {Ingrediente} from '../ingrediente/ingrediente';
import {TipoComida} from './tipoComida';
import {IngredienteService} from '../service/ingrediente.service';
import {TipoService} from '../service/tipo.service';
import {SelectItem} from 'primeng/api/selectitem';


@Component({
    selector: 'app-comida-form',
    templateUrl: './comida-form.component.html',
    styleUrls: []
})
export class ComidaFormComponent implements OnInit {

    objeto: Comida;
    objeto2: TipoComida;
    ingredienteListSuggestions: SelectItem[];
    selectedIngredientes1: Ingrediente[] = [];
    tipoList: SelectItem[];
    selectedTipos1: SelectItem[];

    constructor(private activatedRoute: ActivatedRoute,
                private comidaService: ComidaService,
                private router: Router,
                private messageService: MessageService,
                private ingredienteService: IngredienteService,
                private tipoComidaService: TipoService) {
        this.ingredienteService.findAll().subscribe(res => {
            this.ingredienteListSuggestions = res.map(ingrediente => {
                return {label: ingrediente.ingredientes, value: ingrediente};
            });
        });
        this.tipoComidaService.findAll().subscribe(res => {
            this.tipoList = res.map(value => {
                return {label: value.tipoComida, value: value};
            });
        });
    }

    ngOnInit() {
        this.activatedRoute.queryParamMap.subscribe(params => {
            if (params.has('id')) {

                this.comidaService.findOne(parseInt(params.get('id'))).subscribe(res => {
                    this.objeto = res;
                    // this.selectedIngredientes1 = [];
                    // for (const comidaIngrediente of this.objeto.ingredientesList) {
                    //   this.selectedIngredientes1.push(comidaIngrediente.ingrediente);
                    // }
                    // console.log(this.selectedIngredientes1);
                });

                // this.tipoComidaService.findOne(parseInt(params.get('id'))).subscribe(res => {
                //   this.objeto2 = res;
                //   this.selectedTipos1 = [];
                //   for (const comidaTipo of this.objeto.tipoList) {
                //     this.selectedTipos1.push(comidaTipo.tipo);
                //   }
                // });

            } else {
                this.resetaForm();
            }
        });
    }

    salvar(): void {
        // this.objeto.ingredientesList = [];
        // for (const ingrediente of this.selectedIngredientes1) {
        //   const comidaIngrediente = new ComidaIngrediente();
        //   comidaIngrediente.ingrediente = ingrediente;
        //   this.objeto.ingredientesList.push(comidaIngrediente);
        // }
        // console.log(this.objeto);
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
        this.objeto.comida = '';
        this.objeto.ingredientesList = [];
    }

}

