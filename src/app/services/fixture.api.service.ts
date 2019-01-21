import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

export const fixtureMarkers: any = [{title: 'Test',
    description: 'Description Test',
    timestamp: '2017-08-19T12:17:55 -04:00',
    latitude: 44,
    longitude: 8,
    user_id: '1'}];

export const user: any = {id: '1', email: 'test@test.com'};


@Injectable({
    providedIn:  'root'
})

export class FixtureApiService {

    constructor(myobservable: Observable<any>) {
    }

    _onReportAdd = new Subject<any>();          // show reports added by current user without refreshing page
    _onReportsUpdate = new Subject<any>();      // show reports when repeating search in a given zone on the map
    _onMoveMap = new Subject<any>();
    _onReportVoteUpdate = new Subject<any>();
    logged = false;
    viewProfile = false;
    user = user;
    demo = false;

    static getReports(ne_lat, ne_lng, sw_lat, sw_lng) {
        return new Observable(function (observer) {
            observer.next(fixtureMarkers);
        });
    }

    static getUser() {
        return user;
    }

    isLogged() {
        return this.logged;
    }

    getViewProfile() {
        return this.viewProfile;
    }

    setViewProfile() {
        this.viewProfile = !this.viewProfile;
    }

    setAuth(auth) {
        this.logged = auth;
    }

    setUser(user) {
        this.user = user;
    }

    showDemo(demo) {
        this.demo = demo;
    }

    onReportAdd(): Observable<any> {
        return this._onReportAdd.asObservable();
    }

    showNewReport(data: any) {
        this._onReportAdd.next(data);
    }

    onReportsUpdate(): Observable<any> {
        return this._onReportsUpdate.asObservable();
    }

    updateReports(reports: any) {
        this._onReportsUpdate.next(reports);
    }

    onMoveMap(): Observable<any> {
        return this._onMoveMap.asObservable();
    }

    moveMap(coords: any) {
        this._onMoveMap.next(coords);
    }

    getAddress(lat, lng) {
        return 'Genova';
    }

    checkSession() {
        return;
    }

    postReports(body) {
        body.id = this.user.id;

        return;
    }

    postSignup(body) {
        return;
    }

    postLogin(body) {
        return;
    }

    logoutSession() {
        return;
    }

    voteReport(reportId, isVotePositive) {
        return;
    }

    onReportVoteUpdate(): Observable<any> {
        return this._onReportVoteUpdate.asObservable();
    }

    updateVote(reportId, vote) {
        this._onReportVoteUpdate.next({id: reportId, vote: vote});
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
