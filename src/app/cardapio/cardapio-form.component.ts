import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng';
import {Cardapio} from './Cardapio';
import {CardapioService} from '../service/cardapio.service';

@Component({
  selector: 'app-cardapio-form',
  templateUrl: './cardapio-form.component.html',
  styleUrls: []
})
export class CardapioFormComponent implements OnInit {

  objeto: Cardapio;

  constructor(private activatedRoute: ActivatedRoute,
              private cardapioService: CardapioService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      if (params.has('id')) {
        this.cardapioService.findOne(parseInt(params.get('id'))).subscribe(res => {
          this.objeto = res;
        });
      } else {
        this.resetaForm();
      }
    });
  }

  salvar(): void {
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
