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
var coordinate_1 = require("./../models/coordinate");
var coordinate_service_1 = require("./../services/coordinate.service");
var MapComponent = (function () {
    function MapComponent(coordinateService) {
        this.coordinateService = coordinateService;
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
        this.pathAux = [];
        this.markers = [];
        this.polygonPath = [];
        this.polygonPath2 = [];
        this.pathAuxColor = "#FF0000";
        this.pathColor = "#FF0000";
        this.getPath(3);
    };
    MapComponent.prototype.click = function () {
        console.log(document.querySelector('.sebm-google-map-container-inner'));
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
    MapComponent.prototype.clearPathAux = function () {
        this.pathAux.length = 0;
    };
    MapComponent.prototype.mapClicked = function ($event) {
        this.pathAux.push(new coordinate_1.Coordinate($event.x, $event.y));
    };
    MapComponent.prototype.PrintCurrentPathAux = function () {
        var output = "[\n";
        for (var _i = 0, _a = this.pathAux; _i < _a.length; _i++) {
            var coordinate = _a[_i];
            output += coordinate.toStringProg() + "\n";
        }
        output += "]\n";
        console.log(output);
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
    __metadata("design:paramtypes", [coordinate_service_1.CoordinateService])
], MapComponent);
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map