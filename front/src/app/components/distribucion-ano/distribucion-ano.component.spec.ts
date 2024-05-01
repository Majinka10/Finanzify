import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribucionAnoComponent } from './distribucion-ano.component';

describe('DistribucionAnoComponent', () => {
  let component: DistribucionAnoComponent;
  let fixture: ComponentFixture<DistribucionAnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistribucionAnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistribucionAnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
