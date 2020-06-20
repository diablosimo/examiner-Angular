import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionQcmComponent } from './question-qcm.component';

describe('QuestionQcmComponent', () => {
  let component: QuestionQcmComponent;
  let fixture: ComponentFixture<QuestionQcmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionQcmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionQcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
