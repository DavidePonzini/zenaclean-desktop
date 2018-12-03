import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewReport} from './new-report';
import {timestamp} from 'rxjs/operators';

@Component({
    selector: 'app-add-report-modal',
    templateUrl: 'add-report.component.html',
    styleUrls: ['add-report.component.css']
})

export class AddReportContentComponent {
    constructor(public activeModal: NgbActiveModal
    ) {}

    model = new NewReport('', '', '', 2, 2);
    submitted = false;
    onSubmit() {
        this.submitted = true;
       // alert(JSON.stringify(this.model));
    }
    newReport() {
        this.model = new NewReport('', '', '', 0, 0);
    }
}
