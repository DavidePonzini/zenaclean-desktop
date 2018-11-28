import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    // selector: 'app-ngbd-modal-content',
    templateUrl: 'add-report-modal-component.html',
    // styleUrls: ['single-report-view-component.css']
})

export class AddReportContentComponent {
    constructor(public activeModal: NgbActiveModal) {
    }
}

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent {

    constructor(private modalService: NgbModal) {
    }

    open() {
        const modalRef = this.modalService.open(AddReportContentComponent, {size: 'lg'});
    }
}
