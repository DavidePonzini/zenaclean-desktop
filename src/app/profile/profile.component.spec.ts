import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {LogoutComponent} from '../logout/logout.component';
import {HttpClientModule} from '@angular/common/http';
import {FixtureApiService, fixtureMarkers} from '../services/fixture.api.service';
import {Observable} from 'rxjs';

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProfileComponent,
                LogoutComponent
            ],
            imports: [
                HttpClientModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the correct id user', () => {
        const user_id = FixtureApiService.getUser().id;
        expect(user_id).toEqual('1');
    });

    it('should have the correct email', () => {
        const user_email = FixtureApiService.getUser().email
        expect(user_email).toEqual('test@test.com');
    });

});
