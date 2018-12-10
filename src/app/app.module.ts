import {BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {NgModule} from '@angular/core';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AgmCoreModule} from '@agm/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {MapComponent} from './map/map.component';
import {ReportsListComponent} from './reports-list/reports-list.component';
import {ReportsBoardComponent} from './reports-board/reports-board.component';
import {AddReportComponent} from './add-report/add-report.component';

import config from '../../config.secret';
import {SingleReportViewComponent} from './single-report-view/single-report-view.component';
import { PopupComponent } from './popup/popup.component';

@NgModule({
    declarations: [
        AppComponent,
        MapComponent,
        ReportsListComponent,
        ReportsBoardComponent,
        AddReportComponent,
        SingleReportViewComponent,
        PopupComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule,
      AgmCoreModule.forRoot({
        apiKey: config.googleMapsApiKey,
      }),
      HttpClientModule
    ],
    entryComponents: [AddReportComponent, SingleReportViewComponent, PopupComponent],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule {
}
