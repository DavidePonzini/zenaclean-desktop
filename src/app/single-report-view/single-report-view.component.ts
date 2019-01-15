import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {APIService} from '../services/api.service';
import {PopupComponent} from '../popup/popup.component';
import {PopupMultipleComponent} from '../popup-multiple/popup-multiple.component';


@Component({
    selector: 'app-ngbd-modal-content',
    templateUrl: 'single-report-view-component.html',
    styleUrls: ['single-report-view-component.css']
})

export class SingleReportViewComponent {
    @Input() report;
    constructor(public activeModal: NgbActiveModal, public apiService: APIService, public modalService: NgbModal) {}

    hasUserAlreayVoted() {
        return this.hasUserVotedPositive() || this.hasUserVotedNegative();
    }

    hasUserVotedPositive() {
        return this.report.voted_positive;
    }

    hasUserVotedNegative() {
        return this.report.voted_negative;
    }

    votePositive() {
        this.voteReport(true);
    }

    voteNegative() {
        this.voteReport(false);
    }

    doesUserOwnReport() {
        if (!this.apiService.isLogged()) {
            return false;
        }

        // console.log('report:', this.report.user_id);
        // console.log('user:', this.apiService.getUser().id);

        return this.report.user_id === this.apiService.getUser().id;
    }

    voteReport(isVotePositive) {
        if (!this.requireLogin()) {
            return;
        }

        if (this.doesUserOwnReport()) {
            const popup = this.modalService.open(PopupComponent, {size: 'sm'});
            popup.componentInstance.message = 'Non puoi votare le tue segnalazioni';
            popup.componentInstance.btnText = 'Chiudi';
            return;
        }

        if (this.hasUserAlreayVoted()) {
            const popup = this.modalService.open(PopupComponent, {size: 'sm'});
            popup.componentInstance.message = 'Votazione già effettuata';
            popup.componentInstance.btnText = 'Chiudi';
            return;
        }

        const confirmPopup = this.modalService.open(PopupMultipleComponent, {size: 'sm'});
        confirmPopup.componentInstance.message = 'Confermi la tua votazione?';
        confirmPopup.componentInstance.onConfirmCb = () => {
            this.apiService.voteReport(this.report._id, isVotePositive).subscribe(res => {
                if (res['status'] === 'ok') {
                    const popup = this.modalService.open(PopupComponent, {size: 'sm'});
                    popup.componentInstance.message = 'Votazione effettuata';
                    popup.componentInstance.btnText = 'Chiudi';

                    this.apiService.updateVote(this.report._id, isVotePositive);
                } else {
                    const popup = this.modalService.open(PopupComponent, {size: 'sm'});
                    popup.componentInstance.message = 'Errore durante votazione';
                    popup.componentInstance.btnText = 'Chiudi';
                }
            });
        };
    }

    requireLogin() {
        if (!this.apiService.isLogged()) {
            const popup = this.modalService.open(PopupComponent, {size: 'sm'});
            popup.componentInstance.message = 'Devi essere registrato per votare';
            popup.componentInstance.btnText = 'Registrati';

            this.activeModal.close();

            return false;
        }

        return true;
    }
}

