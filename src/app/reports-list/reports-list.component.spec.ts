import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { ReportsListComponent } from './reports-list.component';
import {AppComponent} from '../app.component';
import {MapComponent} from '../map/map.component';
import {ReportsBoardComponent} from '../reports-board/reports-board.component';
import {AddReportComponent} from '../add-report/add-report.component';
import {SingleReportViewComponent} from '../single-report-view/single-report-view.component';
import {PopupComponent} from '../popup/popup.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';
import config from '../../../config.secret';
import {HttpClientModule} from '@angular/common/http';
import {APIService} from '../services/api.service';

describe('ReportsListComponent', () => {
  let component: ReportsListComponent;
  let fixture: ComponentFixture<ReportsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
            AppComponent,
            MapComponent,
            ReportsListComponent,
            ReportsBoardComponent,
            AddReportComponent,
            SingleReportViewComponent,
            PopupComponent,
        ],
        imports: [
            BrowserModule,
            NgbModule,
            FormsModule,
            AgmCoreModule.forRoot({
                apiKey: config.googleMapsApiKey,
            }),
            HttpClientModule
        ],
        providers: [APIService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the same number of reports as the DB',
      inject([APIService], async (apiService: APIService) => {
          apiService.getReports().subscribe(reports => {
              const expectedCount = Object.keys(reports).length;
              const count = component.reports.length;

              expect(count).toEqual(expectedCount);
          });
      }));
});
