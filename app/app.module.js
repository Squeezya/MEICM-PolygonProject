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
var core_2 = require("angular2-google-maps/core");
var ng2_pagination_1 = require("ng2-pagination");
var angular2_busy_1 = require("angular2-busy");
var http_1 = require("@angular/http");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var operations_component_1 = require("./operation/operations.component");
var map_component_1 = require("./map/map.component");
var notfound_component_1 = require("./notfound/notfound.component");
var app_service_1 = require("./config/app.service");
var coordinate_service_1 = require("./services/coordinate.service");
var operation_service_1 = require("./services/operation.service");
var ng2_bootstrap_1 = require("ng2-bootstrap");
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
            core_2.AgmCoreModule.forRoot({
                apiKey: 'AIzaSyDUcvsCFszfqJbGY5TRPPzb-vhy8yUmpwE'
            }),
            http_1.HttpModule,
            ng2_pagination_1.Ng2PaginationModule,
            angular2_busy_1.BusyModule,
            angular2_busy_1.BusyModule.forRoot(new angular2_busy_1.BusyConfig({
                message: 'Loading...',
                backdrop: true,
                template: "\n                        <div class=\"flex-container\">\n                            <div class=\"flex-item\">\n                                <i class=\"fa fa-spinner fa-spin\"></i>\n                                {{message}}\n                            </div>\n                        </div>\n                ",
                delay: 200
            })),
            ng2_bootstrap_1.AlertModule.forRoot(),
            ng2_bootstrap_1.ModalModule.forRoot()
        ],
        declarations: [
            app_component_1.AppComponent,
            dashboard_component_1.DashboardComponent,
            operations_component_1.OperationsComponent,
            map_component_1.MapComponent,
            notfound_component_1.NotFoundComponent
        ],
        providers: [
            app_service_1.AppSettings,
            coordinate_service_1.CoordinateService,
            operation_service_1.OperationService
        ],
        bootstrap: [app_component_1.AppComponent],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map