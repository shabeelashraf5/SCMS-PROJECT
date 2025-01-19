import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { profileResolver } from './profile.resolver';

describe('profileResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => profileResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
