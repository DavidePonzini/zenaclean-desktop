import { Component, OnInit } from '@angular/core';
import {SingleReportViewComponent} from '../single-report-view/single-report-view.component';
import {APIService} from '../services/api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddReportComponent} from '../add-report/add-report.component';
import {google} from '@agm/core/services/google-maps-types';
import dateUtils from '../utils/date-utils';
import { AgmMarker } from '@agm/core';

declare var L;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    latitude = 44.4032971;
    longitude = 8.9701358;
    reports: any;
    lastOpen: any;

    constructor(private apiService: APIService, private modalService: NgbModal) {
    }


    ngOnInit() {

        this.apiService.getReports().subscribe((data: object) => {
            this.reports = Object.values(data);
            this.reports.forEach(function(report) {
                const {date, time} = dateUtils.timestampToItalianDate(report.timestamp);
                report.date = date;
                report.time = time;
            });
        });

    }
    closeOthers(info) {
        if (this.lastOpen != null) {
            this.lastOpen.close();
        }
        this.lastOpen = info;
    }

    markerClick(report) {
        const modalRef = this.modalService.open(SingleReportViewComponent, {size: 'lg'});
        const {date, time} = dateUtils.timestampToItalianDate(report.timestamp);
        report.date = date;
        report.time = time;
        modalRef.componentInstance.report = report;
    }

    formView() {
        const modalRef = this.modalService.open(AddReportComponent, {size: 'lg'});
        const latlng = {latitude: this.latitude,
                        longitude: this.longitude};
        modalRef.componentInstance.latlng = latlng;
    }

    centerChange(event: any) {
        if (event) {
            this.latitude = event.lat;
            this.longitude = event.lng;
        }
    }
}









