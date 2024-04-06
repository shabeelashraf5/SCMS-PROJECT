import { TestBed } from '@angular/core/testing';

import { PurchaseHistoryService } from './purchase-history.service';

describe('PurchaseHistoryService', () => {
  let service: PurchaseHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
