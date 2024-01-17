import { TestBed } from '@angular/core/testing';

import { ServeiPublicacioService } from './servei-publicacio.service';

describe('ServeiPublicacioService', () => {
  let service: ServeiPublicacioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServeiPublicacioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
