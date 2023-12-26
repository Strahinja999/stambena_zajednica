import { TestBed } from '@angular/core/testing';

import { TrosakService } from './trosak.service';

describe('TrosakService', () => {
  let service: TrosakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrosakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
