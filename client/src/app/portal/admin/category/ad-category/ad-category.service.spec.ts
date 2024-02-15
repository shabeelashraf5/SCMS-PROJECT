import { TestBed } from '@angular/core/testing';

import { AdCategoryService } from './ad-category.service';

describe('AdCategoryService', () => {
  let service: AdCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
