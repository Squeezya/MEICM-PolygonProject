import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AgmCoreModule} from 'angular2-google-maps/core';

import {Ng2PaginationModule} from 'ng2-pagination';
import {BusyModule, BusyConfig} from 'angular2-busy';

import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {OperationsComponent} from './operation/operations.component';
import {MapComponent} from './map/map.component';
import {NotFoundComponent} from './notfound/notfound.component';
import {AppSettings} from './config/app.service';
import {CoordinateService} from './services/coordinate.service';
import {OperationService} from "./services/operation.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDUcvsCFszfqJbGY5TRPPzb-vhy8yUmpwE'
        }),
        HttpModule,
        Ng2PaginationModule,
        BusyModule,
        BusyModule.forRoot(
            new BusyConfig({
                message: 'Loading...',
                backdrop: true,
                template: `
                        <div class="flex-container">
                            <div class="flex-item">
                                <i class="fa fa-spinner fa-spin"></i>
                                {{message}}
                            </div>
                        </div>
                `,
                delay: 100
            })
        )
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        OperationsComponent,
        MapComponent,
        NotFoundComponent
    ],
    providers: [
        AppSettings,
        CoordinateService,
        OperationService
    ],
    bootstrap: [AppComponent],
})

export class AppModule {
}
