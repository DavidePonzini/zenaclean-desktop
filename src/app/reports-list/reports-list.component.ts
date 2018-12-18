import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
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

  constructor(private apiService: APIService, private modalService: NgbModal) {

      this.apiService.listen().subscribe((data) => {
          this.reports.push(data);
      });
  }

  ngOnInit() {
      this.apiService.getReports().subscribe((data: object) => {
          this.reports = Object.values(data);
          this.reports.forEach(function(report) {
              const {date, time} = dateUtils.timestampToItalianDate(report.timestamp);
              report.date = date;
              report.time = time;
          });
          if (this.reports.length === 0) {
              this.resultString = 'Nessuna segnalazione trovata';
          }
      });

  }
  open(report) {
      console.log(report);
    const modalRef = this.modalService.open(SingleReportViewComponent, {size: 'lg'});
    modalRef.componentInstance.report = report;
  }

}
