import { Component, OnInit } from '@angular/core';
import {NewLogin} from './new-login';
import {APIService} from '../services/api.service';
import {PopupComponent} from '../popup/popup.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  model: any;
  submitted: any;

  constructor(private apiService: APIService, public modalService: NgbModal) { }

  ngOnInit() {
    this.model = new NewLogin('', '');
    this.submitted = false;
  }

  onSubmit() {
    if (this.model.password !==  '') {
      const dataLogin = {
        email: this.model.email,
        password: this.model.password
      };

      this.apiService.postLogin(dataLogin).subscribe(
          res => {
            if (res['status']) {
              // redirect to page
              console.log(res['id']);
            }
          },
          error => {
            const popup = this.modalService.open(PopupComponent, {size: 'sm'});
            popup.componentInstance.message = 'Errore durante invio, riprova.';
            popup.componentInstance.btnText = 'OK';
            popup.componentInstance.btnColor = 'red';
            popup.componentInstance.btnBorderColor = 'red';
            console.error(error);
          } );
    }
    this.submitted = true;
  }
}
