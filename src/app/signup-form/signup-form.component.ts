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
    passwordLengthError = false;
    passwordMatchingError = false;

  constructor(private apiService: APIService, public modalService: NgbModal) { }

  ngOnInit() {
      this.model = new NewSignup('', '', '', '');
      this.submitted = false;
  }

  checkLength() {
    if (this.model.password.length < 8) {
      document.getElementById('password').classList.add('error');
      this.passwordLengthError = true;
    } else {
        document.getElementById('password').classList.remove('error');
        this.passwordLengthError = false;
    }
      this.checkEqual();
  }

  checkEqual() {
      if (this.model.password !== this.model.confirm) {
          document.getElementById('confirm').classList.add('error');
          this.passwordMatchingError = true;
      } else {
          document.getElementById('confirm').classList.remove('error');
          this.passwordMatchingError = false;
      }
  }

  onSubmit() {
    if (this.model.password.length >= 8 && this.model.password === this.model.confirm) {

      const dataSignup = {
            ssn: this.model.ssn,
            email: this.model.email,
            password: this.model.password
      };

      this.apiService.postSignup(dataSignup).subscribe(
          res => {

            if (res['status'] === 'ok') {
                const popup = this.modalService.open(PopupComponent, {size: 'sm'});
                popup.componentInstance.message = 'Registrazione effettuata con successo';
                popup.componentInstance.btnText = 'OK';
                /*popup.componentInstance.btnColor = 'dodgerblue';
                  popup.componentInstance.btnBorderColor = 'white';*/
                this.submitted = true;
            }
            else if (res['status'] === 'error') {
                const popup = this.modalService.open(PopupComponent, {size: 'sm'});
                popup.componentInstance.message = res['error'];
                popup.componentInstance.btnText = 'OK';
                /*popup.componentInstance.btnColor = 'dodgerblue';
                  popup.componentInstance.btnBorderColor = 'white';*/
            }
            },
              error => {
                  const popup = this.modalService.open(PopupComponent, {size: 'sm'});
                  popup.componentInstance.message = 'Errore durante invio, riprova.';
                  popup.componentInstance.btnText = 'OK';
                  /*popup.componentInstance.btnColor = 'dodgerblue';
                  popup.componentInstance.btnBorderColor = 'white';*/
                  console.error(error);
              } );
    }
  }
}
