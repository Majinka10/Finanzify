import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribucionGastosComponent } from './distribucion-gastos.component';

describe('DistribucionGastosComponent', () => {
  let component: DistribucionGastosComponent;
  let fixture: ComponentFixture<DistribucionGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistribucionGastosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistribucionGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
