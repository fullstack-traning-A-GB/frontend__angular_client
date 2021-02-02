import { TestBed } from '@angular/core/testing';

import { ConverterServiceService } from './converter-service.service';

describe('ConverterServiceService', () => {
  let service: ConverterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConverterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
