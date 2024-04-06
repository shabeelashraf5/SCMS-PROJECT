import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmDashboardComponent } from './adm-dashboard.component';

describe('AdmDashboardComponent', () => {
  let component: AdmDashboardComponent;
  let fixture: ComponentFixture<AdmDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
