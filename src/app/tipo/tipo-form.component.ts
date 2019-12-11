import {Component, Injector, OnInit} from "@angular/core";
import {TipoService} from "../service/tipo.service";
import {Tipo} from "./tipo";
import {Router} from "@angular/router";
import {MessageService} from "primeng";
import {BaseForm} from "../service/base.form";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-tipo-form',
  templateUrl: './tipo-form.component.html',
  styleUrls: []
})
export class TipoFormComponent extends BaseForm<Tipo> implements OnInit {

  objeto: Tipo;

  constructor(public injector: Injector,
              private tipoService: TipoService,
              private router: Router,
              private messageService: MessageService,
              private fb: FormBuilder) {
    super(injector, tipoService);
  }

  ngOnInit() {
    this.form = this.fb.group({
      'id': new FormControl(''),
      'tipoComida': new FormControl('', Validators.required),
      'inativo': new FormControl(''),
    });
  }

  salvar(): void {
    this.tipoService.save(this.objeto).subscribe(res => {
      this.objeto = res;

      this.messageService.add({
        severity: 'success',
        summary: 'Salvo com sucesso!'
      });

      this.router.navigateByUrl('tipo');
    }, erro => {
      this.messageService.add({
        severity: 'error',
        summary: erro.error.message
      });
    });
  }

  onSubmit(value: Tipo) {
    this.objeto = value;
    this.salvar();
  }

}
