import { TestBed } from '@angular/core/testing';

import { InvoiceDetailsService } from './invoice-details.service';

describe('InvoiceDetailsService', () => {
  let service: InvoiceDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
