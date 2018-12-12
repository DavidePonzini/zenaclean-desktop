import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReportViewComponent } from './single-report-view.component';
import {AgmCoreModule} from '@agm/core';
import config from '../../../config.secret';
import {HttpClientModule} from '@angular/common/http';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

describe('SingleReportViewComponent', () => {
  let component: SingleReportViewComponent;
  let fixture: ComponentFixture<SingleReportViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleReportViewComponent ],
        providers: [ NgbActiveModal ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
