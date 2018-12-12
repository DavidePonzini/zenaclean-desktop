import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

export const fixtureMarkers: any = [];


@Injectable({
    providedIn:  'root'
})

export class FixtureApiEmptyService {

    constructor() {}

    static getReports() {
        return new Observable(function (observer) {
            observer.next(fixtureMarkers);
        });
    }


}
