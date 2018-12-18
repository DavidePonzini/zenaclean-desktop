import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


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

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  applyStyles() {
    const styles = {
      backgroundColor : this.btnColor,
      border : this.btnBorderColor,
    };
    return styles;
  }


}
