import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewReport} from './new-report';
import {APIService} from '../services/api.service';
import {PopupComponent} from '../popup/popup.component';


@Component({
    selector: 'app-add-report-modal',
    templateUrl: 'add-report.component.html',
    styleUrls: ['add-report.component.css']
})

export class AddReportComponent  implements OnInit {
    model: any;
    submitted: any;

    @Input() latlng;

    constructor(private apiService: APIService, public activeModal: NgbActiveModal, public modalService: NgbModal) { }

    ngOnInit() {

        this.model = new NewReport('', '', '', this.latlng.latitude, this.latlng.longitude);
        this.submitted = false;
    }

    checkSize(event) {
        if (event.target.files[0].size > 50) {
            const popup = this.modalService.open(PopupComponent, {size: 'sm'});
            popup.componentInstance.message = 'Immagine troppo grande.';
            this.model.picture = '';
        }
    }

    onSubmit() {
        const data = {
            title: this.model.title,
            description: this.model.description,
            latitude: this.model.latitude,
            longitude: this.model.longitude,
            picture: this.model.picture,
            timestamp: this.model.ts,
        };

        const dot_separator = data.picture.split('.');
        const type = dot_separator[dot_separator.length - 1];

        if (type !== 'png' && type !== 'jpg' && type !== '') {
            const popup = this.modalService.open(PopupComponent, {size: 'sm'});
            popup.componentInstance.message = 'Formato immagine non corretto.';
        } else {
            this.apiService.postReports(data).subscribe(res => {
                const popup = this.modalService.open(PopupComponent, {size: 'sm'});
                popup.componentInstance.message = 'Segnalazione aggiunta!';
                this.activeModal.close();
            }, error => {
                const popup = this.modalService.open(PopupComponent, {size: 'sm'});
                popup.componentInstance.message = 'Errore durante invio, riprova.';
                console.error(error);
            });

            this.submitted = true;
        }
    }
}
