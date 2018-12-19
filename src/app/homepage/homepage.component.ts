import { Component, OnInit } from '@angular/core';
import {APIService} from '../services/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private apiService: APIService) {
  }

  ngOnInit() {

  }

  showDemo() {
    return this.apiService.demo;
  }

  setDemo() {
      this.apiService.showDemo(true);
  }

}
