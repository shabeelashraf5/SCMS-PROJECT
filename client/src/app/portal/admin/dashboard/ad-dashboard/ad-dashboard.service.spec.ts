import { TestBed } from '@angular/core/testing';

import { AdDashboardService } from './ad-dashboard.service';

describe('AdDashboardService', () => {
  let service: AdDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
