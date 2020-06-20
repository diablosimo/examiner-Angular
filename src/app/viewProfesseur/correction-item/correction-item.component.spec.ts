import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionItemComponent } from './correction-item.component';

describe('CorrectionItemComponent', () => {
  let component: CorrectionItemComponent;
  let fixture: ComponentFixture<CorrectionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
