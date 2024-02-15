import { TestBed } from '@angular/core/testing';

import { EmployeeLoginService } from './employee-login.service';

describe('EmployeeLoginService', () => {
  let service: EmployeeLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
