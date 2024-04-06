import { TestBed } from '@angular/core/testing';

import { SalesOrderService } from './sales-order.service';

describe('SalesOrderService', () => {
  let service: SalesOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
