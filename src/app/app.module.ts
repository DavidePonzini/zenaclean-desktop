import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ReportsListComponent } from './reports-list/reports-list.component';
import { ReportsBoardComponent } from './reports-board/reports-board.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ReportsListComponent,
    ReportsBoardComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
