import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ComidaService} from '../service/comida.service';
import {MessageService} from 'primeng';
import {Comida} from './comida';
import {IngredienteService} from '../service/ingrediente.service';
import {SelectItem} from 'primeng/api/selectitem';
import {TipoService} from "../service/tipo.service";

@Component({
    selector: 'app-comida-form',
    templateUrl: './comida-form.component.html',
    styleUrls: []
})
export class ComidaFormComponent implements OnInit {

    objeto: Comida;
    ingredienteListSuggestions: SelectItem[];
    tipoListSuggestions: SelectItem[];

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
        })
    }

    ngOnInit() {
        this.activatedRoute.queryParamMap.subscribe(params => {
            if (params.has('id')) {
                this.comidaService.findOne(parseInt(params.get('id'))).subscribe(res => {
                    this.objeto = res;
                });
            } else {
                this.resetaForm();
            }
        });
    }

    salvar(): void {
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
        this.objeto.ingredientesList = [];
        this.objeto.tipoList = [];
    }
}

