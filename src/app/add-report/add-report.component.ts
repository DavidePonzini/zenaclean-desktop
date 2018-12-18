import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewReport} from './new-report';
import {APIService} from '../services/api.service';
import {PopupComponent} from '../popup/popup.component';
import {PopupMultipleComponent} from '../popup-multiple/popup-multiple.component';
import dateUtils from '../utils/date-utils';

@Component({
    selector: 'app-add-report-modal',
    templateUrl: 'add-report.component.html',
    styleUrls: ['add-report.component.css']
})

export class AddReportComponent implements OnInit {
    model: any;
    submitted: any;
    reports: any;

    @Input() geolocation;

    constructor(private apiService: APIService, public activeModal: NgbActiveModal, public modalService: NgbModal) {
    }

    ngOnInit() {
        this.model = new NewReport('', '', '', this.geolocation.address, this.geolocation.latitude, this.geolocation.longitude, new Date());
        this.submitted = false;
    }

    checkSize(event) {
        const dot_separator = this.model.url.split('.');
        const type = dot_separator[dot_separator.length - 1];

        if (type !== 'png' && type !== 'jpg' && type !== '') {
            const popup = this.modalService.open(PopupComponent, {size: 'sm'});
            popup.componentInstance.message = 'Formato immagine non corretto.';
            popup.componentInstance.btnText = 'Chiudi';
            popup.componentInstance.btnColor = 'red';
            popup.componentInstance.btnBorderColor = 'red';
            this.model.url = '';
        } else if (event.target.files[0].size > 4000000) {
            const popup = this.modalService.open(PopupComponent, {size: 'sm'});
            popup.componentInstance.message = 'Immagine troppo grande.';
            popup.componentInstance.btnText = 'Chiudi';
            popup.componentInstance.btnColor = 'red';
            popup.componentInstance.btnBorderColor = 'red';
            this.model.url = '';
        }
    }

    onSubmit() {

        const data = {
            title: this.model.title,
            description: this.model.description,
            latitude: this.model.latitude,
            longitude: this.model.longitude,
            url: this.model.url ? this.model.url : '/assets/default_pic.png',
            timestamp: this.model.ts,
            address: this.model.address
        };

        const dot_separator = data.url.split('.');
        const type = dot_separator[dot_separator.length - 1];

        const self = this;
        const popupMultiple = this.modalService.open(PopupMultipleComponent, {size: 'sm'});
        popupMultiple.componentInstance.message = 'Vuoi procedere?';
        popupMultiple.result.then(function () {
            self.apiService.postReports(data).subscribe(res => {
                const new_report = new NewReport(data.title, data.description, data.url, data.address,
                                                    data.latitude, data.longitude, data.timestamp);
                const popup = self.modalService.open(PopupComponent, {size: 'sm'});
                popup.componentInstance.message = 'Segnalazione aggiunta!';
                popup.componentInstance.btnText = 'Fatto';
                popup.componentInstance.btnColor = 'green';
                popup.componentInstance.btnBorderColor = 'green';
                self.activeModal.close();
                self.apiService.update(new_report);
            }, error => {
                const popup = self.modalService.open(PopupComponent, {size: 'sm'});
                popup.componentInstance.message = 'Errore durante invio, riprova.';
                popup.componentInstance.btnText = 'Chiudi';
                popup.componentInstance.btnColor = 'red';
                popup.componentInstance.btnBorderColor = 'red';
                console.error(error);
            });
        }, function () {
        });

        this.submitted = true;
    }
}
