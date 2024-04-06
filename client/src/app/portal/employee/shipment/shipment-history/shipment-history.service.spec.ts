import { TestBed } from '@angular/core/testing';

import { ShipmentHistoryService } from './shipment-history.service';

describe('ShipmentHistoryService', () => {
  let service: ShipmentHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipmentHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
