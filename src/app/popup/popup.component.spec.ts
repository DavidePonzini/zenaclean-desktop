import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComponent } from './popup.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AgmCoreModule} from '@agm/core';
import config from '../../../config.secret';
import {HttpClientModule} from '@angular/common/http';


describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupComponent, ],
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
    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
