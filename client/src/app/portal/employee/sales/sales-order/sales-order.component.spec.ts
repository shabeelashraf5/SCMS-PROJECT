import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderComponent } from './sales-order.component';

describe('SalesOrderComponent', () => {
  let component: SalesOrderComponent;
  let fixture: ComponentFixture<SalesOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
