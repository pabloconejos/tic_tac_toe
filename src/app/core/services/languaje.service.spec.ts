import { TestBed } from '@angular/core/testing';

import { LanguajeService } from './languaje.service';

describe('LanguajeService', () => {
  let service: LanguajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
