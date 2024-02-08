import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSbComponent } from './admin-sb.component';

describe('AdminSbComponent', () => {
  let component: AdminSbComponent;
  let fixture: ComponentFixture<AdminSbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
