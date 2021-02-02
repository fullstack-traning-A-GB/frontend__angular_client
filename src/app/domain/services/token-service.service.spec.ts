import { TestBed } from '@angular/core/testing';

import { TokenBNCService } from './token-b-n-c.service';

describe('TokenServiceService', () => {
  let service: TokenBNCService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenBNCService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
