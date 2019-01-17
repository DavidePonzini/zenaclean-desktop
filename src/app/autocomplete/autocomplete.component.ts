import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {APIService} from '../services/api.service';
// import { google } from '@agm/core/services/google-maps-types';

declare var google;

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})

export class AutocompleteComponent implements OnInit {

    public searchControl: FormControl;

    @ViewChild('search')
    public searchElementRef: ElementRef;

    constructor(
        private apiService: APIService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {}

    ngOnInit() {

        // create search FormControl
        this.searchControl = new FormControl();


        // load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ['address']
            });
            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    // get the place result
                    const coords = {
                        lat: autocomplete.getPlace().geometry.location.lat(),
                        lng: autocomplete.getPlace().geometry.location.lng()
                    };
                    this.apiService.moveMap(coords);
                });
            });
        });
    }

}
