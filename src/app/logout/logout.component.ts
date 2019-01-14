import { Component, OnInit } from '@angular/core';
import {APIService} from '../services/api.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private apiService: APIService) { }

  ngOnInit() {
  }

  performAction() {
      // location.href = '/';
      this.apiService.setAuth(false);
      this.apiService.setUser(null);
      this.apiService.setViewProfile();
      this.apiService.logoutSession().subscribe();
  }

}



