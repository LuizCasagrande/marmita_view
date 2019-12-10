import {Component, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng';
import {Tamanho} from './tamanho';
import {TamanhoService} from '../service/tamanho.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BaseForm} from "../service/base.form";

@Component({
  selector: 'app-tamanho',
  templateUrl: './tamanho-form.component.html',
  styleUrls: []
})
export class TamanhoFormComponent extends BaseForm<Tamanho> implements OnInit {

  submitted: boolean;

  constructor(public injector: Injector,
              private tamanhoService: TamanhoService,
              private router: Router,
              private messageService: MessageService,
              private fb: FormBuilder) {
    super(injector, tamanhoService);
  }

  ngOnInit() {
    this.form = this.fb.group({
      'id': new FormControl(''),
      'peso': new FormControl('', Validators.required),
      'inativo': new FormControl(''),
      'preco': new FormControl('', Validators.required),
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

  onSubmit(value: Tamanho) {
    this.objeto = value;
    this.salvar();
  }
}
