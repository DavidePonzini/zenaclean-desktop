import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
    // selector: 'app-ngbd-modal-content',
    templateUrl: 'single-report-view-component.html',
    styleUrls: ['single-report-view-component.css']
/*    template: `
        <div class="modal-header">
            <h4 class="modal-title">Hi there!</h4>
        </div>
        <div class="modal-body">
            <p>Hello</p>
        </div>
        <div class="modal-footer">
        </div>
    `*/
})

export class NgbdModalContentComponent {
    constructor(public activeModal: NgbActiveModal) {
    }
}

/*@Component({
    selector: 'app-report-view',
    templateUrl: './report-view.component.html',
    styleUrls: ['./report-view.component.css']
})

export class ReportViewComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}*/


@Component({
    selector: 'app-report-view',
    templateUrl: './report-view.component.html',
    styleUrls: ['./report-view.component.css']
})

export class ReportViewComponent {
    constructor(private modalService: NgbModal) {
    }

    open() {
        const modalRef = this.modalService.open(NgbdModalContentComponent, {size: 'lg'});
        modalRef.componentInstance.name = 'World';
    }
}
