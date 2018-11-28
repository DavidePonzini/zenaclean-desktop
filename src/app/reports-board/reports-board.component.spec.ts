import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsBoardComponent } from './reports-board.component';

describe('ReportsBoardComponent', () => {
  let component: ReportsBoardComponent;
  let fixture: ComponentFixture<ReportsBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
