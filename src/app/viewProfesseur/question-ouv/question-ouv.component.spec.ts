import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionOuvComponent } from './question-ouv.component';

describe('QuestionOuvComponent', () => {
  let component: QuestionOuvComponent;
  let fixture: ComponentFixture<QuestionOuvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionOuvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionOuvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
