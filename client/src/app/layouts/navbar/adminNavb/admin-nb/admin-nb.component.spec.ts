import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNBComponent } from './admin-nb.component';

describe('AdminNBComponent', () => {
  let component: AdminNBComponent;
  let fixture: ComponentFixture<AdminNBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminNBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminNBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
