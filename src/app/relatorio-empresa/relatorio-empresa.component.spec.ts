import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioEmpresaComponent } from './relatorio-empresa.component';

describe('RelatorioEmpresaComponent', () => {
  let component: RelatorioEmpresaComponent;
  let fixture: ComponentFixture<RelatorioEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
