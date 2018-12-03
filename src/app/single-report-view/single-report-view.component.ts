import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-ngbd-modal-content',
    templateUrl: 'single-report-view-component.html',
    styleUrls: ['single-report-view-component.css']
})

export class SingleReportViewComponent {
    @Input() report;
    constructor(public activeModal: NgbActiveModal) {
    }
}

