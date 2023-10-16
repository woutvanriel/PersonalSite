import { TestBed } from '@angular/core/testing';

import { PreferredLanguageService } from './preferred-language.service';

describe('PreferredLanguageService', () => {
  let service: PreferredLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreferredLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
