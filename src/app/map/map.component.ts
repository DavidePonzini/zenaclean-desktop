import { Component, OnInit } from '@angular/core';
import {SingleReportViewComponent} from '../single-report-view/single-report-view.component';
import {APIService} from '../services/api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddReportComponent} from '../add-report/add-report.component';
import dateUtils from '../utils/date-utils';

declare var L;

// @ts-ignore
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    zoom = 12;
    latitude = 44.4032971;
    longitude = 8.9701358;
    mapLatitude = this.latitude;
    mapLongitude = this.longitude;
    reports: any;
    lastOpen: any;
    newReport: any;
    tempReports: any;
    draggable = false;

    constructor(private apiService: APIService, private modalService: NgbModal) {
        this.apiService.listen().subscribe((data) => {
            this.reports.push(data);
        });
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

    setMarker() {

        this.tempReports = this.reports;
        this.reports = [];
        this.newReport = {
            title: '',
            description: '',
            timestamp: new Date(),
            latitude: this.mapLatitude,
            longitude: this.mapLongitude};

        this.reports.push(this.newReport);
        this.draggable = true;
    }

    formView() {

        console.log(this.newReport);
        const latlng = {latitude: this.newReport.latitude,
                        longitude: this.newReport.longitude};

        const modalRef = this.modalService.open(AddReportComponent, {size: 'lg'});
        modalRef.componentInstance.latlng = latlng;

        this.draggable = false;
        this.reports = this.tempReports;
    }

    cancel() {
        this.draggable = false;
        this.reports = this.tempReports;

        this.mapLatitude = this.latitude;
        this.mapLongitude = this.longitude;
        this.zoom = 12;
    }

    centerChange(event: any) {
        if (event) {
            this.mapLatitude = event.lat;
            this.mapLongitude = event.lng;
        }
    }

    zoomChange(event: any) {
        if (event) {
            this.zoom = event;
        }
    }

    markerMoved(event: any) {
        if (event) {
            this.newReport.latitude = event.coords.lat;
            this.newReport.longitude = event.coords.lng;
        }
    }
}









