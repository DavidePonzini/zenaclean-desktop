import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import config from '../../../config.secret';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn:  'root'
})

export class APIService {

    API_URL  = config.apiUrl;
    GOOGLE_MAPS_API_KEY = config.googleMapsApiKey;
    _onReportAdd = new Subject<any>();          // show reports added by current user without refreshing page
    _onReportsUpdate = new Subject<any>();      // show reports when repeating search in a given zone on the map
    _onMoveMap = new Subject<any>();
    _onReportVoteUpdate = new Subject<any>();
    logged = false;
    viewProfile = false;
    user: any;
    demo = false;

    constructor(private  httpClient:  HttpClient) {}

    isLogged() {
        return this.logged;
    }

    getViewProfile() {
        return this.viewProfile;
    }

    setViewProfile(newVal?: boolean) {
        if (newVal) {
            this.viewProfile = newVal;
        } else {
            this.viewProfile = !this.viewProfile;
        }
    }

    setAuth(auth) {
        this.logged = auth;
    }

    setUser(user) {
        console.log('PLUTO' + JSON.stringify(user));
        this.user = user;
    }

    getUser() {
        console.log('PIPPO' + JSON.stringify(this.user));
        return this.user;
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

    getReports(ne_lat, ne_lng, sw_lat, sw_lng) {
        let params = new HttpParams();

        params = params.append('ne_lat', ne_lat);
        params = params.append('ne_lng', ne_lng);
        params = params.append('sw_lat', sw_lat);
        params = params.append('sw_lng', sw_lng);

        if (this.user) {
            params = params.append('user', this.user.id);
        }

        return this.httpClient.get(`${this.API_URL + 'reports'}`, {params: params});
    }

    getBalance() {
        let params = new HttpParams();

        params = params.append('addr', this.user.eth_address);

        return this.httpClient.get(`${this.API_URL + 'users/balance'}`, {params: params});
    }

    getAddress(lat, lng) {
        const that = this;
        return new Observable(function (observer) {
            that.httpClient
                .get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
                lat + ',' + lng + '&key=' + that.GOOGLE_MAPS_API_KEY).subscribe((responseJson) => {
                observer.next(composeAddress(responseJson));
            });
        });
    }

    checkSession() {

        return this.httpClient.post(`${this.API_URL + 'users/check'}`, {}, {withCredentials: true});
    }

    postReports(body) {
        body.id = this.user.id;

        return this.httpClient.post(`${this.API_URL + 'reports'}`, body);
    }

    uploadPhoto(file, reportId) {
        const uploadData = new FormData();
        uploadData.append('photo', file);
        uploadData.append('id', reportId);
        uploadData.append('userId', this.user.id);
        return this.httpClient.post(`${this.API_URL + 'reports/uploadPhoto'}`, uploadData);
    }

    postSignup(body) {
        return this.httpClient.post(`${this.API_URL + 'users/register'}`, body);
    }

    postLogin(body) {
        return this.httpClient.post(`${this.API_URL + 'users/login'}`, body, {withCredentials: true});
    }

    logoutSession() {
        return this.httpClient.post(`${this.API_URL + 'users/logout'}`, {}, {withCredentials: true});
    }

    voteReport(reportId, isVotePositive) {
        return this.httpClient.post(`${this.API_URL + 'reports/vote'}`, {
            user: this.user.id,
            report: reportId,
            vote: isVotePositive ? 1 : 0
        });
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
