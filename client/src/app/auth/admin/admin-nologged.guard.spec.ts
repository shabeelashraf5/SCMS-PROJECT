import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminNologgedGuard } from './admin-nologged.guard';

describe('adminNologgedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminNologgedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
