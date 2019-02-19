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
        this.apiService.checkSession().subscribe( res => {
            if (res['status'] === 'ok') {
                this.apiService.setAuth(true);
                this.apiService.setUser(res['user']);
            }
        });
    }
}




