import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';


@Component({
    selector: 'app-popup-multiple',
    templateUrl: './popup-multiple.component.html',
    styleUrls: ['./popup-multiple.component.css']
})
export class PopupMultipleComponent implements OnInit {
    @Input() message;
    @Input() onConfirmCb;
    @Input() onCancelCb;

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit() {
    }

    confirm() {
        this.activeModal.close('Confermato');

        if (this.onConfirmCb) {
            this.onConfirmCb();
        }
    }

    cancel() {
        this.activeModal.dismiss('Annullato');

        if (this.onCancelCb) {
            this.onCancelCb();
        }
    }

}
