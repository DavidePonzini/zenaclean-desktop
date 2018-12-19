import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {APIService} from '../services/api.service';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input() message;
  @Input() btnText;
  @Input() btnColor;
  @Input() btnBorderColor;

  constructor(public activeModal: NgbActiveModal, private apiService: APIService) { }

  ngOnInit() {

  }

  applyStyles() {
    const styles = {
      backgroundColor : this.btnColor,
      border : this.btnBorderColor,
    };
    return styles;
  }

  performAction() {
    if (this.btnText === 'Registrati') {
        this.apiService.showDemo(false);
    }

    this.activeModal.dismiss('Close button');
  }

}
