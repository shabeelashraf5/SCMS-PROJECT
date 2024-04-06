import { TestBed } from '@angular/core/testing';

import { SalesAnalysisService } from './sales-analysis.service';

describe('SalesAnalysisService', () => {
  let service: SalesAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
