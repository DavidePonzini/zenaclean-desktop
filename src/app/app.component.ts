import {Component, OnInit} from '@angular/core';
import {APIService} from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'ADoSS';

    constructor(private apiService: APIService) {

    }

    isLogged() {
        return this.apiService.isLogged();
    }

    ngOnInit() {
    }
}




