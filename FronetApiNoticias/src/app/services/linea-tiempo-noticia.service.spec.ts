import { TestBed } from '@angular/core/testing';

import { LineaTiempoNoticiaService } from './linea-tiempo-noticia.service';

describe('LineaTiempoNoticiaService', () => {
  let service: LineaTiempoNoticiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineaTiempoNoticiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
