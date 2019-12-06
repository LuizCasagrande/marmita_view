import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng';
import {Tamanho} from './tamanho';
import {TamanhoService} from '../service/tamanho.service';

@Component({
  selector: 'app-tamanho',
  templateUrl: './tamanho-form.component.html',
  styleUrls: []
})
export class TamanhoFormComponent implements OnInit {

  objeto: Tamanho;

  constructor(private activatedRoute: ActivatedRoute,
              private tamanhoService: TamanhoService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      if (params.has('id')) {
        this.tamanhoService.findOne(parseInt(params.get('id'))).subscribe(res => {
          this.objeto = res;
        });
      } else {
        this.resetaForm();
      }
    });
  }

  salvar(): void {
    this.tamanhoService.save(this.objeto).subscribe(res => {
      this.objeto = res;

      this.messageService.add({
        severity: 'success',
        summary: 'Salvo com sucesso!'
      });

      this.router.navigateByUrl('tamanho');
    }, erro => {
      this.messageService.add({
        severity: 'error',
        summary: erro.error.message
      });
    });
  }

  private resetaForm(): void {
    this.objeto = new Tamanho();
  }

}
