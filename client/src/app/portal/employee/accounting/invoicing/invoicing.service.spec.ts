import { TestBed } from '@angular/core/testing';

import { InvoicingService } from './invoicing.service';

describe('InvoicingService', () => {
  let service: InvoicingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoicingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
