import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerQuestionComponent } from './lister-question.component';

describe('ListerQuestionComponent', () => {
  let component: ListerQuestionComponent;
  let fixture: ComponentFixture<ListerQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListerQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
