import { TestBed } from '@angular/core/testing';

import { InventoryListService } from './inventory-list.service';

describe('InventoryListService', () => {
  let service: InventoryListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
