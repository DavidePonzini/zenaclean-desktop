import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../../config.secret';
import {Observable, Subject} from 'rxjs';
import {fixtureMarkers} from './fixture.api.service';

@Injectable({
    providedIn:  'root'
})

export class APIService {

    API_URL  = config.apiUrl;
    GOOGLE_MAPS_API_KEY = config.googleMapsApiKey;
    _listners = new Subject<any>();

    constructor(private  httpClient:  HttpClient) {}

    listen(): Observable<any> {
        return this._listners.asObservable();
    }

    update(data: any) {
        console.log(data);
        this._listners.next(data);
    }

    getReports() {
        return this.httpClient.get(`${this.API_URL + 'reports'}`);
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
