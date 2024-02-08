import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCategoryComponent } from './ad-category.component';

describe('AdCategoryComponent', () => {
  let component: AdCategoryComponent;
  let fixture: ComponentFixture<AdCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
