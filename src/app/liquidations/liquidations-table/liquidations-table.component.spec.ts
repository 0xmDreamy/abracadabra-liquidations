import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidationsTableComponent } from './liquidations-table.component';

describe('LiquidationsTableComponent', () => {
  let component: LiquidationsTableComponent;
  let fixture: ComponentFixture<LiquidationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiquidationsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiquidationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
