import { TestBed } from '@angular/core/testing';

import { HttpStateServiceService } from 'http-state-service.service';

describe('HttpStateServiceService', () => {
  let service: HttpStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
