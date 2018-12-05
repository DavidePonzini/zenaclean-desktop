import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../../config.secret';

@Injectable({
    providedIn:  'root'
})

export class APIService {

    API_URL  = config.apiUrl;
    GOOGLE_MAPS_API_KEY = config.googleMapsApiKey;
    constructor(private  httpClient:  HttpClient) {}

    getReports() {
        return  this.httpClient.get(`${this.API_URL + 'markers.json'}`);
    }

    getAddress(lat, lng) {
        // return this.httpClient
        //  .get('https://maps.googleapis.com/maps/api/geocode/json?address='
        //  + lat + ',' + lng + '&key=' + this.GOOGLE_MAPS_API_KEY);
    }
}
