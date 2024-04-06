import { TestBed } from '@angular/core/testing';

import { AddPoService } from './add-po.service';

describe('AddPoService', () => {
  let service: AddPoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
