import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { dashboardResolverResolver } from './dashboard-resolver.resolver';

describe('dashboardResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => dashboardResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
