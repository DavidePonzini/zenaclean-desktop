import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-popup-multiple',
    templateUrl: './popup-multiple.component.html',
    styleUrls: ['./popup-multiple.component.css']
})
export class PopupMultipleComponent implements OnInit {
    @Input() message;

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit() {
    }

}
