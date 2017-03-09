import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

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
import {OperationService} from './services/operation.service';

import {ModalModule, AlertModule} from 'ng2-bootstrap';
import {AddOperationModalComponent} from "./operation/addEditOperationModal/addEditOperationModal.component";
import {ToasterModule, ToasterService} from "angular2-toaster";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
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
                delay: 200
            })
        ),
        AlertModule.forRoot(),
        ModalModule.forRoot(),
        ToasterModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        OperationsComponent,
        MapComponent,
        NotFoundComponent,
        AddOperationModalComponent
    ],
    providers: [
        AppSettings,
        CoordinateService,
        OperationService,
        ToasterService
    ],
    bootstrap: [AppComponent],
})

export class AppModule {
}
