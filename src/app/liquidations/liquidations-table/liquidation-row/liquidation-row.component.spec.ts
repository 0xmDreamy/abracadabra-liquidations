import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidationRowComponent } from './liquidation-row.component';

describe('LiquidationRowComponent', () => {
  let component: LiquidationRowComponent;
  let fixture: ComponentFixture<LiquidationRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiquidationRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiquidationRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
