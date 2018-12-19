import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AgmCoreModule} from '@agm/core';
import config from '../../../config.secret';
import {HttpClientModule} from '@angular/common/http';
import {PopupComponent} from '../popup/popup.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFormComponent, PopupComponent ],
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
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    /*it('success login with correct credential',  () => {
        component.model.email = 'indirizzo@email.com';
        component.model.password = 'password';
        component.onSubmit();
        expect(component.submitted).toEqual(true);
    });*/

});
