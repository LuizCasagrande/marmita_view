import {FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {BaseService} from "./base.service";
import {Injector} from "@angular/core";

export abstract class BaseForm<T> {
  public form: FormGroup;
  public objeto: T;

  protected constructor(public injector: Injector, private baseService: BaseService<T>) {
    this.injector.get(ActivatedRoute).queryParamMap.subscribe(params => {
      if (params.has('id')) {
        this.baseService.findOne(parseInt(params.get('id'))).subscribe(res => {
          this.objeto = res;
          Object.keys(res).forEach(name => {
            if (this.form.controls[name]) {
              this.form.controls[name].setValue(res[name]);
            }
          });
          this.postEdit(res);
        });
      } else {
        this.resetaForm();
      }
    });
  }

  protected postEdit(res: T): void {}

  protected resetaForm(): void {
    this.objeto = {} as T;
  }

}
