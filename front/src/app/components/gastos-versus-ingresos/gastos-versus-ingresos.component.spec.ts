import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosVersusIngresosComponent } from './gastos-versus-ingresos.component';

describe('GastosVersusIngresosComponent', () => {
  let component: GastosVersusIngresosComponent;
  let fixture: ComponentFixture<GastosVersusIngresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GastosVersusIngresosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GastosVersusIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
