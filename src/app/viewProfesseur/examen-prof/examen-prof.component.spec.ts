import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenProfComponent } from './examen-prof.component';

describe('ExamenProfComponent', () => {
  let component: ExamenProfComponent;
  let fixture: ComponentFixture<ExamenProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
