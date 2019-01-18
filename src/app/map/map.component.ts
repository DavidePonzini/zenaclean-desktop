import {Component, OnInit} from '@angular/core';
import {SingleReportViewComponent} from '../single-report-view/single-report-view.component';
import {APIService} from '../services/api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddReportComponent} from '../add-report/add-report.component';
import {PopupComponent} from '../popup/popup.component';
import dateUtils from '../utils/date-utils';

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
    visible = true;

    openedWindow = '';

    protected map: any;

    protected mapReady(map) {
        this.map = map;
    }

    constructor(private apiService: APIService, private modalService: NgbModal) {
        this.apiService.onReportAdd().subscribe((data) => {
            // this.reports.push(data);
            this.visible = true;

            this.updateReports();
            this.map.setCenter({lat: data.latitude, lng: data.longitude});

            if (this.zoom < 15) {
                this.zoom = 19;
            } else {
                this.zoom += 1;
            }

            console.log(data);
            this.openWindow(data._id);
        });

        this.apiService.onReportsUpdate().subscribe(reports => {
            // Aggiorna mappa
            this.reports = reports;
        });

        this.apiService.onMoveMap().subscribe(coords => {
            this.map.setCenter(coords);
            this.zoom = 18;
            // this.updateReports();
        });

        this.apiService.onReportVoteUpdate().subscribe(data => {
            const id = data.id;
            const isVotePositive = data.vote;

            const report = this.reports.find(rep => rep._id === id);

            if (isVotePositive) {
                report.voted_positive = true;
            } else {
                report.voted_negative = true;
            }
        });

    }


    ngOnInit() {
        this.apiService.getReports(44.4741594739302, 9.082056335564403, 44.332348787411924, 8.858215264435557)
            .subscribe((data: object) => {
                this.reports = Object.values(data);
                this.reports.forEach(function (report) {
                    const {date, time} = dateUtils.timestampToItalianDate(report.timestamp);
                    report.date = date;
                    report.time = time;
                });
            });
    }

    openWindow(title) {
        this.openedWindow = title;
    }

    isInfoWindowOpen(title) {
        return this.openedWindow === title;
    }

    locateAndMoveMap() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                    this.showPosition(position);
                },
                (err) => {
                    const popup = this.modalService.open(PopupComponent, {size: 'sm'});
                    popup.componentInstance.message = 'La localizzazione non è attiva sul tuo dispositivo.';
                    popup.componentInstance.btnText = 'Ok';
                });
        }
    }

    async showPosition(position) {

        const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        this.apiService.moveMap(coords);
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
            popup.componentInstance.message = 'Occorre essere registrati per compiere questa azione.';
            popup.componentInstance.btnText = 'Registrati';
        }
    }

    setMarker() {
        this.visible = false;
    }

    formView() {

        this.newReport = {
            title: '',
            description: '',
            latitude: this.mapLatitude,
            longitude: this.mapLongitude
        };

        const that = this;

        this.apiService.getAddress(that.newReport.latitude, that.newReport.longitude).subscribe((address) => {
            that.newReport.address = address;

            const geolocation = {
                latitude: that.newReport.latitude,
                longitude: that.newReport.longitude,
                address: that.newReport.address
            };

            const modalRef = this.modalService.open(AddReportComponent, {size: 'lg'});
            modalRef.componentInstance.geolocation = geolocation;
        });

    }

    cancel() {
        this.visible = true;
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

    /*markerMoved(event: any) {
        if (event) {
            this.newReport.latitude = event.coords.lat;
            this.newReport.longitude = event.coords.lng;
            const that = this;
            this.apiService.getAddress(event.coords.lat, event.coords.lng).subscribe((address) => {
                that.newReport.address = address;
            });
        }
    }*/

    getMapBoundaries() {
        const bounds = this.map.getBounds();

        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();

        return {
            ne_lat: ne.lat(),
            ne_lng: ne.lng(),
            sw_lat: sw.lat(),
            sw_lng: sw.lng()
        };
    }

    updateReports() {
        const boundaries = this.getMapBoundaries();

        this.apiService.getReports(boundaries.ne_lat, boundaries.ne_lng, boundaries.sw_lat, boundaries.sw_lng)
            .subscribe(reports => this.apiService.updateReports(reports));

        this.openedWindow = '';

    }


}

