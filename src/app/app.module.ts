import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {MapComponent} from './map/map.component';
import {ReportsListComponent} from './reports-list/reports-list.component';
import {ReportsBoardComponent} from './reports-board/reports-board.component';
import {AddReportComponent, AddReportContentComponent} from './add-report/add-report.component';


@NgModule({
    declarations: [
        AppComponent,
        MapComponent,
        ReportsListComponent,
        ReportsBoardComponent,
        AddReportContentComponent,
        AddReportComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule,
    ],
    entryComponents: [AddReportContentComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
