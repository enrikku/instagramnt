import { TestBed } from '@angular/core/testing';

import { ServiceGetfotosService } from './service-getfotos.service';

describe('ServiceGetfotosService', () => {
  let service: ServiceGetfotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceGetfotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
