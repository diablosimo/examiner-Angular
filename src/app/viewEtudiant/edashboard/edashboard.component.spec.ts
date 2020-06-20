import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdashboardComponent } from './edashboard.component';

describe('ChartsComponent', () => {
  let component: EdashboardComponent;
  let fixture: ComponentFixture<EdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
