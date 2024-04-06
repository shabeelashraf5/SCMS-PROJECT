import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPoComponent } from './client-po.component';

describe('ClientPoComponent', () => {
  let component: ClientPoComponent;
  let fixture: ComponentFixture<ClientPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientPoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
