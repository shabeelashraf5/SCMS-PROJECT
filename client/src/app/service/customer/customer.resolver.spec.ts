import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { customerResolver } from './customer.resolver';

describe('customerResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => customerResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
