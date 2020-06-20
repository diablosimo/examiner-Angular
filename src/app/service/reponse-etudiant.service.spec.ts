import { TestBed } from '@angular/core/testing';

import { ReponseEtudiantService } from './reponse-etudiant.service';

describe('ReponseEtudiantService', () => {
  let service: ReponseEtudiantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReponseEtudiantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
