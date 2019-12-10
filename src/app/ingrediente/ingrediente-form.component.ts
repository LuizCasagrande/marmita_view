import {Component, Injector, OnInit} from '@angular/core';
import {Ingrediente} from './ingrediente';
import {IngredienteService} from '../service/ingrediente.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {BaseForm} from "../service/base.form";

@Component({
  selector: 'app-ingrediente-form',
  templateUrl: './ingrediente-form.component.html',
  styleUrls: []
})
export class IngredienteFormComponent extends BaseForm<Ingrediente> implements OnInit {

  submitted: boolean;

  constructor(public injector: Injector,
              private ingredienteService: IngredienteService,
              private router: Router,
              private messageService: MessageService,
              private fb: FormBuilder) {
    super(injector, ingredienteService);
  }

  ngOnInit() {
    this.form = this.fb.group({
      'id': new FormControl(''),
      'ingredientes': new FormControl('', Validators.required),
      'inativo': new FormControl(''),
    });
  }

  salvar(): void {
    this.ingredienteService.save(this.objeto).subscribe(res => {
      this.objeto = res;

      this.messageService.add({
        severity: 'success',
        summary: 'Salvo com sucesso!'
      });

      this.router.navigateByUrl('ingrediente');
    }, erro => {
      this.messageService.add({
        severity: 'error',
        summary: erro.error.message
      });
    });
  }

  onSubmit(value: Ingrediente) {
    this.objeto = value;
    this.salvar();
  }

}
