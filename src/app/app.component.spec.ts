import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MapComponent} from './map/map.component';
import {ReportsListComponent} from './reports-list/reports-list.component';
import {ReportsBoardComponent} from './reports-board/reports-board.component';
import {AddReportComponent} from './add-report/add-report.component';
import {SingleReportViewComponent} from './single-report-view/single-report-view.component';
import {PopupComponent} from './popup/popup.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';
import config from '../../config.secret';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './navbar/navbar.component';
import {HomepageComponent} from './homepage/homepage.component';
import {PopupMultipleComponent} from './popup-multiple/popup-multiple.component';
import {SignupFormComponent} from './signup-form/signup-form.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {LogoutComponent} from './logout/logout.component';
import {AutocompleteComponent} from './autocomplete/autocomplete.component';
import {ProfileComponent} from './profile/profile.component';

describe('AppComponent', () => {
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
            PopupMultipleComponent,
            SignupFormComponent,
            LoginFormComponent,
            NavbarComponent,
            HomepageComponent,
            LogoutComponent,
            AutocompleteComponent,
            ProfileComponent
        ],
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
        providers: []
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

    it(`should have as title 'ADoSS'`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('ADoSS');
    });

});
