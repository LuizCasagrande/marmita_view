import {Component, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng';
import {Cliente} from './cliente';
import {ClienteService} from '../service/cliente.service';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {BaseForm} from "../service/base.form";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: []
})
export class ClienteFormComponent extends BaseForm<Cliente> implements OnInit {

  submitted: boolean;

  constructor(public injector: Injector,
              private clienteService: ClienteService,
              private router: Router,
              private messageService: MessageService,
              private fb: FormBuilder) {
    super(injector, clienteService);
  }

  ngOnInit() {
    this.form = this.fb.group({
      'id': new FormControl(''),
      'nome': new FormControl('', Validators.required),
      'cpf': new FormControl('', Validators.required),
      'senha': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'telefone': new FormControl('', Validators.required),
      'logradouro': new FormControl('', Validators.required),
      'numero': new FormControl('', Validators.required),
      'bairro': new FormControl('', Validators.required),
      'cep': new FormControl('', Validators.required),
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

  onSubmit(value: Cliente) {
    this.objeto = value;
    this.salvar();
  }

}
