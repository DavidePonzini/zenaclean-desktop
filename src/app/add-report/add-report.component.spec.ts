import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReportComponent } from './add-report.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

describe('AddReportComponent', () => {
  let component: AddReportComponent;
  let fixture: ComponentFixture<AddReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReportComponent ],
        providers: [ NgbActiveModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeDefined();
  });*/
});
