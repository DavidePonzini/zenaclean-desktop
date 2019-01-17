import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsBoardComponent } from './reports-board.component';
import {AppComponent} from '../app.component';
import {MapComponent} from '../map/map.component';
import {ReportsListComponent} from '../reports-list/reports-list.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AgmCoreModule} from '@agm/core';
import config from '../../../config.secret';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from '../navbar/navbar.component';
import {HomepageComponent} from '../homepage/homepage.component';
import {LoginFormComponent} from '../login-form/login-form.component';
import {LogoutComponent} from '../logout/logout.component';
import {SignupFormComponent} from '../signup-form/signup-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AutocompleteComponent} from '../autocomplete/autocomplete.component';
import {ProfileComponent} from '../profile/profile.component';

describe('ReportsBoardComponent', () => {
  let component: ReportsBoardComponent;
  let fixture: ComponentFixture<ReportsBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
            AppComponent,
            MapComponent,
            ReportsListComponent,
            ReportsBoardComponent,
            NavbarComponent,
            HomepageComponent,
            LoginFormComponent,
            LogoutComponent,
            SignupFormComponent,
            AutocompleteComponent,
            ProfileComponent
        ],
        imports: [
            BrowserModule,
            NgbModule,
            FormsModule,
            CommonModule,
            ReactiveFormsModule,
            AgmCoreModule.forRoot({
                apiKey: config.googleMapsApiKey,
            }),
            HttpClientModule
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
