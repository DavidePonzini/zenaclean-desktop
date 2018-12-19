import {Component, OnInit} from '@angular/core';
import {APIService} from '../services/api.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    navbarOpen = false;

    constructor(private apiService: APIService) {
    }

    toggleNavbar() {
        this.navbarOpen = !this.navbarOpen;
    }

    isLogged() {
        return this.apiService.isLogged();
    }

    ngOnInit() {
    }

}
