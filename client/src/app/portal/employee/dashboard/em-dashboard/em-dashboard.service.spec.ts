import { TestBed } from '@angular/core/testing';

import { EmDashboardService } from './em-dashboard.service';

describe('EmDashboardService', () => {
  let service: EmDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
