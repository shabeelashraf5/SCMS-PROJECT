import { TestBed } from '@angular/core/testing';

import { AdProductService } from './ad-product.service';

describe('AdProductService', () => {
  let service: AdProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
