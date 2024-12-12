import { TestBed } from '@angular/core/testing';

import { LineaTiempoService } from './linea-tiempo.service';

describe('LineaTiempoService', () => {
  let service: LineaTiempoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineaTiempoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
