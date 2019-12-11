import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService, SelectItem} from 'primeng';
import {Cardapio} from './cardapio';
import {CardapioService} from '../service/cardapio.service';
import {Comida} from "../comida/comida";
import {ComidaService} from "../service/comida.service";
import {ComidaIngrediente} from "../comida/comidaIngrediente";
import {CardapioComida} from "./cardapioComida";

@Component({
  selector: 'app-cardapio-form',
  templateUrl: './cardapio-form.component.html',
  styleUrls: []
})
export class CardapioFormComponent implements OnInit {

  objeto: Cardapio;
  diaOpcao: SelectItem[];
  comidaListSuggestions: SelectItem[];
  comidaList: Comida[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private cardapioService: CardapioService,
              private router: Router,
              private messageService: MessageService,
              private comidaService: ComidaService) {
    this.diaOpcao = [
      {label: 'Selecione:', value: null},
      {label:'Segunda', value: 'SEGUNDA'},
      {label:'Terça', value: 'TERCA'},
      {label:'Quarta', value: 'QUARTA'},
      {label:'Quinta', value: 'QUINTA'},
      {label:'Sexta', value: 'SEXTA'},
    ];

    this.comidaService.findAtivos().subscribe(res => {
      this.comidaListSuggestions = res.map(comida => {
        return {label: comida.comida, value: comida};
      });
    });

  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      if (params.has('id')) {
        this.cardapioService.findOne(parseInt(params.get('id'))).subscribe(res => {
          this.objeto = res;
          this.postEdit(res);
        });
      } else {
        this.resetaForm();
      }
    });
  }

  protected postEdit(res: Cardapio): void {
    this.comidaList = [];
    for (const comida of this.objeto.cardapioComidaList) {
      this.comidaList.push(comida.comida);
    }
    // this.form.controls['comidaList'].setValue(this.comidaList);
  }

  salvar(): void {

    this.objeto.cardapioComidaList = [];
    for (const comida of this.comidaList) {
      const comidaCardapio = new CardapioComida();
      comidaCardapio.comida = comida;
      this.objeto.cardapioComidaList.push(comidaCardapio);
    }

    this.cardapioService.save(this.objeto).subscribe(res => {
      this.objeto = res;

      this.messageService.add({
        severity: 'success',
        summary: 'Salvo com sucesso!'
      });

      this.router.navigateByUrl('cardapio');
    }, erro => {
      this.messageService.add({
        severity: 'error',
        summary: erro.error.message
      });
    });
  }

  private resetaForm(): void {
    this.objeto = new Cardapio();
  }

}
