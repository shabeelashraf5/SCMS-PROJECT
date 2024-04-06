import { TestBed } from '@angular/core/testing';

import { AddQuotationService } from './add-quotation.service';

describe('AddQuotationService', () => {
  let service: AddQuotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddQuotationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
