import { Component, OnInit } from '@angular/core';
import {APIService} from '../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public balance: string;
  public eth_url: string;

  constructor(private apiService: APIService) {
    this.balance = 'Non disponibile';
    this.eth_url = 'https://ropsten.etherscan.io/address/' + apiService.user.eth_address;
  }


  ngOnInit() {
    this.apiService.getBalance().subscribe(balance => {
      this.balance = balance['value'];
    });
  }

  getUser() {
    return this.apiService.getUser();
  }
}
