import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng';
import {Cliente} from './cliente';
import {ClienteService} from '../service/cliente.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: []
})
export class ClienteFormComponent implements OnInit {

  objeto: Cliente;
  userform: FormGroup;
  submitted: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private clienteService: ClienteService,
              private router: Router,
              private messageService: MessageService,
              private fb: FormBuilder) {
  }

  ngOnInit() {

    this.userform = this.fb.group({
      'nome': new FormControl('', Validators.required),
      'cpf': new FormControl('', Validators.required),
      'senha': new FormControl('', Validators.required),
      'telefone': new FormControl('', Validators.required),
      'logradouro': new FormControl('', Validators.required),
      'numero': new FormControl('', Validators.required),
      'bairro': new FormControl('', Validators.required),
      'cep': new FormControl('', Validators.required),
    });

    this.activatedRoute.queryParamMap.subscribe(params => {
      if (params.has('id')) {
        this.clienteService.findOne(parseInt(params.get('id'))).subscribe(res => {
          this.objeto = res;
          Object.keys(res).forEach(name => {
            if (this.userform.controls[name]) {
              this.userform.controls[name].setValue(res[name]);
            }
          });
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

  onSubmit(value: Cliente) {
    this.objeto = value;
    this.salvar();
  }

}
