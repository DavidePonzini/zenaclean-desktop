import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { ReportsListComponent } from './reports-list.component';
import {AgmCoreModule} from '@agm/core';
import config from '../../../config.secret';
import {HttpClientModule} from '@angular/common/http';
import {FixtureApiService} from '../services/fixture.api.service';

describe('ReportsListComponent', () => {
  let component: ReportsListComponent;
  let fixture: ComponentFixture<ReportsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ ReportsListComponent ],
        imports: [
            AgmCoreModule.forRoot({
                apiKey: config.googleMapsApiKey,
            }),
            HttpClientModule
        ]
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

    it('should have the correct number of reports',
        async (done) => {
            await FixtureApiService.getReports(1, 2, 3, 4).subscribe(reports => {
                const expectedCount = Object.keys(reports).length;
                expect(1).toEqual(expectedCount);
                done();
            });
        });


});
