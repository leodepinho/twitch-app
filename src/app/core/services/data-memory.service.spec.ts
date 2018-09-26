import { TestBed, inject } from '@angular/core/testing';

import { DataMemoryService } from './data-memory.service';

describe('DataMemoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataMemoryService]
    });
  });

  it('should be created', inject([DataMemoryService], (service: DataMemoryService) => {
    expect(service).toBeTruthy();
  }));
});
