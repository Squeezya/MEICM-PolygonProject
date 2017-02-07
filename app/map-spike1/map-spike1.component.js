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
var core_1 = require('@angular/core');
var coordinate_1 = require('./../models/coordinate');
var coordinate_service_1 = require('./../services/coordinate.service');
var MapSpike1Component = (function () {
    function MapSpike1Component(coordinateService) {
        this.coordinateService = coordinateService;
        this.a = "s";
        this.mapConfig = {
            lat: 39.740159,
            lng: -8.797335,
            zoom: 16,
            scaleControl: true
        };
        this.polygonConfig = {
            strokeColor: "#8ab5e3",
            fillColor: "#8ab5e3"
        };
    }
    MapSpike1Component.prototype.ngOnInit = function () {
        this.pathAux = [];
        this.markers = [];
        this.polygonPath = [];
        this.pathAuxColor = "#FF0000";
        this.pathColor = "#FF0000";
        this.getPath(2);
    };
    MapSpike1Component.prototype.getPath = function (index) {
        var _this = this;
        this.coordinateService.getPath(index).then(function (path) {
            _this.path = path;
            //center map on the beginning of the path
            _this.mapConfig.lat = _this.path[0].latitude;
            _this.mapConfig.lng = _this.path[0].longitude;
            _this.polygonPath = [];
            var auxPath = _this.getRawPolygonPath(_this.path, 0.008);
            var size = auxPath.length;
            var aaa = auxPath.slice(0);
            // for (var i = 0; i < size; i++) {
            //     let isInside = this.insidePolygon(auxPath[i].latitude, auxPath[i].longitude, aaa);
            //     if (isInside) {
            //         auxPath.splice(i, 1);
            //         size--;
            //        // this.markers.push(auxPath[i]);
            //     }
            // }
            console.log("size ", auxPath.length);
            for (var i = 0; i < auxPath.length; i++) {
                _this.polygonPath.push({ lat: auxPath[i].latitude, lng: auxPath[i].longitude });
            }
        });
    };
    MapSpike1Component.prototype.clearPathAux = function () {
        this.pathAux.length = 0;
    };
    MapSpike1Component.prototype.mapClicked = function ($event) {
        this.pathAux.push(new coordinate_1.Coordinate($event.x, $event.y));
    };
    MapSpike1Component.prototype.PrintCurrentPathAux = function () {
        var output = "[\n";
        for (var _i = 0, _a = this.pathAux; _i < _a.length; _i++) {
            var coordinate = _a[_i];
            output += coordinate.toStringProg() + "\n";
        }
        output += "]\n";
        console.log(output);
    };
    MapSpike1Component.prototype.getRawPolygonPath = function (path, dogSmeelDistanceInKm) {
        // for path.length - 1 because on each iteration we will fetch the next one.
        // Without -1 it would give an array out of bounds error
        var pathSide1 = [];
        var pathSide2 = [];
        var indexeToRemoveSide1 = [];
        var indexeToRemoveSide2 = [];
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
            //get last line
            if (i > 0) {
                //existe last line
                var dir = this.getTurnDirection(path[i - 1], c1, c1, c2);
                if (dir === "left") {
                    var lastC1Aux1 = pathSide1[pathSide1.length - 2]; //as the insertion in this array is to the last position
                    var lastC2Aux1 = pathSide1[pathSide1.length - 1];
                    var intersectionSide1 = this.calculateIntersectionPointOf(lastC1Aux1, lastC2Aux1, c1Aux1, c2Aux1);
                    if (intersectionSide1 != null) {
                        indexeToRemoveSide1.push({
                            indexCoordinate1: pathSide1.length - 1,
                            indexCoordinate2: pathSide1.length,
                            intersectionCoordinate: intersectionSide1
                        });
                    }
                }
                else {
                    var lastC1Aux2 = pathSide2[pathSide2.length - 2]; //as the insertion in this array is in the first positions
                    var lastC2Aux2 = pathSide2[pathSide2.length - 1];
                    var intersectionSide2 = this.calculateIntersectionPointOf(lastC1Aux2, lastC2Aux2, c1Aux2, c2Aux2);
                    if (intersectionSide2 != null) {
                        indexeToRemoveSide2.push({
                            indexCoordinate1: pathSide2.length - 1,
                            indexCoordinate2: pathSide2.length,
                            intersectionCoordinate: intersectionSide2
                        });
                    }
                }
            }
            pathSide1.push(c1Aux1);
            pathSide1.push(c2Aux1);
            pathSide2.push(c1Aux2);
            pathSide2.push(c2Aux2);
        }
        // for (var i = 0; i < indexeToRemoveSide1.length; i++) {
        //     pathSide1[indexeToRemoveSide1[i].indexCoordinate2 - i] = indexeToRemoveSide1[i].intersectionCoordinate;
        //     pathSide1.splice(indexeToRemoveSide1[i].indexCoordinate1 - i, 1);
        // }
        //
        // for (var i = 0; i < indexeToRemoveSide2.length; i++) {
        //     pathSide2[indexeToRemoveSide2[i].indexCoordinate2 - i] = indexeToRemoveSide2[i].intersectionCoordinate;
        //     pathSide2.splice(indexeToRemoveSide2[i].indexCoordinate1 - i, 1);
        // }
        //so the path is a polygon that closes at the beginning.
        pathSide2 = pathSide2.reverse();
        var polygonPath = pathSide1.concat(pathSide2);
        return polygonPath;
    };
    MapSpike1Component.prototype.getTurnDirection = function (l1c1, l1c2, l2c1, l2c2) {
        var direction = "";
        var angleLine1 = l1c1.angleFromCoordinate(l1c2);
        var angleLine2 = l2c1.angleFromCoordinate(l2c2);
        if (angleLine2 < angleLine1) {
            //direita
            direction = "right";
        }
        else {
            //esquerda
            direction = "left";
        }
        return direction;
    };
    MapSpike1Component.prototype.calculateIntersectionPointOf = function (line1C1, line1C2, line2C1, line2C2) {
        var coordinateIntersection;
        var l1x1 = line1C1.latitude;
        var l1x2 = line1C2.latitude;
        var l1y1 = line1C1.longitude;
        var l1y2 = line1C2.longitude;
        var l2x1 = line2C1.latitude;
        var l2x2 = line2C2.latitude;
        var l2y1 = line2C1.longitude;
        var l2y2 = line2C2.longitude;
        var l1a = l1y2 - l1y1;
        var l1b = l1x1 - l1x2;
        var l1c = l1a * l1x1 + l1b * l1y1;
        var l2a = l2y2 - l2y1;
        var l2b = l2x1 - l2x2;
        var l2c = l2a * l2x1 + l2b * l2y1;
        var det = l1a * l2b - l2a * l1b;
        if (det == 0) {
            //error
            coordinateIntersection = null;
        }
        else {
            var x = (l2b * l1c - l1b * l2c) / det;
            var y = (l1a * l2c - l2a * l1c) / det;
            coordinateIntersection = new coordinate_1.Coordinate(x, y);
        }
        return coordinateIntersection;
    };
    MapSpike1Component.prototype.insidePolygon = function (latitude, longitude, vs) {
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
    MapSpike1Component = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-map-spike1',
            templateUrl: 'map-spike1.component.html',
            styleUrls: ['map-spike1.component.css']
        }), 
        __metadata('design:paramtypes', [coordinate_service_1.CoordinateService])
    ], MapSpike1Component);
    return MapSpike1Component;
}());
exports.MapSpike1Component = MapSpike1Component;
//# sourceMappingURL=map-spike1.component.js.map