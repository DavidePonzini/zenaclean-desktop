import { Component, OnInit } from '@angular/core';
import {APIService} from '../services/api.service';


@Component({
  selector: 'app-reports-board',
  templateUrl: './reports-board.component.html',
  styleUrls: ['./reports-board.component.css']
})
export class ReportsBoardComponent implements OnInit {

  constructor(private apiService: APIService) {
  }

  ngOnInit() {
  }

  showProfile() {
        return this.apiService.getViewProfile();
  }

}
