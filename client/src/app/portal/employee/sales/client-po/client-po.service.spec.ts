import { TestBed } from '@angular/core/testing';

import { ClientPoService } from './client-po.service';

describe('ClientPoService', () => {
  let service: ClientPoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientPoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
