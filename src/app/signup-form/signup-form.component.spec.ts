import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { SignupFormComponent } from './signup-form.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';
import config from '../../../config.secret';
import {HttpClientModule} from '@angular/common/http';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupFormComponent],
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
        fixture = TestBed.createComponent(SignupFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty email', () => {
    expect(component.model.email).toEqual('');
  });

    it('no submit with empty email', () => {
        component.model.email = '';
        component.model.ssn = 'aaaaaa12a12a123a';
        component.model.password = '12345678';
        component.model.confirm = '12345678';
        expect(component.submitted).toEqual(false);
    });

    it('no submit with too short password', async () => {
        component.model.email = 't@test.com';
        component.model.ssn = 'aaaaaa12a12a123a';
        component.model.password = '1234';
        component.model.confirm = '1234';
        component.onSubmit();
        expect(component.submitted).toEqual(false);
    });

    it('no submit if password and confirm are different', async () => {
        component.model.email = 't@test.com';
        component.model.ssn = 'aaaaaa12a12a123a';
        component.model.password = '12345678';
        component.model.confirm = '12345677';
        component.onSubmit();
        expect(component.submitted).toEqual(false);
    });
/*
    it('submit with correct data', () => {
        component.model.email = 't@test.com';
        component.model.ssn = 'aaaaaa12a12a123a';
        component.model.password = '12345678';
        component.model.confirm = '12345678';
        fixture.detectChanges();
        component.onSubmit();
        expect(component.submitted).toEqual(true);
    });*/
});
