import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmDashboardComponent } from './em-dashboard.component';

describe('EmDashboardComponent', () => {
  let component: EmDashboardComponent;
  let fixture: ComponentFixture<EmDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
