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
    logged = false;
    user: string;
    demo = false;

    constructor(private  httpClient:  HttpClient) {}

    isLogged() {
        return this.logged;
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

    getReports(ne_lat, ne_lng, sw_lat, sw_lng) {
        let params = new HttpParams();

        params = params.append('ne_lat', ne_lat);
        params = params.append('ne_lng', ne_lng);
        params = params.append('sw_lat', sw_lat);
        params = params.append('sw_lng', sw_lng);

        return this.httpClient.get(`${this.API_URL + 'reports'}`, {params: params});
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

    postReports(body) {
        return this.httpClient.post(`${this.API_URL + 'reports'}`, body);
    }

    postSignup(body) {
        return this.httpClient.post(`${this.API_URL + 'users/register'}`, body);
    }

    postLogin(body) {
        return this.httpClient.post(`${this.API_URL + 'users/login'}`, body);
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
