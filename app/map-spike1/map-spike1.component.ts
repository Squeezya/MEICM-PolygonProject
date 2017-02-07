import {Component, OnInit} from '@angular/core';
import {Coordinate} from './../models/coordinate';
import {CoordinateService} from './../services/coordinate.service';

import {LatLngLiteral} from 'angular2-google-maps/core';

@Component({
    moduleId: module.id,
    selector: 'my-map-spike1',
    templateUrl: 'map-spike1.component.html',
    styleUrls: ['map-spike1.component.css']
})

export class MapSpike1Component implements OnInit {
    a = "s";
    path: Coordinate[];
    pathColor: string;
    polygonPath: Array<LatLngLiteral>;
    pathAux: Coordinate[];
    markers: Coordinate[];
    pathAuxColor: string;

    mapConfig: {
        lat: number;
        lng: number;
        zoom: number;
        scaleControl: boolean;
    } = {
        lat: 39.740159,
        lng: -8.797335,
        zoom: 16,
        scaleControl: true
    };
    polygonConfig: {
        strokeColor: string;
        fillColor: string;
    } = {
        strokeColor: "#8ab5e3",
        fillColor: "#8ab5e3"
    };

    constructor(private coordinateService: CoordinateService) {
    }

    ngOnInit(): void {
        this.pathAux = [];
        this.markers = [];
        this.polygonPath = [];
        this.pathAuxColor = "#FF0000";
        this.pathColor = "#FF0000";
        this.getPath(2);
    }

    getPath(index: number): void {
        this.coordinateService.getPath(index).then(path => {
            this.path = path;
            //center map on the beginning of the path
            this.mapConfig.lat = this.path[0].latitude;
            this.mapConfig.lng = this.path[0].longitude;
            this.polygonPath = [];
            var auxPath = this.getRawPolygonPath(this.path, 0.008);
            let size = auxPath.length;
            let aaa = auxPath.slice(0);
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
                this.polygonPath.push({lat: auxPath[i].latitude, lng: auxPath[i].longitude});
            }
        });
    }

    clearPathAux(): void {
        this.pathAux.length = 0;
    }

    mapClicked($event: MouseEvent) {
        this.pathAux.push(new Coordinate($event.x, $event.y));
    }

    PrintCurrentPathAux(): void {
        var output = "[\n";
        for (let coordinate of this.pathAux) {
            output += coordinate.toStringProg() + "\n";
        }
        output += "]\n";
        console.log(output);
    }

    getRawPolygonPath(path: Coordinate[], dogSmeelDistanceInKm: number): Coordinate[] {
        // for path.length - 1 because on each iteration we will fetch the next one.
        // Without -1 it would give an array out of bounds error
        var pathSide1: Coordinate[] = [];
        var pathSide2: Coordinate[] = [];
        var indexeToRemoveSide1: {
            indexCoordinate1: number,
            indexCoordinate2: number,
            intersectionCoordinate: Coordinate
        }[] = [];
        var indexeToRemoveSide2: {
            indexCoordinate1: number,
            indexCoordinate2: number,
            intersectionCoordinate: Coordinate
        }[] = [];
        for (var i = 0; i < path.length - 1; i++) {
            var c1: Coordinate = path[i];
            var c2: Coordinate = path[i + 1];
            //angle between these 2 angles (0 degrees to north).
            var angle = c1.angleFromCoordinate(c2);
            var c1Aux1, c1Aux2, c2Aux1, c2Aux2: Coordinate;
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
                } else {
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
    }

    getTurnDirection(l1c1: Coordinate, l1c2: Coordinate, l2c1: Coordinate, l2c2: Coordinate): string {
        var direction = "";
        let angleLine1 = l1c1.angleFromCoordinate(l1c2);
        let angleLine2 = l2c1.angleFromCoordinate(l2c2);
        if (angleLine2 < angleLine1) {
            //direita
            direction = "right";
        } else {
            //esquerda
            direction = "left";
        }
        return direction;
    }

    calculateIntersectionPointOf(line1C1: Coordinate,
                                 line1C2: Coordinate,
                                 line2C1: Coordinate,
                                 line2C2: Coordinate): Coordinate {
        var coordinateIntersection: Coordinate;

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

        let det = l1a * l2b - l2a * l1b;
        if (det == 0) {
            //error
            coordinateIntersection = null;
        } else {
            let x = (l2b * l1c - l1b * l2c) / det;
            let y = (l1a * l2c - l2a * l1c) / det;
            coordinateIntersection = new Coordinate(x, y);
        }
        return coordinateIntersection;
    }

    insidePolygon(latitude: number, longitude: number, vs: Coordinate[]): boolean {
        // ray-casting algorithm based on
        // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i].latitude, yi = vs[i].longitude;
            var xj = vs[j].latitude, yj = vs[j].longitude;

            var intersect = ((yi > longitude) != (yj > longitude))
                && (latitude < (xj - xi) * (longitude - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    };
}

