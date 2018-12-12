import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { ReportsListComponent } from './reports-list.component';
import {AgmCoreModule} from '@agm/core';
import config from '../../../config.secret';
import {HttpClientModule} from '@angular/common/http';
import {FixtureApiService} from '../services/fixture.api.service';
import {APIService} from '../services/api.service';
import {FixtureApiEmptyService} from '../services/fixture.api.empty.service';
import {by, element} from 'protractor';

describe('ReportsListComponent', () => {
  let component: ReportsListComponent;
  let fixture: ComponentFixture<ReportsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ ReportsListComponent ],
        imports: [
            AgmCoreModule.forRoot({
                apiKey: config.googleMapsApiKey,
            }),
            HttpClientModule
        ],
        providers: [ ReportsListComponent, { provide: APIService, useValue: FixtureApiService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct number of reports',
    async (done) => {
        await FixtureApiService.getReports().subscribe(reports => {
            const expectedCount = Object.keys(reports).length;
            const count = component.reports.length;
            expect(count).toEqual(expectedCount);
            done();
        });
  });

});

/*describe('ReportsListEmptyComponent', () => {
    let component: ReportsListComponent;
    let fixture: ComponentFixture<ReportsListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ReportsListComponent ],
            imports: [
                AgmCoreModule.forRoot({
                    apiKey: config.googleMapsApiKey,
                }),
                HttpClientModule
            ],
            providers: [ ReportsListComponent, { provide: APIService, useValue: FixtureApiEmptyService } ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReportsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display message if there isn t any report', async() => {
        const htmlElement: HTMLElement = fixture.nativeElement;
        const text = await htmlElement.querySelector('#empty-list');
        // const text = await element(by.id('empty-list')).getText();
        expect(text).toEqual(' Nessuna segnalazione presente ');
    });


});*/
