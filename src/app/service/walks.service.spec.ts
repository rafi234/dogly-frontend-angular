import { TestBed } from '@angular/core/testing';

import { WalksService } from './walks.service';

describe('WalksService', () => {
  let service: WalksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
