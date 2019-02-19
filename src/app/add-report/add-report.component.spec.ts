import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReportComponent } from './add-report.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';
import config from '../../../config.secret';
import {HttpClientModule} from '@angular/common/http';
import {By} from 'protractor';
import {DebugElement} from '@angular/core';
import {APIService} from '../services/api.service';
import {FixtureApiService} from '../services/fixture.api.service';

describe('AddReportComponent', () => {
  let component: AddReportComponent;
  let fixture: ComponentFixture<AddReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReportComponent ],
        imports: [
            BrowserModule,
            NgbModule,
            FormsModule,
            AgmCoreModule.forRoot({
                apiKey: config.googleMapsApiKey,
            }),
            HttpClientModule,
            ReactiveFormsModule
        ],
        providers: [ NgbActiveModal, { provide: APIService, useClass: FixtureApiService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReportComponent);
    component = fixture.componentInstance;
    component.reports = [];
    component.geolocation = {latitude: 44.4032971, longitude: 8.9701358};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have empty title', () => {
        expect(component.model.title).toEqual('');
  });

  it('should have empty description', () => {
        expect(component.model.description).toEqual('');
  });
});
