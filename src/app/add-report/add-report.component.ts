import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewReport} from './new-report';
import {APIService} from '../services/api.service';
import {PopupComponent} from '../popup/popup.component';
import {PopupMultipleComponent} from '../popup-multiple/popup-multiple.component';

@Component({
    selector: 'app-add-report-modal',
    templateUrl: 'add-report.component.html',
    styleUrls: ['add-report.component.css']
})

export class AddReportComponent implements OnInit {
    model: any;
    submitted: any;
    reports: any;
    file: any = null;

    @Input() geolocation;

    constructor(private apiService: APIService, public activeModal: NgbActiveModal, public modalService: NgbModal) {
    }

    ngOnInit() {
        this.model = new NewReport('', '', null, this.geolocation.address, this.geolocation.latitude,
                                        this.geolocation.longitude, new Date(), '', this.apiService.getUser().id);
        this.submitted = false;
    }

    checkSize(event) {
        const dot_separator = this.model.url.split('.');
        const type = dot_separator[dot_separator.length - 1];
        this.file = null;
        if (type !== 'png' && type !== 'jpg' && type !== '' && type !== 'jpeg' && type !== 'bmp') {
            const popup = this.modalService.open(PopupComponent, {size: 'sm'});
            popup.componentInstance.message = 'Formato immagine non corretto.';
            popup.componentInstance.btnText = 'Chiudi';
            /*popup.componentInstance.btnColor = 'dodgerblue';
            popup.componentInstance.btnBorderColor = 'white';*/
            this.model.url = null;
        } else if (event.target.files[0].size > 4000000) {
            const popup = this.modalService.open(PopupComponent, {size: 'sm'});
            popup.componentInstance.message = 'Immagine troppo grande.';
            popup.componentInstance.btnText = 'Chiudi';
            /*popup.componentInstance.btnColor = 'dodgerblue';
            popup.componentInstance.btnBorderColor = 'white';*/
            this.model.url = null;
        } else {
            this.file = event.target.files[0];
        }
    }

    onSubmit() {

        const data = {
            title: this.model.title,
            description: this.model.description,
            latitude: this.model.latitude,
            longitude: this.model.longitude,
            timestamp: this.model.ts,
            address: this.model.address,
            url: null
        };

        // const dot_separator = data.url.split('.');
        // const type = dot_separator[dot_separator.length - 1];

        const self = this;
        const popupMultiple = this.modalService.open(PopupMultipleComponent, {size: 'sm'});
        popupMultiple.componentInstance.message = 'Vuoi procedere?';
        popupMultiple.result.then(function () {
            self.apiService.postReports(data).subscribe(res => {
                // res.report_id is correct (it takes the argument from a json)
                if (self.file != null) {
                    self.apiService.uploadPhoto(self.file, (res as any)._id).subscribe(result => {
                        data.url = (result as any).url;
                        self.displayNewReport(data, (result as any)._id);
                    });
                } else {
                    self.displayNewReport(data, (res as any)._id);
                }
            }, error => {
                const popup = self.modalService.open(PopupComponent, {size: 'sm'});
                popup.componentInstance.message = 'Errore durante invio, riprova.';
                popup.componentInstance.btnText = 'Chiudi';
                /*popup.componentInstance.btnColor = 'dodgerblue';
                popup.componentInstance.btnBorderColor = 'white';*/
                console.error(error);
            });
        }, function () {
        });

        this.submitted = true;
    }

    displayNewReport(data, id) {
        const new_report = new NewReport(data.title, data.description, data.url,
          data.address, data.latitude, data.longitude, data.timestamp, id,
          this.apiService.getUser().id);
        const popup = this.modalService.open(PopupComponent, {size: 'sm'});
        popup.componentInstance.message = 'Segnalazione aggiunta!';
        popup.componentInstance.btnText = 'Fatto';
        /*popup.componentInstance.btnColor = 'dodgerblue';
        popup.componentInstance.btnBorderColor = 'white';*/
        this.activeModal.close();
        this.apiService.showNewReport(new_report);
    }
}
