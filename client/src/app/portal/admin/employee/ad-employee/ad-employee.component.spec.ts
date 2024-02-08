import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdEmployeeComponent } from './ad-employee.component';

describe('AdEmployeeComponent', () => {
  let component: AdEmployeeComponent;
  let fixture: ComponentFixture<AdEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
