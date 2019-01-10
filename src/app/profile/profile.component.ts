import { Component, OnInit } from '@angular/core';
import {APIService} from '../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private apiService: APIService) {
  }

  ngOnInit() {
  }

  getUser() {
    return this.apiService.getUser();
  }

}
