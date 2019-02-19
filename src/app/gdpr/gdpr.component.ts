import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import config from '../../../config.secret';

@Component({
  selector: 'app-gdpr',
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.css']
})
export class GdprComponent implements OnInit {
    url = config.apiUrl;

    constructor(public activeModal: NgbActiveModal) {
    }

  ngOnInit() {
  }

}
