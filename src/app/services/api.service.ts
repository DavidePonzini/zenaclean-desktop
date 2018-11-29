import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../../config.secret';

@Injectable({
    providedIn:  'root'
})

export  class  APIService {

    API_URL  = config.apiUrl;
    constructor(private  httpClient:  HttpClient) {}
    getReports() {
        return  this.httpClient.get(`${this.API_URL + 'data.json'}`);
    }
}
