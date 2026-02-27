import { TestBed } from '@angular/core/testing';

import { ApiPathConfig } from './api-path-config';

describe('ApiPathConfig', () => {
  let service: ApiPathConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPathConfig);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
