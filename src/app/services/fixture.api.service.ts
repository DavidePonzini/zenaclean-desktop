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
    private static logged = false;
    private static user: string;
    private static demo = false;

    constructor(myobservable: Observable<any>) {}

    static isLogged() {
        return this.logged;
    }

    static setAuth(auth) {
        this.logged = auth;
    }

    static setUser(user) {
        this.user = user;
    }

    static showDemo(demo) {
        this.demo = demo;
    }

    static listen(): Observable<any> {
        return; // this._listners.asObservable();
    }

    static update(data: any) {
        this._listners.next(data);
    }

    static getReports() {
        return new Observable(function (observer) {
            observer.next(fixtureMarkers);
        });
    }


    static postReports(body) {
        return true;
    }


}

const composeAddress = (json) => {
    const obj = json.results[0].address_components;
    const inCaseOfFailure = 'Indirizzo sconosciuto';
    try {
        const rn = obj.find(component => component.types.includes('route'));
        if (rn == null) {
            return obj.find(component => component.types.includes('political')).short_name;
        }
        const roadName = rn.short_name;
        if (roadName === 'Unnamed Road') {
            return inCaseOfFailure;
        }
        const sn = obj.find(component => component.types.includes('street_number'));
        const streetNumber = sn == null ? '' : sn.short_name;
        return roadName + ' ' + streetNumber;
    } catch (e) {
        console.error(e);
        return inCaseOfFailure;
    }
};
