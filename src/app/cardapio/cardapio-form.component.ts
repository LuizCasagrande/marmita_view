import {Component, Injector, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService, SelectItem} from 'primeng';
import {Cardapio} from './cardapio';
import {CardapioService} from '../service/cardapio.service';
import {Comida} from "../comida/comida";
import {ComidaService} from "../service/comida.service";
import {CardapioComida} from "./cardapioComida";
import {BaseForm} from "../service/base.form";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-cardapio-form',
  templateUrl: './cardapio-form.component.html',
  styleUrls: []
})
export class CardapioFormComponent extends BaseForm<Cardapio> implements OnInit {

  diaOpcao: SelectItem[];
  comidaListSuggestions: SelectItem[];
  comidaList: Comida[] = [];

  constructor(public injector: Injector,
              private cardapioService: CardapioService,
              private router: Router,
              private messageService: MessageService,
              private comidaService: ComidaService,
              private fb: FormBuilder) {
    super(injector, cardapioService);
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
    this.form = this.fb.group({
      'id': new FormControl(''),
      'inativo': new FormControl(''),
      'cardapio': new FormControl('', Validators.required),
      'diaSemana': new FormControl('', Validators.required),
      'cardapioComidaList': new FormControl('', Validators.required),
    });
  }

  protected postEdit(res: Cardapio): void {
    this.comidaList = [];
    for (const comida of this.objeto.cardapioComidaList) {
      this.comidaList.push(comida.comida);
    }
    this.form.controls['cardapioComidaList'].setValue(this.comidaList);
  }

  salvar(): void {
    this.objeto.cardapioComidaList = [];
    for (const comida of this.form.controls.cardapioComidaList.value) {
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

  onSubmit(value: Cardapio) {
    this.objeto = value;
    this.salvar();
  }

  voltar() {
    this.router.navigateByUrl('cardapio')
  }
}
