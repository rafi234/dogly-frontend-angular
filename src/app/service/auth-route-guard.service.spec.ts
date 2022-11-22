import { TestBed } from '@angular/core/testing';

import { AuthRouteGuardService } from './auth-route-guard.service';

describe('AuthRouteGuardService', () => {
  let service: AuthRouteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthRouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
