import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../../config.secret';
import {Observable, Subject} from 'rxjs';

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
        this._listners.next(data);
    }

    getReports() {
        return this.httpClient.get(`${this.API_URL + 'markers.json'}`);
    }

    getAddress(lat, lng) {
        // return this.httpClient
        //  .get('https://maps.googleapis.com/maps/api/geocode/json?address='
        //  + lat + ',' + lng + '&key=' + this.GOOGLE_MAPS_API_KEY);
    }

    postReports(body) {
        return this.httpClient.post(`${this.API_URL/*'http://google.google.g/'*/ + 'markers.json'}`, body);
    }

}
