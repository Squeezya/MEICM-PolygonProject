"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var core_2 = require("angular2-google-maps/core");
var app_component_1 = require("./app.component");
var hero_detail_component_1 = require("./hero-detail/hero-detail.component");
var heroes_component_1 = require("./heroes/heroes.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var hero_service_1 = require("./services/hero.service");
var coordinate_service_1 = require("./services/coordinate.service");
var app_routing_module_1 = require("./app-routing.module");
var map_spike1_component_1 = require("./map-spike1/map-spike1.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            app_routing_module_1.AppRoutingModule,
            ng_bootstrap_1.NgbModule.forRoot(),
            core_2.AgmCoreModule.forRoot({
                apiKey: 'AIzaSyDUcvsCFszfqJbGY5TRPPzb-vhy8yUmpwE'
            })
        ],
        declarations: [
            app_component_1.AppComponent,
            hero_detail_component_1.HeroDetailComponent,
            heroes_component_1.HeroesComponent,
            dashboard_component_1.DashboardComponent,
            map_spike1_component_1.MapSpike1Component
        ],
        providers: [
            hero_service_1.HeroService,
            coordinate_service_1.CoordinateService
        ],
        bootstrap: [app_component_1.AppComponent],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map