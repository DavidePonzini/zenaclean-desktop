import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {MapComponent} from './map/map.component';
import {ReportsListComponent} from './reports-list/reports-list.component';
import {ReportsBoardComponent} from './reports-board/reports-board.component';
import {ReportViewComponent} from './report-view/report-view.component';
import {NgbdModalContentComponent} from './report-view/report-view.component';

@NgModule({
    declarations: [
        AppComponent,
        MapComponent,
        ReportsListComponent,
        ReportsBoardComponent,
        ReportViewComponent,
        NgbdModalContentComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule,
    ],
    entryComponents: [NgbdModalContentComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
