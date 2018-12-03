import { Component, OnInit } from '@angular/core';
import {SingleReportViewComponent} from '../single-report-view/single-report-view.component';
import {APIService} from '../services/api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

declare var L;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    latitude: number = 44.4032971;
    longitude: number = 8.9701358;
    map: any;
    reports: any;

    constructor(private apiService: APIService, private modalService: NgbModal) {
    }


    ngOnInit() {

        this.map = L.map('map').setView([this.latitude, this.longitude], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        const that = this;

        this.apiService.getReports().subscribe((data: Array<object>) => {

            data.forEach(function(report) {
                const marker = L.marker([report.latitude, report.longitude]).addTo(that.map);
                console.log(report);
                marker.on('click', () => that.markerOnClick(report));
            });
        });
    }


    markerOnClick(report) {
        const modalRef = this.modalService.open(SingleReportViewComponent, {size: 'lg'});
        modalRef.componentInstance.report = report;
    }
}









