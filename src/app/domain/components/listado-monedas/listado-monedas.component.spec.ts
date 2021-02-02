import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMonedasComponent } from './listado-monedas.component';

describe('ListadoMonedasComponent', () => {
  let component: ListadoMonedasComponent;
  let fixture: ComponentFixture<ListadoMonedasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoMonedasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoMonedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
