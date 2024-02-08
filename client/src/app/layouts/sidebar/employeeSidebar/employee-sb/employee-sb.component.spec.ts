import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSbComponent } from './employee-sb.component';

describe('EmployeeSbComponent', () => {
  let component: EmployeeSbComponent;
  let fixture: ComponentFixture<EmployeeSbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeSbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeSbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
