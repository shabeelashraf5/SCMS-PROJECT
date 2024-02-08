import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdProductComponent } from './ad-product.component';

describe('AdProductComponent', () => {
  let component: AdProductComponent;
  let fixture: ComponentFixture<AdProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
