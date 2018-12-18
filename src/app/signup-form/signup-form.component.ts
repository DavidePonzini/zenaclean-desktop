import { Component, OnInit } from '@angular/core';
import {NewSignup} from './new-signup';
import {APIService} from '../services/api.service';
import {PopupComponent} from '../popup/popup.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

    model: any;
    submitted: any;

  constructor(private apiService: APIService, public modalService: NgbModal) { }

  ngOnInit() {
      this.model = new NewSignup('', '', '', '');
      this.submitted = false;
  }

  checkLength() {
    if (this.model.password.length < 8) {
      document.getElementById('password').classList.add('error');
    } else {
        document.getElementById('password').classList.remove('error');
    }
      this.checkEqual();
  }

  checkEqual() {
      if (this.model.password !== this.model.confirm) {
          document.getElementById('confirm').classList.add('error');
      } else {
          document.getElementById('confirm').classList.remove('error');
      }
  }

  onSubmit() {
    if (this.model.password < 6) { console.log('onSubmit'); }
    else if (this.model.password !== this.model.confirm) { console.log('onSubmit2'); }
    else {

        const dataSignup = {
            ssn: this.model.ssn,
            email: this.model.email,
            password: this.model.password
        };

      this.apiService.postSignup(dataSignup).subscribe(
          res => {
            console.log(res);

            if (res['status'] === 'ok') {
                const popup = this.modalService.open(PopupComponent, {size: 'sm'});
                popup.componentInstance.message = 'Registrazione effettuata con successo';
                popup.componentInstance.btnText = 'OK';
                popup.componentInstance.btnColor = 'green';
                popup.componentInstance.btnBorderColor = 'green';
            }
            else if (res['status'] === 'error') {
                const popup = this.modalService.open(PopupComponent, {size: 'sm'});
                popup.componentInstance.btnText = 'OK';
                popup.componentInstance.btnColor = 'red';
                popup.componentInstance.btnBorderColor = 'red';
                popup.componentInstance.message = res['error'];
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
