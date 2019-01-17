import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { MapComponent } from './map.component';
import {AgmCoreModule} from '@agm/core';
import config from '../../../config.secret';
import {HttpClientModule} from '@angular/common/http';
import {APIService} from '../services/api.service';
import {FixtureApiService} from '../services/fixture.api.service';
import {ReportsListComponent} from '../reports-list/reports-list.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutocompleteComponent} from '../autocomplete/autocomplete.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          MapComponent,
          AutocompleteComponent
      ],
            imports: [
                BrowserModule,
                NgbModule,
                FormsModule,
                ReactiveFormsModule,
                AgmCoreModule.forRoot({
                    apiKey: config.googleMapsApiKey,
                }),
                HttpClientModule
            ]
        // providers: [ ReportsListComponent ]
        // providers: [ ReportsListComponent, { provide: APIService, useValue: FixtureApiService } ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

     it('should create', () => {
     expect(component).toBeTruthy();
   });

    /*it('should have the correct number of markers',
          async (done) => {
              await FixtureApiService.getReports().subscribe(reports => {
                  const expectedCount = Object.keys(reports).length;
                  const count = component.reports.length;
                  expect(count).toEqual(expectedCount);
                  done();
              });
          });*/
});




