import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

export const fixtureMarkers: any = [{title: 'Test',
    description: 'Description Test',
    timestamp: '2017-08-19T12:17:55 -04:00',
    latitude: 44,
    longitude: 8}];


@Injectable({
    providedIn:  'root'
})

export class FixtureApiService {

    private static _listners: Subject<any>;

    constructor(myobservable: Observable<any>) {}

    static listen(): Observable<any> {
        return this._listners.asObservable();
    }

    static update(data: any) {
        this._listners.next(data);
    }

    static getReports() {
        return new Observable(function (observer) {
            observer.next(fixtureMarkers);
        });
    }

    static getAddress(lat, lng) {
        // return this.httpClient
        //  .get('https://maps.googleapis.com/maps/api/geocode/json?address='
        //  + lat + ',' + lng + '&key=' + this.GOOGLE_MAPS_API_KEY);
    }

    static postReports(body) {
        return true;
    }


}
