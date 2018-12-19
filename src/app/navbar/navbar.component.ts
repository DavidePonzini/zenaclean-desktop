import {Component, OnInit} from '@angular/core';
import {APIService} from '../services/api.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(private apiService: APIService) {
    }

    isLogged() {
        return this.apiService.isLogged();
    }

    hideDemo() {
        this.apiService.showDemo(false);
    }

    ngOnInit() {
    }

}
