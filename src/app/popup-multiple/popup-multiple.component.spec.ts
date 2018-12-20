import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PopupMultipleComponent} from './popup-multiple.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AgmCoreModule} from '@agm/core';
import config from '../../../config.secret';
import {HttpClientModule} from '@angular/common/http';


describe('PopupMultipleComponent', () => {
  let component: PopupMultipleComponent;
  let fixture: ComponentFixture<PopupMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupMultipleComponent, ],
        imports: [
            BrowserModule,
            NgbModule,
            FormsModule,
            CommonModule,
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
    fixture = TestBed.createComponent(PopupMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
