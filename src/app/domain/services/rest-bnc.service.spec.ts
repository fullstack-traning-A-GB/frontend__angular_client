import { TestBed } from '@angular/core/testing';

import { RestBNCService } from './rest-bnc.service';

describe('RestBNCService', () => {
  let service: RestBNCService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestBNCService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
