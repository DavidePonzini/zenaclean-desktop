import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewReport} from './new-report';
import {timestamp} from 'rxjs/operators';

@Component({
    selector: 'app-add-report-modal',
    templateUrl: 'add-report.component.html',
    styleUrls: ['add-report.component.css']
})

export class AddReportContentComponent  implements OnInit {
    model: any;
    submitted: any;

    @Input() latlng;

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit() {

        this.model = new NewReport('', '', '', this.latlng.latitude, this.latlng.longitude);
        this.submitted = false;
    }


    onSubmit() {
        this.submitted = true;
       // alert(JSON.stringify(this.model));
    }
}
