import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeNbComponent } from './employee-nb.component';

describe('EmployeeNbComponent', () => {
  let component: EmployeeNbComponent;
  let fixture: ComponentFixture<EmployeeNbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeNbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeNbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
