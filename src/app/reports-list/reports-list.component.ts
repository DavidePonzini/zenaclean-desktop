import {Component, OnInit} from '@angular/core';
import {APIService} from '../services/api.service';
import {SingleReportViewComponent} from '../single-report-view/single-report-view.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import dateUtils from '../utils/date-utils';

@Component({
    selector: 'app-reports-list',
    templateUrl: './reports-list.component.html',
    styleUrls: ['./reports-list.component.css']
})


export class ReportsListComponent implements OnInit {

    reports: any = [];
    resultString = '';

    newReport = false;

    constructor(private apiService: APIService, private modalService: NgbModal) {

        this.apiService.onReportAdd().subscribe((data) => {
            // Facendo unshift sono sicuro che  l'ultima segnalazione sia la prima in lista
            // this.reports.unshift(data);
            // this.apiService.updateReports(this.reports);
            // this.displayReports(this.reports);
            this.newReport = true;
        });

        this.apiService.onReportsUpdate().subscribe(reports => {
            // Aggiorna lista di report
            this.displayReports(reports);
            setTimeout(() => {this.newReport = false; }, 4000);
        });

        this.apiService.onReportVoteUpdate().subscribe(data => {
            const id = data.id;
            const isVotePositive = data.vote;

            const report = this.reports.find(rep => rep._id === id);

            if (isVotePositive) {
                report.voted_positive = true;
            } else {
                report.voted_negative = true;
            }
        });
    }

    displayReports(reports) {
        this.reports = reports;

        this.reports.forEach(function (report) {
            const {date, time} = dateUtils.timestampToItalianDate(report.timestamp);
            report.date = date;
            report.time = time;
        });
        if (this.reports.length === 0) {
            this.resultString = 'Nessuna segnalazione trovata';
        }
    }

    ngOnInit() {
        this.apiService.getReports(44.4741594739302, 9.082056335564403, 44.332348787411924, 8.858215264435557)
            .subscribe((data: object) => {
                this.displayReports(data);
            });
    }

    open(report) {
        const modalRef = this.modalService.open(SingleReportViewComponent, {size: 'lg'});
        modalRef.componentInstance.report = report;
    }

}
