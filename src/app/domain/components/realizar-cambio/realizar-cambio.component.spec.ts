import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarCambioComponent } from './realizar-cambio.component';

describe('RealizarCambioComponent', () => {
  let component: RealizarCambioComponent;
  let fixture: ComponentFixture<RealizarCambioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizarCambioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizarCambioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
