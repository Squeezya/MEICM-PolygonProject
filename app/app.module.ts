import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AgmCoreModule} from 'angular2-google-maps/core';

import {AppComponent} from './app.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {HeroesComponent} from './heroes/heroes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroService} from './services/hero.service';
import {CoordinateService} from './services/coordinate.service';
import {AppRoutingModule} from './app-routing.module';
import {MapSpike1Component} from './map-spike1/map-spike1.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDUcvsCFszfqJbGY5TRPPzb-vhy8yUmpwE'
        })
    ],
    declarations: [
        AppComponent,
        HeroDetailComponent,
        HeroesComponent,
        DashboardComponent,
        MapSpike1Component
    ],
    providers: [
        HeroService,
        CoordinateService
    ],
    bootstrap: [AppComponent],
})

export class AppModule {
}
