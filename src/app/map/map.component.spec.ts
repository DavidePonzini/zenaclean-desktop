import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { MapComponent } from './map.component';
import {AgmCoreModule} from '@agm/core';
import config from '../../../config.secret';
import {HttpClientModule} from '@angular/common/http';
import {APIService} from '../services/api.service';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      imports: [
          AgmCoreModule.forRoot({
              apiKey: config.googleMapsApiKey,
          }),
          HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the same number of markers as the DB',
      inject([APIService], async (apiService: APIService) => {
          apiService.getReports().subscribe(reports => {
              const expectedCount = Object.keys(reports).length;
              const count = component.reports.length;
              expect(count).toEqual(expectedCount);
          });
      }));
});
