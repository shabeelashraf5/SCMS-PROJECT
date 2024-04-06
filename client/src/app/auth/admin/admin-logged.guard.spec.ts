import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminLoggedGuard } from './admin-logged.guard';

describe('adminLoggedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminLoggedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
