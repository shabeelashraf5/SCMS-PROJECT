import { TestBed } from '@angular/core/testing';

import { FinancialTransactionService } from './financial-transaction.service';

describe('FinancialTransactionService', () => {
  let service: FinancialTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
