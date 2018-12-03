import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import {SingleReportViewComponent} from '../single-report-view/single-report-view.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css']
})


export class ReportsListComponent implements OnInit {

  reports: any;

  constructor(private apiService: APIService, private modalService: NgbModal) { }

  ngOnInit() {
      this.apiService.getReports().subscribe((data: Array<object>) => {
          this.reports = data;
      });
  }
  open(report) {
    const modalRef = this.modalService.open(SingleReportViewComponent, {size: 'lg'});
    modalRef.componentInstance.report = report;
  }

}
