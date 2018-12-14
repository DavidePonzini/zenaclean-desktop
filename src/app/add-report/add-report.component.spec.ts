import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReportComponent } from './add-report.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';
import config from '../../../config.secret';
import {HttpClientModule} from '@angular/common/http';
import {By} from 'protractor';
import {DebugElement} from '@angular/core';

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
            HttpClientModule
        ],
        providers: [ NgbActiveModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReportComponent);
    component = fixture.componentInstance;
    component.geolocation = {latitude: 44.4032971, longitude: 8.9701358};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  /*it('should prevents submit with empty title', () => {
      expect(component.submitted).toEqual(false);
    });*/

  it('should have empty title', () => {
        expect(component.model.title).toEqual('');
  });

  it('should have empty description', () => {
        expect(component.model.description).toEqual('');
  });
});
