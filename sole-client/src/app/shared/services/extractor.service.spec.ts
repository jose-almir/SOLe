import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ExtractorService } from './extractor.service';

describe('ExtractorService', () => {
  let service: ExtractorService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientModule]});
    service = TestBed.inject(ExtractorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
