import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css']
})
export class ReportsListComponent implements OnInit {

  reports: any;

  constructor(private apiService: APIService) { }

  ngOnInit() {
      this.apiService.getReports().subscribe((data: Array<object>) => {
          this.reports = data;
      });
  }

}
