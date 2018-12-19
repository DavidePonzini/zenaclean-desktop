import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AgmCoreModule} from '@agm/core';
import config from '../../../config.secret';
import {HttpClientModule} from '@angular/common/http';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutComponent ],
        imports: [
            BrowserModule,
            NgbModule,
            FormsModule,
            CommonModule,
            AgmCoreModule.forRoot({
                apiKey: config.googleMapsApiKey,
            }),
            HttpClientModule
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
