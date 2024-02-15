import { TestBed } from '@angular/core/testing';

import { AdUserService } from './ad-user.service';

describe('AdUserService', () => {
  let service: AdUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
