import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPoComponent } from './add-po.component';

describe('AddPoComponent', () => {
  let component: AddPoComponent;
  let fixture: ComponentFixture<AddPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
