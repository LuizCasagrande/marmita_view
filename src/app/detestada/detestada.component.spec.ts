import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetestadaComponent } from './detestada.component';

describe('DetestadaComponent', () => {
  let component: DetestadaComponent;
  let fixture: ComponentFixture<DetestadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetestadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetestadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
