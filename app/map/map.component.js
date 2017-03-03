"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var coordinate_service_1 = require("./../services/coordinate.service");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var MapComponent = (function () {
    function MapComponent(coordinateService, http) {
        this.coordinateService = coordinateService;
        this.http = http;
        this.a = "s";
        this.sidebarConfig = {
            state: "active"
        };
        this.mapConfig = {
            lat: 39.740159,
            lng: -8.797335,
            zoom: 16,
            scaleControl: true,
            zoomControl: true,
            mapTypeControl: true,
            streetViewControl: false
        };
        this.polygonConfig = {
            strokeColor: "#8ab5e3",
            fillColor: "#8ab5e3",
            strokeWeight: 0
        };
    }
    MapComponent.prototype.ngOnInit = function () {
        this.polygonPath = [];
        this.polygonPath2 = [];
        this.pathAuxColor = "#FF0000";
        this.pathColor = "#FF0000";
        var headers = new http_1.Headers();
        headers.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0YmYyYWMzMC1mZjcxLTExZTYtYjViOC0zZDkwNGM3M2EzNTgiLCJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvdjFcL2xvZ2luIiwiaWF0IjoxNDg4NTQ2NjAwLCJleHAiOjE0ODg1NTAyMDAsIm5iZiI6MTQ4ODU0NjYwMCwianRpIjoiNTQ1MzIyMzI2MGM1ZjA3N2EzYThiNjJlMDYyNjY4ZGQifQ.yyRyxwZu9V4nH89iPqFs71Ar3N2-GnD8FYRrLAbBArw');
        this.http.get('http://localhost:8000/v1/operations/5be78aa0-ff71-11e6-a9e2-d9b4f1a3d99e/sweeps', {
            headers: headers
        })
            .toPromise()
            .then(this.test)
            .catch(this.handleError);
    };
    MapComponent.prototype.test = function (res) {
        var body = res.json();
        console.log(body);
        return body || {};
    };
    MapComponent.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(error);
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    MapComponent.prototype.sidebarToggleState = function () {
        if (this.isSidebarVisible()) {
            this.sidebarConfig.state = 'inactive';
        }
        else {
            this.sidebarConfig.state = 'active';
        }
    };
    MapComponent.prototype.isSidebarVisible = function () {
        return this.sidebarConfig.state === "active";
    };
    MapComponent.prototype.getPath = function (index) {
        var _this = this;
        this.coordinateService.getPath(index).then(function (path) {
            _this.path = path;
            //center map on the beginning of the path
            _this.mapConfig.lat = _this.path[0].latitude;
            _this.mapConfig.lng = _this.path[0].longitude;
            _this.polygonPath = [];
            _this.polygonPath2 = [];
            var auxPath = _this.getRawPolygonPath(_this.path, 0.008);
            var auxPath2 = _this.getRawPolygonPath(_this.path, 0.016);
            for (var i = 0; i < auxPath.length; i++) {
                _this.polygonPath.push({ lat: auxPath[i].latitude, lng: auxPath[i].longitude });
            }
            for (var i = 0; i < auxPath2.length; i++) {
                _this.polygonPath2.push({ lat: auxPath2[i].latitude, lng: auxPath2[i].longitude });
            }
        });
    };
    MapComponent.prototype.getRawPolygonPath = function (path, dogSmeelDistanceInKm) {
        // for path.length - 1 because on each iteration we will fetch the next one.
        // Without -1 it would give an array out of bounds error
        var pathSide1 = [];
        var pathSide2 = [];
        for (var i = 0; i < path.length - 1; i++) {
            var c1 = path[i];
            var c2 = path[i + 1];
            //angle between these 2 angles (0 degrees to north).
            var angle = c1.angleFromCoordinate(c2);
            var c1Aux1, c1Aux2, c2Aux1, c2Aux2;
            c1Aux1 = c1.destinationPoint(angle + 90, dogSmeelDistanceInKm);
            c1Aux2 = c1.destinationPoint(angle - 90, dogSmeelDistanceInKm);
            c2Aux1 = c2.destinationPoint(angle + 90, dogSmeelDistanceInKm);
            c2Aux2 = c2.destinationPoint(angle - 90, dogSmeelDistanceInKm);
            pathSide1.push(c1Aux1);
            pathSide1.push(c2Aux1);
            pathSide2.push(c1Aux2);
            pathSide2.push(c2Aux2);
        }
        pathSide2 = pathSide2.reverse();
        var polygonPath = pathSide1.concat(pathSide2);
        return polygonPath;
    };
    MapComponent.prototype.insidePolygon = function (latitude, longitude, vs) {
        // ray-casting algorithm based on
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i].latitude, yi = vs[i].longitude;
            var xj = vs[j].latitude, yj = vs[j].longitude;
            var intersect = ((yi > longitude) != (yj > longitude))
                && (latitude < (xj - xi) * (longitude - yi) / (yj - yi) + xi);
            if (intersect)
                inside = !inside;
        }
        return inside;
    };
    ;
    return MapComponent;
}());
MapComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'map',
        templateUrl: 'map.component.html',
        styleUrls: ['map.component.css'],
        animations: [
            core_1.trigger('sidebarContainerState', [
                core_1.state('inactive', core_1.style({
                    'left': "-408px"
                })),
                core_1.state('active', core_1.style({
                    left: "0px",
                    'box-shadow': "0 0 20px rgba(0,0,0,0.3)"
                })),
                core_1.transition('inactive => active', core_1.animate('130ms ease-in')),
                core_1.transition('active => inactive', core_1.animate('130ms ease-out'))
            ])
        ]
    }),
    __metadata("design:paramtypes", [coordinate_service_1.CoordinateService, http_1.Http])
], MapComponent);
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map