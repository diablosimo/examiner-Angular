import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFileComponent } from './question-file.component';

describe('QuestionFileComponent', () => {
  let component: QuestionFileComponent;
  let fixture: ComponentFixture<QuestionFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
