import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {LogoutComponent} from '../logout/logout.component';
import {HttpClientModule} from '@angular/common/http';
import {FixtureApiService} from '../services/fixture.api.service';
import {APIService} from '../services/api.service';

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
            ],
            providers: [ { provide: APIService, useClass: FixtureApiService } ]
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
        const user_id = FixtureApiService.staticGetUser().id;
        expect(user_id).toEqual('1');
    });

    it('should have the correct email', () => {
        const user_email = FixtureApiService.staticGetUser().email
        expect(user_email).toEqual('test@test.com');
    });

});
