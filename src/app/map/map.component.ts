import { Component, OnInit } from '@angular/core';
import {SingleReportViewComponent} from '../single-report-view/single-report-view.component';
import {APIService} from '../services/api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddReportComponent} from '../add-report/add-report.component';
import {PopupComponent} from '../popup/popup.component';
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
    initialLatitude = 44.4032971;
    initialLongitude = 8.9701358;
    mapLatitude = this.initialLatitude;
    mapLongitude = this.initialLongitude;
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

    loginCheck() {
        if (this.apiService.isLogged()) {
            this.setMarker();
        } else {
            const popup = this.modalService.open(PopupComponent, {size: 'sm'});
            popup.componentInstance.message = 'Occore essere registrati per compiere questa azione.';
            popup.componentInstance.btnText = 'Registrati';
            popup.componentInstance.btnColor = 'green';
            popup.componentInstance.btnBorderColor = 'green';
        }
    }

    setMarker() {

        this.tempReports = this.reports;
        this.reports = [];
        this.newReport = {
            title: '',
            description: '',
            timestamp: new Date(),
            latitude: this.mapLatitude,
            longitude: this.mapLongitude
        };

        const that = this;
        this.apiService.getAddress(this.mapLatitude, this.mapLongitude).subscribe((address) => {
            that.newReport.address = address;
            that.reports.push(that.newReport);
            that.draggable = true;
        });

        }

    formView() {

        const geolocation = {latitude: this.newReport.latitude,
                        longitude: this.newReport.longitude,
            address: this.newReport.address
        };

        const modalRef = this.modalService.open(AddReportComponent, {size: 'lg'});
        modalRef.componentInstance.geolocation = geolocation;

        this.draggable = false;
        this.reports = this.tempReports;
    }

    cancel() {
        this.draggable = false;
        this.reports = this.tempReports;
        this.initialLatitude = this.mapLatitude;
        this.initialLongitude = this.mapLongitude;
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
            this.newReport.initialLatitude = event.coords.lat;
            this.newReport.initialLongitude = event.coords.lng;
            const that = this;
            this.apiService.getAddress(event.coords.lat, event.coords.lng).subscribe((address) => {
                that.newReport.address = address;
            });
        }
    }
}









