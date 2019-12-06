import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng';
import {Cliente} from './cliente';
import {ClienteService} from '../service/cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: []
})
export class ClienteFormComponent implements OnInit {

  objeto: Cliente;

  constructor(private activatedRoute: ActivatedRoute,
              private clienteService: ClienteService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      if (params.has('id')) {
        this.clienteService.findOne(parseInt(params.get('id'))).subscribe(res => {
          this.objeto = res;
        });
      } else {
        this.resetaForm();
      }
    });
  }

  salvar(): void {
    this.clienteService.save(this.objeto).subscribe(res => {
      this.objeto = res;

      this.messageService.add({
        severity: 'success',
        summary: 'Salvo com sucesso!'
      });

      this.router.navigateByUrl('cliente');
    }, erro => {
      this.messageService.add({
        severity: 'error',
        summary: erro.error.message
      });
    });
  }

  private resetaForm(): void {
    this.objeto = new Cliente();
  }

}
