import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { employeeLoggedGuard } from './employee-logged.guard';

describe('employeeLoggedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => employeeLoggedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
