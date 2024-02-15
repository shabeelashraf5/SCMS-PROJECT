import { TestBed } from '@angular/core/testing';

import { AdEmployeeService } from './ad-employee.service';

describe('AdEmployeeService', () => {
  let service: AdEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
