import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css']
})
export class ReportsListComponent implements OnInit {

  reports: any;

  constructor() { }

  ngOnInit() {
    this.reports = [{name: 'segnalazione1'},
                    {name: 'segnalazione2'},
                    {name: 'segnalazione3'},
                    {name: 'segnalazione4'},
                    {name: 'segnalazione5'},
                    {name: 'segnalazione6'},
                    {name: 'segnalazione7'},
                    {name: 'segnalazione8'}];
  }

}
